import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Razorpay = require('razorpay');
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private razorpay: any;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.razorpay = new Razorpay({
      key_id: this.configService.get<string>('RAZORPAY_KEY_ID'),
      key_secret: this.configService.get<string>('RAZORPAY_KEY_SECRET'),
    });
  }

  async createRazorpayOrder(amount: number, orderId: string) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID');
    // If testing key, return mock
    if (!keyId || keyId.includes('placeholder')) {
      console.log('Creating MOCK Razorpay Order');
      return {
        id: 'order_mock_' + Math.random().toString(36).substring(7),
        entity: 'order',
        amount: Math.round(amount),
        amount_paid: 0,
        amount_due: Math.round(amount),
        currency: 'INR',
        receipt: orderId,
        status: 'created',
        attempts: 0,
        created_at: Math.floor(Date.now() / 1000),
      };
    }

      const options = {
        amount: Math.round(amount),
        currency: 'INR',
        receipt: orderId,
      };

    try {
      const order = await this.razorpay.orders.create(options);
      return order;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Razorpay order creation failed');
    }
  }

  async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
  ) {
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');
    let internalOrderId = "";

    // MOCK FLOW
    if (!keySecret || keySecret.includes('placeholder')) {
        console.log("Verifying MOCK payment");
        // In mock mode, we assume the latest pending order is the one being paid
        // This is a simplification for "launching" the app without real payments
        const lastOrder = await this.prisma.order.findFirst({
            where: { status: 'PENDING' },
            orderBy: { createdAt: 'desc' }
        });
        if (lastOrder) {
            internalOrderId = lastOrder.orderId;
        }
    } else {
        // REAL FLOW
        const body = razorpayOrderId + '|' + razorpayPaymentId;
        const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(body.toString())
        .digest('hex');

        if (expectedSignature !== razorpaySignature) {
            throw new BadRequestException('Invalid signature');
        }

        const rzpOrder = await this.razorpay.orders.fetch(razorpayOrderId);
        internalOrderId = rzpOrder.receipt;
    }

    if (internalOrderId) {
        await this.prisma.order.update({
            where: { orderId: internalOrderId },
            data: {
                paymentStatus: 'PAID',
                status: 'PREPARING',
            },
        });
        return { status: 'success' };
    } else {
        throw new BadRequestException('Order not found or verification failed');
    }
  }
}
