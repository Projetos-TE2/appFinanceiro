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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("./entities/account.entity");
const institutions_service_1 = require("../institutions/institutions.service");
let AccountsService = class AccountsService {
    constructor(accountRepository, institutionsService) {
        this.accountRepository = accountRepository;
        this.institutionsService = institutionsService;
    }
    async create(createAccountDto) {
        await this.institutionsService.findOne(createAccountDto.institutionId);
        const existingAccount = await this.accountRepository.findOne({
            where: {
                name: createAccountDto.name,
                institutionId: createAccountDto.institutionId
            }
        });
        if (existingAccount) {
            throw new common_1.ConflictException(`Conta '${createAccountDto.name}' já existe nesta instituição`);
        }
        if (['Corrente', 'Poupança'].includes(createAccountDto.type) && createAccountDto.balance < 0) {
            throw new common_1.BadRequestException('Saldo inicial não pode ser negativo para contas corrente ou poupança');
        }
        const account = this.accountRepository.create(createAccountDto);
        return this.accountRepository.save(account);
    }
    async findAll() {
        return this.accountRepository.find({
            relations: ['institution', 'transactions'],
            order: { name: 'ASC' }
        });
    }
    async findByInstitution(institutionId) {
        return this.accountRepository.find({
            where: { institutionId },
            relations: ['institution', 'transactions'],
            order: { name: 'ASC' }
        });
    }
    async findOne(id) {
        const account = await this.accountRepository.findOne({
            where: { id },
            relations: ['institution', 'transactions']
        });
        if (!account) {
            throw new common_1.NotFoundException(`Conta com ID ${id} não encontrada`);
        }
        return account;
    }
    async update(id, updateAccountDto) {
        const account = await this.findOne(id);
        if (updateAccountDto.institutionId && updateAccountDto.institutionId !== account.institutionId) {
            await this.institutionsService.findOne(updateAccountDto.institutionId);
        }
        if (updateAccountDto.name && updateAccountDto.name !== account.name) {
            const institutionId = updateAccountDto.institutionId || account.institutionId;
            const existingAccount = await this.accountRepository.findOne({
                where: {
                    name: updateAccountDto.name,
                    institutionId: institutionId
                }
            });
            if (existingAccount && existingAccount.id !== id) {
                throw new common_1.ConflictException(`Conta '${updateAccountDto.name}' já existe nesta instituição`);
            }
        }
        Object.assign(account, updateAccountDto);
        return this.accountRepository.save(account);
    }
    async remove(id) {
        const account = await this.findOne(id);
        if (account.transactions && account.transactions.length > 0) {
            throw new common_1.BadRequestException('Não é possível excluir conta que possui transações vinculadas');
        }
        await this.accountRepository.remove(account);
    }
    async updateBalance(accountId, amount) {
        const account = await this.findOne(accountId);
        account.balance = Number(account.balance) + Number(amount);
        return this.accountRepository.save(account);
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        institutions_service_1.InstitutionsService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map