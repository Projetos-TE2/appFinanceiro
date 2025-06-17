import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(createAccountDto: CreateAccountDto): Promise<import("./entities/account.entity").Account>;
    findAll(institutionId?: string): Promise<import("./entities/account.entity").Account[]>;
    findOne(id: string): Promise<import("./entities/account.entity").Account>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<import("./entities/account.entity").Account>;
    remove(id: string): Promise<void>;
}
