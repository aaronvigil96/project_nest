import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreateBrandDto } from "./dto/create-brand.dto";

@Controller('brands')
export class BrandController {

    constructor(private readonly brandService:BrandService){}

    @Get()
    getAllBrands(@Query() paginationDto: PaginationDto) {
        return this.brandService.getAllBrands(paginationDto);
    }

    @Post()
    createBrand(@Body() createBrandDto:CreateBrandDto){
        return this.brandService.createBrand(createBrandDto);
    }

}