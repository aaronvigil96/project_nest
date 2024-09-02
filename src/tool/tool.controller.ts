import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ToolService } from "./tool.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreateToolDto } from "./dto/create-tool.dto";

@Controller('tools')
export class ToolController {
    
    constructor(private readonly toolService:ToolService){}

    @Get()
    getAllTools(@Query() paginationDto: PaginationDto){
        return this.toolService.getAllTools(paginationDto);
    }

    @Post()
    createTool(@Body() createToolDto:CreateToolDto){
        return this.toolService.createTool(createToolDto);
    }

}