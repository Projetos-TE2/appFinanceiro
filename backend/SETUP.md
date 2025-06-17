# 🏗️ Setup Completo do Backend - App Financeiro

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **PostgreSQL** (versão 12 ou superior) - [Download](https://www.postgresql.org/download/)
- **npm** ou **yarn**

## 🐘 Configuração do PostgreSQL

### Windows

1. **Baixe e instale o PostgreSQL**:
   - Acesse: https://www.postgresql.org/download/windows/
   - Execute o instalador e siga as instruções
   - **IMPORTANTE**: Lembre-se da senha do usuário `postgres`

2. **Configure o PostgreSQL**:
   ```bash
   # Acesse o PostgreSQL via linha de comando
   psql -U postgres -h localhost
   
   # Crie o banco de dados
   CREATE DATABASE app_financeiro;
   
   # Sair do PostgreSQL
   \q
   ```

### Usando Docker (Alternativa)

Se preferir usar Docker:

```bash
# Executar PostgreSQL no Docker
docker run --name postgres-financeiro -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=app_financeiro -p 5432:5432 -d postgres:15
```

## 🚀 Instalação e Execução

### 1. Navegue para a pasta do backend

```bash
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

O arquivo `.env` já está configurado com valores padrão:

```env
# Configurações do Banco de Dados
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=app_financeiro

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro_aqui_123456

# Porta da aplicação
PORT=3000
```

**Se você configurou uma senha diferente para o PostgreSQL, edite o campo `DB_PASSWORD` no arquivo `.env`**

### 4. Execute as migrations

```bash
# Criar as tabelas no banco de dados
npm run migration:run
```

### 5. Inicie o servidor

```bash
# Desenvolvimento (com hot reload)
npm run start:dev

# Ou modo normal
npm start
```

## 🎯 Testando a API

### Swagger (Documentação Interativa)

Acesse: **http://localhost:3000/api**

### Postman

Importe a collection: `App-Financeiro-Backend.postman_collection.json`

### Teste rápido via navegador

- **Health check**: http://localhost:3000/
- **Listar categorias**: http://localhost:3000/categories
- **Listar usuários**: http://localhost:3000/users

## 📚 Endpoints Principais

### Usuários
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `GET /users/:id` - Buscar usuário
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Categorias
- `GET /categories` - Listar categorias
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
- `POST /accounts` - Criar conta
- `GET /accounts/:id` - Buscar conta
- `PATCH /accounts/:id` - Atualizar conta
- `DELETE /accounts/:id` - Deletar conta

### Transações
- `GET /transactions` - Listar transações
- `POST /transactions` - Criar transação
- `GET /transactions/:id` - Buscar transação
- `PATCH /transactions/:id` - Atualizar transação
- `DELETE /transactions/:id` - Deletar transação

## 🔧 Comandos Úteis

```bash
# Build da aplicação
npm run build

# Executar testes
npm run test

# Executar em modo de produção
npm run start:prod

# Reverter última migration
npm run migration:revert

# Gerar nova migration
npm run migration:generate NomeDaMigration
```

## ⚡ Dados Iniciais

Após executar as migrations, o sistema criará automaticamente:

- **1 usuário administrador**:
  - Email: `admin@financeiro.com`
  - Senha: `admin123`

- **8 instituições financeiras** (Banco do Brasil, Itaú, etc.)
- **12 categorias padrão** (Alimentação, Transporte, Salário, etc.)
- **4 contas exemplo**
- **6 transações exemplo**

## 🐛 Resolução de Problemas

### Erro de conexão com PostgreSQL

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Soluções**:
1. Verifique se o PostgreSQL está rodando
2. Confirme a senha no arquivo `.env`
3. Teste a conexão: `psql -U postgres -h localhost`

### Erro de migration

```
Error during migration run
```

**Soluções**:
1. Certifique-se que o banco `app_financeiro` existe
2. Verifique as credenciais no `.env`
3. Execute: `npm run migration:revert` e tente novamente

### Porta em uso

```
Error: Port 3000 is already in use
```

**Solução**: Altere a porta no arquivo `.env`:
```env
PORT=3001
```

## 📋 Regras de Negócio Implementadas

### Usuários (3 regras)
1. ✅ Email deve ser único
2. ✅ Senha deve ter pelo menos 6 caracteres  
3. ✅ Nome deve ter pelo menos 2 caracteres

### Categorias (3 regras)
1. ✅ Nome da categoria deve ser único por tipo
2. ✅ Tipo deve ser "Receita" ou "Despesa"
3. ✅ Não pode deletar categoria com transações vinculadas

### Instituições (3 regras)
1. ✅ Nome da instituição deve ser único
2. ✅ Código da instituição deve ser único (se informado)
3. ✅ Não pode deletar instituição com contas vinculadas

### Contas (3 regras)
1. ✅ Saldo não pode ser negativo para contas corrente/poupança
2. ✅ Deve ter uma instituição válida vinculada
3. ✅ Não pode deletar conta com transações vinculadas

### Transações (3 regras)
1. ✅ Valor deve ser diferente de zero
2. ✅ Data da transação não pode ser futura
3. ✅ Deve ter uma categoria e conta válidas vinculadas

## 🏆 Diferenciais Implementados

- ✅ **Autenticação JWT**
- ✅ **Documentação Swagger completa**
- ✅ **Validação robusta de dados**
- ✅ **Collection Postman com todos os endpoints**
- ✅ **Migrations com dados iniciais**
- ✅ **Tratamento de erros personalizado**
- ✅ **CORS configurado para frontend**
- ✅ **Índices para otimização de consultas**

---

## 🚀 Pronto para usar!

Após seguir todos os passos, sua API estará rodando em **http://localhost:3000** com documentação disponível em **http://localhost:3000/api**
