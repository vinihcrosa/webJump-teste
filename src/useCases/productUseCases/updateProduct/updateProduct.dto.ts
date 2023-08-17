import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsInt()
  @IsOptional()
  quantity?: number;

  @IsOptional()
  category?: string[];
}