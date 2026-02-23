import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AddressService } from './address.service';

// Mock AuthGuard if not importing from auth module yet, or assuming global validation or passing userId in body for dev
// Ideally use @UseGuards(JwtAuthGuard)
// For speed/dev, we'll accept userId in body OR assume we can extract from request if auth middleware is set up

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() body: any) {
    // Expecting userId in body for now to simplify testing if auth headers aren't perfect yet
    const { userId, ...data } = body;
    if (!userId) throw new UnauthorizedException('UserId is required');
    return this.addressService.createAddress(Number(userId), data);
  }

  @Get()
  async findAll(@Request() req: any) {
      // If using proper auth guard, req.user should be populated
      // fallback to query param or header for dev testing
      const userId = req.headers['x-user-id'] || req.query.userId;
       if (!userId) throw new UnauthorizedException('UserId is required');
      return this.addressService.getUserAddresses(Number(userId));
  }
  
  // Alternative: Direct endpoint for user
  @Get('user/:userId')
  async getUserAddresses(@Param('userId') userId: string) {
      return this.addressService.getUserAddresses(Number(userId));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const { userId, ...data } = body;
     if (!userId) throw new UnauthorizedException('UserId is required');
    return this.addressService.updateAddress(Number(id), Number(userId), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Body() body: any) {
    // Ideally delete methods usually don't have body, pass userId in header/auth
    const userId = body.userId || body.user_id; // Handle snake/camel
    
    // Fallback: If no userId provided, we can't verify ownership securely without auth guard
    // For now, requiring userId in body for delete is unconventional but works for internal API
    // BETTER: Use Query Param for userId if Body not allowed in DELETE
     if (!userId) throw new UnauthorizedException('UserId is required');
     
    return this.addressService.deleteAddress(Number(id), Number(userId));
  }
  
  // Better Delete with Query Param
  @Delete(':id/user/:userId')
  async removeWithUser(@Param('id') id: string, @Param('userId') userId: string) {
      return this.addressService.deleteAddress(Number(id), Number(userId));
  }
}
