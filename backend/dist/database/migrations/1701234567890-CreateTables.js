"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1701234567890 = void 0;
class CreateTables1701234567890 {
    constructor() {
        this.name = 'CreateTables1701234567890';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "name" character varying NOT NULL,
                "phone" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "institutions" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "code" character varying,
                "website" character varying,
                "phone" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_institutions_name" UNIQUE ("name"),
                CONSTRAINT "UQ_institutions_code" UNIQUE ("code"),
                CONSTRAINT "PK_institutions_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "type" character varying NOT NULL,
                "description" character varying,
                "color" character varying,
                "icon" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_categories_name_type" UNIQUE ("name", "type"),
                CONSTRAINT "PK_categories_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "accounts" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "type" character varying NOT NULL,
                "balance" numeric(10,2) NOT NULL DEFAULT '0',
                "accountNumber" character varying,
                "agency" character varying,
                "institutionId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_accounts_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_accounts_institutionId" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "transactions" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "amount" numeric(10,2) NOT NULL,
                "description" character varying,
                "transactionDate" TIMESTAMP NOT NULL,
                "image" character varying,
                "categoryId" integer NOT NULL,
                "accountId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_transactions_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_transactions_categoryId" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_transactions_accountId" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`CREATE INDEX "IDX_transactions_transactionDate" ON "transactions" ("transactionDate")`);
        await queryRunner.query(`CREATE INDEX "IDX_transactions_categoryId" ON "transactions" ("categoryId")`);
        await queryRunner.query(`CREATE INDEX "IDX_transactions_accountId" ON "transactions" ("accountId")`);
        await queryRunner.query(`CREATE INDEX "IDX_accounts_institutionId" ON "accounts" ("institutionId")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_accounts_institutionId"`);
        await queryRunner.query(`DROP INDEX "IDX_transactions_accountId"`);
        await queryRunner.query(`DROP INDEX "IDX_transactions_categoryId"`);
        await queryRunner.query(`DROP INDEX "IDX_transactions_transactionDate"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "institutions"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateTables1701234567890 = CreateTables1701234567890;
//# sourceMappingURL=1701234567890-CreateTables.js.map