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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto) {
        const existingCategory = await this.categoryRepository.findOne({
            where: {
                name: createCategoryDto.name,
                type: createCategoryDto.type
            }
        });
        if (existingCategory) {
            throw new common_1.ConflictException(`Categoria '${createCategoryDto.name}' já existe para o tipo '${createCategoryDto.type}'`);
        }
        if (!['Receita', 'Despesa'].includes(createCategoryDto.type)) {
            throw new common_1.BadRequestException('Tipo deve ser "Receita" ou "Despesa"');
        }
        if (createCategoryDto.name.length < 2) {
            throw new common_1.BadRequestException('Nome da categoria deve ter pelo menos 2 caracteres');
        }
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }
    async findAll() {
        return this.categoryRepository.find({
            relations: ['transactions'],
            order: { name: 'ASC' }
        });
    }
    async findByType(type) {
        return this.categoryRepository.find({
            where: { type },
            relations: ['transactions'],
            order: { name: 'ASC' }
        });
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['transactions']
        });
        if (!category) {
            throw new common_1.NotFoundException(`Categoria com ID ${id} não encontrada`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
            const type = updateCategoryDto.type || category.type;
            const existingCategory = await this.categoryRepository.findOne({
                where: {
                    name: updateCategoryDto.name,
                    type: type
                }
            });
            if (existingCategory && existingCategory.id !== id) {
                throw new common_1.ConflictException(`Categoria '${updateCategoryDto.name}' já existe para o tipo '${type}'`);
            }
        }
        Object.assign(category, updateCategoryDto);
        return this.categoryRepository.save(category);
    }
    async remove(id) {
        const category = await this.findOne(id);
        if (category.transactions && category.transactions.length > 0) {
            throw new common_1.BadRequestException('Não é possível excluir categoria que possui transações vinculadas');
        }
        await this.categoryRepository.remove(category);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map