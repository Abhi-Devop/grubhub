import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  userId: string | number;

  @IsNotEmpty()
  storeId: string | number;

  @IsNotEmpty()
  storeProductId: string | number;

  @IsInt()
  @Min(1)
  quantity: number;
}
