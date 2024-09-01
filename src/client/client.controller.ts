import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { Client } from '@prisma/client';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientController {

    constructor(private readonly clientService:ClientService){}

    @Get()
    getAllClients(@Query()paginationDto: PaginationDto ):Promise<Client[]> {
        return this.clientService.allClients(paginationDto);
    }

    @Get(':id')
    getClientById(@Param('id', ParseUUIDPipe) id: string):Promise<Client> {
        return this.clientService.getClientById(id);
    }

    @Post()
    createClient(@Body() createClientDto:CreateClientDto){
        return this.clientService.createClient(createClientDto);
    }

    @Patch(':id')
    updateClient(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateClientDto: UpdateClientDto
    ){
        return this.clientService.updateClient(id, updateClientDto);
    }

    @Delete(':id')
    deleteClient(@Param('id', ParseUUIDPipe) id: string) {
        return this.clientService.deleteClient(id);
    }
}
