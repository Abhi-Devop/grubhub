import { Controller, Post, Headers, Req, Res, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
// @ts-ignore
import * as crypto from 'crypto';

@Controller('webhooks')
export class WebhooksController {
  
  @Post('razorpay')
  async handleRazorpayWebhook(
    @Headers('x-razorpay-signature') signature: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
        console.error('Webhook secret not defined');
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Configuration Error');
    }

    // Verify webhook signature
    const body = (req as any).rawBody || JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(HttpStatus.UNAUTHORIZED).send('Invalid signature');
    }

    const event = req.body;

    switch (event.event) {
      case 'payment.captured':
        console.log('Payment Captured:', event.payload.payment.entity);
        // Note: Update Order state to PAID in business logic
        break;
      case 'payment.failed':
        console.log('Payment Failed:', event.payload.payment.entity);
        // Note: Handle failure logic
        break;
      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    res.status(HttpStatus.OK).send();
  }
}
