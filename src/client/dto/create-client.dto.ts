import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateClientDto {
    @IsOptional()
    readonly lastname?: string
    @IsString()
    readonly name: string
    @IsNumber()
    readonly dni: number
}