import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {

    private readonly logger = new Logger('ClientService');

    constructor(private prisma:PrismaService){}

    async allClients(paginationDto:PaginationDto):Promise<Client[]>{
        const {limit = 10, offset = 0} = paginationDto;
        return this.prisma.client.findMany({
            skip: offset,
            take: limit
        });
    }

    async getClientById(id: string): Promise<Client>{
        return this.prisma.client.findUnique({
            where: {
                id
            }
        })
    }

    async createClient(createClientDto: CreateClientDto){
        try{
            const client = await this.prisma.client.create({
                data: {
                    ...createClientDto
                }
            });
            return client;
        }catch(err){
            this.handleDbExceptions(err);
        }
    }

    async updateClient(id:string, updateClientDto: UpdateClientDto): Promise<Client> {
        try{
            const client = await this.prisma.client.update({
                where: {
                    id
                },
                data: {
                    ...updateClientDto
                }
            });
    
            return client;
        }catch(err){
            this.handleDbExceptions(err);
        }
    }

    async deleteClient(id: string): Promise<Client> {
        try{
            return await this.prisma.client.delete({
                where: {
                    id
                }
            });
        }catch(err){
            this.handleDbExceptions(err);
        }
    }


    private handleDbExceptions (err: any) {
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2002') throw new BadRequestException("Unique constraint failed on the constraint");
        }
        this.logger.error(err);
        throw new InternalServerErrorException('ups');
    }
}
