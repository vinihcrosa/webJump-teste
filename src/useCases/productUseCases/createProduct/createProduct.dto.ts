import { IsInt, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProductRequestDTO {
  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsInt()
  quantity: number;

  @MinLength(1)
  category: string[];

  @IsString()
  @IsOptional()
  image?: string
}