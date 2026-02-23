import { IsNotEmpty } from 'class-validator';

export class RemoveFromCartDto {
  @IsNotEmpty()
  userId: string | number;

  @IsNotEmpty()
  storeProductId: string | number;
}
