"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedInitialData1701234567891 = void 0;
class SeedInitialData1701234567891 {
    constructor() {
        this.name = 'SeedInitialData1701234567891';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            INSERT INTO "users" ("email", "password", "name", "phone") VALUES 
            ('admin@financeiro.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8/ZjQAiTcL.P4OJFr5qZqzjKOhz3Ni', 'Administrador', '(11) 99999-9999')
        `);
        await queryRunner.query(`
            INSERT INTO "institutions" ("name", "code", "website") VALUES 
            ('Banco do Brasil', '001', 'https://www.bb.com.br'),
            ('Caixa Econômica Federal', '104', 'https://www.caixa.gov.br'),
            ('Itaú Unibanco', '341', 'https://www.itau.com.br'),
            ('Bradesco', '237', 'https://www.bradesco.com.br'),
            ('Santander', '033', 'https://www.santander.com.br'),
            ('Nubank', '260', 'https://www.nubank.com.br'),
            ('Inter', '077', 'https://www.bancointer.com.br'),
            ('C6 Bank', '336', 'https://www.c6bank.com.br')
        `);
        await queryRunner.query(`
            INSERT INTO "categories" ("name", "type", "description", "color", "icon") VALUES 
            ('Salário', 'Receita', 'Salário mensal', '#4CAF50', 'wallet'),
            ('Freelance', 'Receita', 'Trabalhos extras', '#8BC34A', 'briefcase'),
            ('Investimentos', 'Receita', 'Rendimentos de investimentos', '#2196F3', 'trending-up'),
            ('Vendas', 'Receita', 'Vendas de produtos', '#FF9800', 'storefront'),
            
            ('Alimentação', 'Despesa', 'Gastos com comida', '#F44336', 'restaurant'),
            ('Transporte', 'Despesa', 'Combustível, transporte público', '#9C27B0', 'car'),
            ('Moradia', 'Despesa', 'Aluguel, financiamento, contas da casa', '#607D8B', 'home'),
            ('Saúde', 'Despesa', 'Médicos, medicamentos', '#E91E63', 'medical'),
            ('Educação', 'Despesa', 'Cursos, livros, escola', '#3F51B5', 'school'),
            ('Lazer', 'Despesa', 'Cinema, viagens, entretenimento', '#FF5722', 'game-controller'),
            ('Compras', 'Despesa', 'Roupas, eletrônicos', '#795548', 'bag'),
            ('Serviços', 'Despesa', 'Internet, telefone, streaming', '#009688', 'construct')
        `);
        await queryRunner.query(`
            INSERT INTO "accounts" ("name", "type", "balance", "accountNumber", "agency", "institutionId") VALUES 
            ('Conta Corrente Principal', 'Corrente', 2500.00, '12345-6', '1234', 1),
            ('Poupança', 'Poupança', 5000.00, '98765-4', '1234', 1),
            ('Cartão de Crédito', 'Cartão de Crédito', 0.00, '****1234', null, 4),
            ('Conta Digital', 'Corrente', 1200.00, '87654-3', null, 6)
        `);
        await queryRunner.query(`
            INSERT INTO "transactions" ("title", "amount", "description", "transactionDate", "categoryId", "accountId") VALUES 
            ('Salário Novembro', 5000.00, 'Salário mensal', '2024-11-01', 1, 1),
            ('Supermercado', -350.00, 'Compras do mês', '2024-11-02', 5, 1),
            ('Combustível', -200.00, 'Gasolina', '2024-11-03', 6, 1),
            ('Aluguel', -1200.00, 'Aluguel casa', '2024-11-05', 7, 1),
            ('Freelance Design', 800.00, 'Projeto de design', '2024-11-10', 2, 4),
            ('Cinema', -45.00, 'Filme com a família', '2024-11-12', 10, 1)
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "transactions"`);
        await queryRunner.query(`DELETE FROM "accounts"`);
        await queryRunner.query(`DELETE FROM "categories"`);
        await queryRunner.query(`DELETE FROM "institutions"`);
        await queryRunner.query(`DELETE FROM "users"`);
    }
}
exports.SeedInitialData1701234567891 = SeedInitialData1701234567891;
//# sourceMappingURL=1701234567891-SeedInitialData.js.map