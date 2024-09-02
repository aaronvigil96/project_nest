import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateToolDto } from "./dto/create-tool.dto";
import { Prisma } from "@prisma/client";

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

    async createTool(createToolDto:CreateToolDto){
        try{

            const client = await this.prisma.client.findUnique({
                where: {
                    dni: 39349583
                }
            });
            
            const tool = await this.prisma.tool.findUnique({
                where: {
                    model: 'ms250'
                }
            });

            const toolSearch = await this.prisma.toolsOnClients.findFirst({
                where: {
                    toolID: tool.id
                },
                include: {
                    client: true,
                    tool: true
                }
            });

            console.log(toolSearch);

        
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