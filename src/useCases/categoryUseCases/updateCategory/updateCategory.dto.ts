import { IsOptional, IsString } from "class-validator";

export class UpdateCategoryDTO {
  @IsString()
  name: string
}