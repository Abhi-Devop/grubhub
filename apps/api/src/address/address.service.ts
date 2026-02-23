import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async createAddress(userId: number, data: any) {
    // Basic validation or transformation could go here
    // For now, we mock lat/lng since frontend doesn't provide it yet
    return this.prisma.address.create({
      data: {
        userId,
        street: data.address, // Mapping full address string to street
        type: data.type || 'Home',
        lat: data.lat || 0.0,
        lng: data.lng || 0.0,
        city: data.city, // Optional
        pincode: data.pincode, // Optional
        state: data.state, // Optional
        country: data.country, // Optional
        isDefault: data.isDefault || false,
      },
    });
  }

  async getUserAddresses(userId: number) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' } // or createdAt if available
    });
  }

  async updateAddress(id: number, userId: number, data: any) {
    // Verify ownership
    const address = await this.prisma.address.findFirst({
      where: { id, userId }
    });
    
    if (!address) {
      throw new NotFoundException('Address not found or unauthorized');
    }

    return this.prisma.address.update({
      where: { id },
      data: {
        street: data.address,
        type: data.type,
        city: data.city,
        pincode: data.pincode,
        state: data.state,
        country: data.country,
        // lat/lng updates if provided
      }
    });
  }

  async deleteAddress(id: number, userId: number) {
    const address = await this.prisma.address.findFirst({
        where: { id, userId }
    });
      
    if (!address) {
        throw new NotFoundException('Address not found or unauthorized');
    }

    return this.prisma.address.delete({
      where: { id }
    });
  }
}
