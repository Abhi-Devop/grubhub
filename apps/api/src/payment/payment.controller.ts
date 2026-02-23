import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { OrderService } from '../order/order.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService,
  ) {}

  @Post('create-order')
  async createOrder(@Body() data: { userId: string; storeId: string; items: any[] }) {
    // 1. Create internal order first
    const internalOrder = await this.orderService.createOrder(Number(data.userId), Number(data.storeId), data.items);
    
    // 2. Create Razorpay order
    const rzpOrder = await this.paymentService.createRazorpayOrder(internalOrder.totalAmount, internalOrder.orderId);
    
    return {
      ...rzpOrder,
      internalOrderId: internalOrder.id,
    };
  }

  @Post('verify')
  async verifyPayment(
    @Body() data: { 
      razorpay_order_id: string; 
      razorpay_payment_id: string; 
      razorpay_signature: string;
    }
  ) {
    return this.paymentService.verifyPayment(
      data.razorpay_order_id,
      data.razorpay_payment_id,
      data.razorpay_signature
    );
  }
}
