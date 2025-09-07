import { ContactService } from './contact.service';
import { CreateContactDto } from './contact.dto';
import { Contact } from './contact.entity';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(createContactDto: CreateContactDto): Promise<Contact>;
    findAll(): Promise<Contact[]>;
    findOne(id: number): Promise<Contact>;
}
