# App Financeiro

Dupla: Gabriel Patricio e Raphael Valinhas

## Como executar

### Frontend (Angular/Ionic)

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o frontend:
   ```sh
   npm start
   ```
   Acesse em http://localhost:4200

### Backend (NestJS)

1. Entre na pasta do backend:
   ```sh
   cd backend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure o banco PostgreSQL conforme o arquivo `.env` na pasta backend.
4. Rode as migrations:
   ```sh
   npm run migration:run
   ```
5. Inicie o backend:
   ```sh
   npm run start:dev
   ```
   Acesse a API em http://localhost:3000

### Servidor Fake (opcional)

Para rodar o servidor fake com JSON Server:
```sh
npm run server
```
Acesse em http://localhost:3001

---