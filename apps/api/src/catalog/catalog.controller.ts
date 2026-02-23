import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseInterceptors, UseGuards } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CatalogService } from './catalog.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('stores/nearest')
  async getNearestStore(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ) {
    return this.catalogService.findNearestStore(parseFloat(lat), parseFloat(lng));
  }

  @Get('products')
  @UseInterceptors(CacheInterceptor)
  async getProducts(@Query('storeId') storeId?: string) {
    return this.catalogService.getProducts(storeId ? Number(storeId) : undefined);
  }

  @Get('categories')
  @UseInterceptors(CacheInterceptor)
  async getCategories() {
    return this.catalogService.getCategories();
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: string) {
      return this.catalogService.getProduct(id);
  }

  @Get('search')
  async search(@Query('q') query?: string) {
    const products = await this.catalogService.searchProducts(query || '');
    
    // Transform for UI
    return products.map(p => ({
        ...p,
        price: p.storeProducts?.[0]?.price || 0,
        mrp: p.storeProducts?.[0]?.mrp || 0,
        storeProductId: p.storeProducts?.[0]?.id || 'unknown',
        stock: p.storeProducts?.[0]?.stock || 0
    }));
  }

  @Post('products')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async createProduct(@Body() body: any) {
      return this.catalogService.createProduct(body);
  }

  @Put('products/:id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async updateProduct(@Param('id') id: string, @Body() body: any) {
      return this.catalogService.updateProduct(Number(id), body);
  }

  @Post('categories')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async createCategory(@Body() body: any) {
      return this.catalogService.createCategory(body);
  }

  @Put('categories/:id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async updateCategory(@Param('id') id: string, @Body() body: any) {
      return this.catalogService.updateCategory(Number(id), body);
  }

  @Delete('categories/:id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async deleteCategory(@Param('id') id: string) {
      return this.catalogService.deleteCategory(Number(id));
  }

  @Delete('products/:id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async deleteProduct(@Param('id') id: string) {
      return this.catalogService.deleteProduct(Number(id));
  }
}
