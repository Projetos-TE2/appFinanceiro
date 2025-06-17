import { Account } from '../../accounts/entities/account.entity';
export declare class Institution {
    id: number;
    name: string;
    code: string;
    website: string;
    phone: string;
    accounts: Account[];
    createdAt: Date;
    updatedAt: Date;
}
