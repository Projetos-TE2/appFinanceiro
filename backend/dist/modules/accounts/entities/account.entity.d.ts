import { Institution } from '../../institutions/entities/institution.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
export declare class Account {
    id: number;
    name: string;
    type: string;
    balance: number;
    accountNumber: string;
    agency: string;
    institution: Institution;
    institutionId: number;
    transactions: Transaction[];
    createdAt: Date;
    updatedAt: Date;
}
