"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
const accounts_service_1 = require("../accounts/accounts.service");
const categories_service_1 = require("../categories/categories.service");
let TransactionsService = class TransactionsService {
    constructor(transactionRepository, accountsService, categoriesService) {
        this.transactionRepository = transactionRepository;
        this.accountsService = accountsService;
        this.categoriesService = categoriesService;
    }
    async create(createTransactionDto) {
        const account = await this.accountsService.findOne(createTransactionDto.accountId);
        const category = await this.categoriesService.findOne(createTransactionDto.categoryId);
        if (category.type === 'Despesa' && createTransactionDto.amount > 0) {
            throw new common_1.BadRequestException('Transações de despesa devem ter valor negativo');
        }
        if (category.type === 'Receita' && createTransactionDto.amount < 0) {
            throw new common_1.BadRequestException('Transações de receita devem ter valor positivo');
        }
        if (category.type === 'Despesa' && account.type !== 'Cartão de Crédito') {
            const newBalance = Number(account.balance) + Number(createTransactionDto.amount);
            if (newBalance < 0) {
                throw new common_1.BadRequestException('Saldo insuficiente para realizar esta transação');
            }
        }
        const transaction = this.transactionRepository.create({
            ...createTransactionDto,
            transactionDate: new Date(createTransactionDto.transactionDate),
        });
        const savedTransaction = await this.transactionRepository.save(transaction);
        await this.accountsService.updateBalance(createTransactionDto.accountId, createTransactionDto.amount);
        return savedTransaction;
    }
    async findAll() {
        return this.transactionRepository.find({
            relations: ['category', 'account', 'account.institution'],
            order: { transactionDate: 'DESC' }
        });
    }
    async findByAccount(accountId) {
        return this.transactionRepository.find({
            where: { accountId },
            relations: ['category', 'account', 'account.institution'],
            order: { transactionDate: 'DESC' }
        });
    }
    async findByCategory(categoryId) {
        return this.transactionRepository.find({
            where: { categoryId },
            relations: ['category', 'account', 'account.institution'],
            order: { transactionDate: 'DESC' }
        });
    }
    async findByDateRange(startDate, endDate) {
        return this.transactionRepository
            .createQueryBuilder('transaction')
            .where('transaction.transactionDate >= :startDate', { startDate })
            .andWhere('transaction.transactionDate <= :endDate', { endDate })
            .leftJoinAndSelect('transaction.category', 'category')
            .leftJoinAndSelect('transaction.account', 'account')
            .leftJoinAndSelect('account.institution', 'institution')
            .orderBy('transaction.transactionDate', 'DESC')
            .getMany();
    }
    async findOne(id) {
        const transaction = await this.transactionRepository.findOne({
            where: { id },
            relations: ['category', 'account', 'account.institution']
        });
        if (!transaction) {
            throw new common_1.NotFoundException(`Transação com ID ${id} não encontrada`);
        }
        return transaction;
    }
    async update(id, updateTransactionDto) {
        const transaction = await this.findOne(id);
        const oldAmount = transaction.amount;
        if (updateTransactionDto.accountId && updateTransactionDto.accountId !== transaction.accountId) {
            await this.accountsService.findOne(updateTransactionDto.accountId);
        }
        if (updateTransactionDto.categoryId && updateTransactionDto.categoryId !== transaction.categoryId) {
            await this.categoriesService.findOne(updateTransactionDto.categoryId);
        }
        await this.accountsService.updateBalance(transaction.accountId, -oldAmount);
        Object.assign(transaction, {
            ...updateTransactionDto,
            transactionDate: updateTransactionDto.transactionDate ?
                new Date(updateTransactionDto.transactionDate) : transaction.transactionDate
        });
        const updatedTransaction = await this.transactionRepository.save(transaction);
        const newAccountId = updateTransactionDto.accountId || transaction.accountId;
        const newAmount = updateTransactionDto.amount !== undefined ? updateTransactionDto.amount : transaction.amount;
        await this.accountsService.updateBalance(newAccountId, newAmount);
        return updatedTransaction;
    }
    async remove(id) {
        const transaction = await this.findOne(id);
        await this.accountsService.updateBalance(transaction.accountId, -transaction.amount);
        await this.transactionRepository.remove(transaction);
    }
    async getBalance() {
        const result = await this.transactionRepository
            .createQueryBuilder('transaction')
            .leftJoin('transaction.category', 'category')
            .select([
            'SUM(CASE WHEN category.type = \'Receita\' THEN transaction.amount ELSE 0 END) as "totalReceitas"',
            'SUM(CASE WHEN category.type = \'Despesa\' THEN ABS(transaction.amount) ELSE 0 END) as "totalDespesas"',
            'SUM(transaction.amount) as "saldoGeral"'
        ])
            .getRawOne();
        return {
            totalReceitas: parseFloat(result.totalReceitas) || 0,
            totalDespesas: parseFloat(result.totalDespesas) || 0,
            saldoGeral: parseFloat(result.saldoGeral) || 0
        };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        accounts_service_1.AccountsService,
        categories_service_1.CategoriesService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map