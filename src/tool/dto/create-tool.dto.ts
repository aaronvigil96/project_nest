import { IsString } from "class-validator";

export class CreateToolDto {
    @IsString()
    model: string;
    @IsString()
    brandId: string;
}