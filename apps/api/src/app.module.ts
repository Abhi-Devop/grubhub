import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CatalogModule } from './catalog/catalog.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { PaymentModule } from './payment/payment.module';
import { AddressModule } from './address/address.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      store: require('cache-manager-redis-store'),
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    }),
    PrismaModule, 
    CatalogModule, 
    CartModule, 
    OrderModule, 
    AuthModule,
    PaymentModule,
    AddressModule,
    WebhooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
