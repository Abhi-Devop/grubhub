import { Controller, Post, Req, Res, Headers, BadRequestException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Controller('payment/webhook')
export class WebhookController {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async handleWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Res() res: Response,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    const secret = this.configService.get<string>('RAZORPAY_WEBHOOK_SECRET');

    // Skip validation if testing/placeholder
    if (secret && !secret.includes('placeholder')) {
      if (!signature) {
          throw new BadRequestException('Missing signature');
      }

      // Validate signature
      const body = req.rawBody ? req.rawBody : JSON.stringify(req.body);
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature !== signature) {
        throw new BadRequestException('Invalid webhook signature');
      }
    }

    const event = req.body;

    // Handle payment.captured or order.paid
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const rzpOrderId = event.payload.payment.entity.order_id;
      
      // Find the internal order using the receipt or razorpay flow
      // Since our mock sets internalOrderId as receipt:
      const receipt = event.payload.order?.entity?.receipt || event.payload.payment?.entity?.notes?.orderId;
      
      if (receipt) {
          await this.prisma.order.updateMany({
              where: { orderId: receipt },
              data: {
                  paymentStatus: 'PAID',
                  status: 'PREPARING',
              },
          });
      }
    }

    // Always return 200 OK so Razorpay doesn't retry
    res.status(200).json({ status: 'ok' });
  }
}
