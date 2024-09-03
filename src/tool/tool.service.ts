import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateToolDto } from "./dto/create-tool.dto";
import { Prisma, Tool } from "@prisma/client";
import { UpdateToolDto } from "./dto/update-tool.dto";

@Injectable()
export class ToolService {

    constructor(private readonly prisma:PrismaService){}

    async getAllTools(paginationDto:PaginationDto){
        const {limit = 10, offset = 0} = paginationDto;
        return this.prisma.tool.findMany({
            take: limit,
            skip: offset
        })
    }

    async getToolById(id: string){

        const tool: Tool | null = await this.prisma.tool.findUnique({
            where: {
                id
            }
        });

        if(tool == null) throw new InternalServerErrorException('ups');

        return tool;
    }

    async createTool(createToolDto:CreateToolDto){
        try{
            const tool = await this.prisma.tool.create({
                data: {
                    model: createToolDto.model.toLowerCase(),
                    brandId: createToolDto.brandId
                },
            });
            return tool;
        }catch(err){
            this.handleDbExceptions(err);
        }
    }

    async updateTool(id: string, updateToolDto:UpdateToolDto){
        try{
            const tool = this.prisma.tool.update({
                where: {
                    id
                },
                data: {
                    ...updateToolDto,
                    model: updateToolDto.model.toLocaleLowerCase()
                }
            });

            return tool;
        }catch(err){
            this.handleDbExceptions(err);
        }
    }

    async deleteTool(id: string){
        try{
            const tool = await this.prisma.tool.delete({
                where: {
                    id
                }
            });

            return tool;

        }catch(err){
            this.handleDbExceptions(err);
        }
    }



    private handleDbExceptions (err: any) {
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2002') throw new BadRequestException("Unique constraint failed on the constraint");
            if(err.code === 'P2025') throw new BadRequestException("No existe esa herramienta");
        }
        throw new InternalServerErrorException('ups');
    }
}