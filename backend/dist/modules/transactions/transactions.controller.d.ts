import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): Promise<import("./entities/transaction.entity").Transaction>;
    findAll(accountId?: string, categoryId?: string, startDate?: string, endDate?: string): Promise<import("./entities/transaction.entity").Transaction[]>;
    getBalance(): Promise<{
        totalReceitas: number;
        totalDespesas: number;
        saldoGeral: number;
    }>;
    findOne(id: string): Promise<import("./entities/transaction.entity").Transaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<import("./entities/transaction.entity").Transaction>;
    remove(id: string): Promise<void>;
}
