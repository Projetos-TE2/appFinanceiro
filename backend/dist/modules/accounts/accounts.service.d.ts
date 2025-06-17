import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InstitutionsService } from '../institutions/institutions.service';
export declare class AccountsService {
    private accountRepository;
    private institutionsService;
    constructor(accountRepository: Repository<Account>, institutionsService: InstitutionsService);
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    findAll(): Promise<Account[]>;
    findByInstitution(institutionId: number): Promise<Account[]>;
    findOne(id: number): Promise<Account>;
    update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account>;
    remove(id: number): Promise<void>;
    updateBalance(accountId: number, amount: number): Promise<Account>;
}
