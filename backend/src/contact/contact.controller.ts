import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './contact.dto';
import { Contact } from './contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return await this.contactService.create(createContactDto);
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return await this.contactService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    return await this.contactService.findOne(id);
  }
} 