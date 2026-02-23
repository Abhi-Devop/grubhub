import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout')
  checkout(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(
      Number(createOrderDto.userId), 
      Number(createOrderDto.storeId), 
      createOrderDto.items, 
      createOrderDto.paymentMethod
    );
  }

  @Get('user/:userId')
  getUserOrders(@Param('userId') userId: string) {
    return this.orderService.getUserOrders(Number(userId));
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(Number(id));
  }

  @Get()
  async getAllOrders() {
      return this.orderService.getAllOrders();
  }

  @Post(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
      return this.orderService.updateOrderStatus(Number(id), status);
  }
}
