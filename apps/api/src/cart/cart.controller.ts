import { Controller, Post, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(Number(userId));
  }

  @Post('add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(
      Number(addToCartDto.userId), 
      Number(addToCartDto.storeId), 
      Number(addToCartDto.storeProductId), 
      addToCartDto.quantity
    );
  }

  @Post('remove')
  removeFromCart(@Body() removeFromCartDto: RemoveFromCartDto) {
    return this.cartService.removeFromCart(Number(removeFromCartDto.userId), Number(removeFromCartDto.storeProductId));
  }
}
