import { Transaction } from '../../transactions/entities/transaction.entity';
export declare class Category {
    id: number;
    name: string;
    type: string;
    description: string;
    color: string;
    icon: string;
    transactions: Transaction[];
    createdAt: Date;
    updatedAt: Date;
}
