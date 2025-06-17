"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../modules/users/entities/user.entity");
const category_entity_1 = require("../modules/categories/entities/category.entity");
const account_entity_1 = require("../modules/accounts/entities/account.entity");
const transaction_entity_1 = require("../modules/transactions/entities/transaction.entity");
const institution_entity_1 = require("../modules/institutions/entities/institution.entity");
const dotenv = require("dotenv");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'app_financeiro',
    synchronize: false,
    logging: true,
    entities: [user_entity_1.User, category_entity_1.Category, account_entity_1.Account, transaction_entity_1.Transaction, institution_entity_1.Institution],
    migrations: ['src/database/migrations/*.ts'],
    subscribers: ['src/database/subscribers/*.ts'],
});
//# sourceMappingURL=data-source.js.map