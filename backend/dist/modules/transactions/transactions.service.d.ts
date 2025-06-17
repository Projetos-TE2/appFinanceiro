import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AccountsService } from '../accounts/accounts.service';
import { CategoriesService } from '../categories/categories.service';
export declare class TransactionsService {
    private transactionRepository;
    private accountsService;
    private categoriesService;
    constructor(transactionRepository: Repository<Transaction>, accountsService: AccountsService, categoriesService: CategoriesService);
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findByAccount(accountId: number): Promise<Transaction[]>;
    findByCategory(categoryId: number): Promise<Transaction[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]>;
    findOne(id: number): Promise<Transaction>;
    update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction>;
    remove(id: number): Promise<void>;
    getBalance(): Promise<{
        totalReceitas: number;
        totalDespesas: number;
        saldoGeral: number;
    }>;
}
