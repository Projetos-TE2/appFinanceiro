# App Financeiro - Backend

Backend desenvolvido em **NestJS** com **TypeORM** e **PostgreSQL** para um aplicativo de controle financeiro pessoal.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação da API
- **Class Validator** - Validação de dados

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## 🔧 Instalação

### 1. Clone o repositório e navegue para a pasta do backend

```bash
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados PostgreSQL

Crie um banco de dados PostgreSQL chamado `app_financeiro`:

```sql
CREATE DATABASE app_financeiro;
```

### 4. Configure as variáveis de ambiente

Copie o arquivo `.env` e configure conforme seu ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# Configurações do Banco de Dados
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=app_financeiro

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro_aqui_123456

# Porta da aplicação
PORT=3000
```

### 5. Execute as migrations

```bash
# Executar migrations para criar as tabelas
npm run migration:run
```

### 6. Inicie a aplicação

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

A aplicação estará rodando em `http://localhost:3000`

## 📚 Documentação da API

A documentação completa da API está disponível via Swagger em:
`http://localhost:3000/api`

## 🗃️ Estrutura do Projeto

```
src/
├── database/
│   ├── data-source.ts          # Configuração do TypeORM
│   └── migrations/             # Migrations do banco
├── modules/
│   ├── users/                  # Módulo de usuários
│   ├── categories/             # Módulo de categorias
│   ├── institutions/           # Módulo de instituições
│   ├── accounts/               # Módulo de contas
│   └── transactions/           # Módulo de transações
├── app.module.ts               # Módulo principal
└── main.ts                     # Arquivo de bootstrap
```

## 🎯 Funcionalidades

### ✅ CRUDs Implementados

1. **Usuários** - Gerenciamento de usuários do sistema
2. **Categorias** - Categorias de receitas e despesas
3. **Instituições** - Bancos e instituições financeiras
4. **Contas** - Contas bancárias, cartões, etc.
5. **Transações** - Movimentações financeiras

### 🛡️ Regras de Negócio

#### Usuários (3 regras)
1. Email deve ser único no sistema
2. Senha deve ter pelo menos 6 caracteres
3. Nome deve ter pelo menos 2 caracteres

#### Categorias (3 regras)
1. Nome da categoria deve ser único por tipo (Receita/Despesa)
2. Tipo deve ser obrigatoriamente "Receita" ou "Despesa"
3. Não é possível excluir categoria que possui transações vinculadas

#### Instituições (3 regras)
1. Nome da instituição deve ser único
2. Código da instituição deve ser único (se fornecido)
3. Não é possível excluir instituição que possui contas vinculadas

#### Contas (3 regras)
1. Nome da conta deve ser único por instituição
2. Saldo inicial não pode ser negativo para contas corrente/poupança
3. Não é possível excluir conta que possui transações vinculadas

#### Transações (3 regras)
1. Transações de despesa devem ter valor negativo
2. Transações de receita devem ter valor positivo
3. Verificação de saldo suficiente para despesas (exceto cartão de crédito)

## 📊 Endpoints Principais

### Usuários
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `GET /users/:id` - Buscar usuário
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Categorias
- `GET /categories` - Listar categorias
- `GET /categories?type=Receita` - Filtrar por tipo
- `POST /categories` - Criar categoria
- `GET /categories/:id` - Buscar categoria
- `PATCH /categories/:id` - Atualizar categoria
- `DELETE /categories/:id` - Deletar categoria

### Instituições
- `GET /institutions` - Listar instituições
- `POST /institutions` - Criar instituição
- `GET /institutions/:id` - Buscar instituição
- `PATCH /institutions/:id` - Atualizar instituição
- `DELETE /institutions/:id` - Deletar instituição

### Contas
- `GET /accounts` - Listar contas
- `GET /accounts?institutionId=1` - Filtrar por instituição
- `POST /accounts` - Criar conta
- `GET /accounts/:id` - Buscar conta
- `PATCH /accounts/:id` - Atualizar conta
- `DELETE /accounts/:id` - Deletar conta

### Transações
- `GET /transactions` - Listar transações
- `GET /transactions?accountId=1` - Filtrar por conta
- `GET /transactions?categoryId=1` - Filtrar por categoria
- `GET /transactions?startDate=2024-01-01&endDate=2024-12-31` - Filtrar por período
- `GET /transactions/balance` - Resumo financeiro
- `POST /transactions` - Criar transação
- `GET /transactions/:id` - Buscar transação
- `PATCH /transactions/:id` - Atualizar transação
- `DELETE /transactions/:id` - Deletar transação

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Build
npm run build

# Produção
npm run start:prod

# Testes
npm run test
npm run test:watch
npm run test:cov

# Migrations
npm run migration:generate -- nome-da-migration
npm run migration:run
npm run migration:revert

# Linting
npm run lint
npm run lint:fix
```

## 📝 Exemplos de Uso

### Criar uma categoria

```bash
POST /categories
Content-Type: application/json

{
  "name": "Alimentação",
  "type": "Despesa",
  "description": "Gastos com comida",
  "color": "#F44336",
  "icon": "restaurant"
}
```

### Criar uma transação

```bash
POST /transactions
Content-Type: application/json

{
  "title": "Almoço no restaurante",
  "amount": -35.90,
  "description": "Almoço de trabalho",
  "transactionDate": "2024-11-15T12:00:00Z",
  "categoryId": 1,
  "accountId": 1
}
```

### Obter resumo financeiro

```bash
GET /transactions/balance

Response:
{
  "totalReceitas": 5800.00,
  "totalDespesas": 1795.90,
  "saldoGeral": 4004.10
}
```

## 🔒 Autenticação

O sistema inclui autenticação JWT. Para acessar endpoints protegidos, inclua o token no header:

```
Authorization: Bearer seu_token_jwt_aqui
```

## ⚙️ Configurações do Banco

O sistema foi configurado para usar migrations do TypeORM. As tabelas são criadas automaticamente ao executar as migrations.

### Estrutura das Tabelas

- **users** - Usuários do sistema
- **institutions** - Instituições financeiras
- **categories** - Categorias de transações
- **accounts** - Contas bancárias
- **transactions** - Transações financeiras

## 🚨 Tratamento de Erros

A API retorna erros padronizados:

- `400` - Bad Request (dados inválidos)
- `401` - Unauthorized (não autenticado)
- `403` - Forbidden (sem permissão)
- `404` - Not Found (recurso não encontrado)
- `409` - Conflict (violação de regra de negócio)
- `500` - Internal Server Error (erro interno)

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do Swagger ou entre em contato.

---

Desenvolvido com ❤️ usando NestJS
