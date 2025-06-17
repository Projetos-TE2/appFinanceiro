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
exports.InstitutionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const institution_entity_1 = require("./entities/institution.entity");
let InstitutionsService = class InstitutionsService {
    constructor(institutionRepository) {
        this.institutionRepository = institutionRepository;
    }
    async create(createInstitutionDto) {
        const existingInstitution = await this.institutionRepository.findOne({
            where: { name: createInstitutionDto.name }
        });
        if (existingInstitution) {
            throw new common_1.ConflictException(`Instituição '${createInstitutionDto.name}' já existe`);
        }
        if (createInstitutionDto.name.length < 2) {
            throw new common_1.BadRequestException('Nome da instituição deve ter pelo menos 2 caracteres');
        }
        if (createInstitutionDto.code) {
            const existingCode = await this.institutionRepository.findOne({
                where: { code: createInstitutionDto.code }
            });
            if (existingCode) {
                throw new common_1.ConflictException(`Código '${createInstitutionDto.code}' já está em uso`);
            }
        }
        const institution = this.institutionRepository.create(createInstitutionDto);
        return this.institutionRepository.save(institution);
    }
    async findAll() {
        return this.institutionRepository.find({
            relations: ['accounts'],
            order: { name: 'ASC' }
        });
    }
    async findOne(id) {
        const institution = await this.institutionRepository.findOne({
            where: { id },
            relations: ['accounts']
        });
        if (!institution) {
            throw new common_1.NotFoundException(`Instituição com ID ${id} não encontrada`);
        }
        return institution;
    }
    async update(id, updateInstitutionDto) {
        const institution = await this.findOne(id);
        if (updateInstitutionDto.name && updateInstitutionDto.name !== institution.name) {
            const existingInstitution = await this.institutionRepository.findOne({
                where: { name: updateInstitutionDto.name }
            });
            if (existingInstitution) {
                throw new common_1.ConflictException(`Instituição '${updateInstitutionDto.name}' já existe`);
            }
        }
        if (updateInstitutionDto.code && updateInstitutionDto.code !== institution.code) {
            const existingCode = await this.institutionRepository.findOne({
                where: { code: updateInstitutionDto.code }
            });
            if (existingCode) {
                throw new common_1.ConflictException(`Código '${updateInstitutionDto.code}' já está em uso`);
            }
        }
        Object.assign(institution, updateInstitutionDto);
        return this.institutionRepository.save(institution);
    }
    async remove(id) {
        const institution = await this.findOne(id);
        if (institution.accounts && institution.accounts.length > 0) {
            throw new common_1.BadRequestException('Não é possível excluir instituição que possui contas vinculadas');
        }
        await this.institutionRepository.remove(institution);
    }
};
exports.InstitutionsService = InstitutionsService;
exports.InstitutionsService = InstitutionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(institution_entity_1.Institution)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InstitutionsService);
//# sourceMappingURL=institutions.service.js.map