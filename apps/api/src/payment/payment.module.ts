import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { WebhookController } from './webhook.controller';
import { OrderModule } from '../order/order.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [OrderModule, PrismaModule],
  controllers: [PaymentController, WebhookController],
  providers: [PaymentService],
})
export class PaymentModule {}
