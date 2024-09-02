import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Brand, Prisma } from "@prisma/client";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBrandDto } from "./dto/create-brand.dto";

@Injectable()
export class BrandService {

    constructor(private readonly prisma:PrismaService){}

    async getAllBrands(paginationDto: PaginationDto):Promise<Brand[]> {

        const {limit = 10, offset = 0} = paginationDto;

        return this.prisma.brand.findMany({
            take: limit,
            skip: offset
        });
    }

    async createBrand(createBrandDto:CreateBrandDto){
        try{
            const brand = await this.prisma.brand.create({
                data: {
                    name: createBrandDto.name.toLocaleLowerCase()
                }
            });
            return brand;
        }catch(err){
            this.handleDbExceptions(err);
        }
    }

    private handleDbExceptions (err: any) {
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2002') throw new BadRequestException("Unique constraint failed on the constraint");
        }
        throw new InternalServerErrorException('ups');
    }

}