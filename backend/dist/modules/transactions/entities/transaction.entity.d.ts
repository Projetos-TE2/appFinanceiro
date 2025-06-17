import { Category } from '../../categories/entities/category.entity';
import { Account } from '../../accounts/entities/account.entity';
export declare class Transaction {
    id: number;
    title: string;
    amount: number;
    description: string;
    transactionDate: Date;
    image: string;
    category: Category;
    categoryId: number;
    account: Account;
    accountId: number;
    createdAt: Date;
    updatedAt: Date;
}
