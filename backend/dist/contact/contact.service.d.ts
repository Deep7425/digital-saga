import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './contact.dto';
export declare class ContactService {
    private contactRepository;
    constructor(contactRepository: Repository<Contact>);
    create(createContactDto: CreateContactDto): Promise<Contact>;
    findAll(): Promise<Contact[]>;
    findOne(id: number): Promise<Contact>;
}
