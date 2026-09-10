# NodeAPI - API REST com Node.js, Express, TypeScript e TypeORM

Desenvolvimento de uma API REST utilizando **NodeJS / Express** seguindo o diagrama proposto na
atividade, contemplando:

* Configuração da API
* Models
* Variáveis de Ambiente
* Migrations
* CRUD
* Entitys
* Controllers
* Seeds
* Services (Pagination)

## Requisitos

* Node.js 22 ou superior - Conferir a versão: node -v
* MySQL 8 ou superior - Conferir a versão: mysql --version

## Como rodar o projeto baixado

Duplicar o arquivo ".env.example" e renomear para ".env".<br>
Alterar no arquivo .env as credenciais do banco de dados<br>

Instalar todas as dependencias indicada pelo package.json.
```
npm install
```

Criar a base de dados no MySQL (o mesmo nome que estiver no DB_DATABASE do .env).
```
CREATE DATABASE nodeapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Executar as migrations para criar as tabelas no banco de dados.
```
npm run migration:run
```

Executar as seeds para cadastrar registros de teste nas tabelas.
```
npm run seed
```

Rodar a API em modo de desenvolvimento.
```
npm run dev
```

Ou compilar e rodar o arquivo gerado.
```
npm run build
npm start
```

Outros comandos uteis:
```
npm run migration:show     (mostra quais migrations ja rodaram)
npm run migration:revert   (desfaz a ultima migration)
npm run start:watch        (compila e reinicia a cada alteracao)
```

## Estrutura do projeto

```
src/
 ├── controller/   -> recebem a requisicao e devolvem a resposta em JSON
 ├── entity/       -> models/entities do TypeORM (tabelas do diagrama)
 ├── helper/       -> paginacao e classe de erro da aplicacao
 ├── middleware/   -> tratamento de erro e rota nao encontrada
 ├── migration/    -> criacao das tabelas e chaves estrangeiras
 ├── routes/       -> arquivos de rota de cada recurso
 ├── seed/         -> registros iniciais para teste
 ├── service/      -> regras de negocio, validacoes e paginacao
 ├── data-source.ts
 └── index.ts
```

## Tabelas do diagrama

| Tabela | Campos | Relacionamento |
| --- | --- | --- |
| situations | id, nameSituation, createdAt, updatedAt | 1 situacao tem varios usuarios |
| users | id, name, email, situationId, createdAt, updatedAt | pertence a uma situacao |
| product_categories | id, name, createdAt, updatedAt | 1 categoria tem varios produtos |
| product_situations | id, name, createdAt, updatedAt | 1 situacao tem varios produtos |
| products | id, name, productSituationId, productCategoryId, createdAt, updatedAt | pertence a uma categoria e a uma situacao |

## Endpoints (CRUD)

Todos os recursos possuem as mesmas cinco rotas:

| Metodo | Rota | Descricao |
| --- | --- | --- |
| GET | /recurso | lista os registros (paginado) |
| GET | /recurso/:id | busca um registro pelo id |
| POST | /recurso | cadastra um registro |
| PUT | /recurso/:id | altera um registro |
| DELETE | /recurso/:id | exclui um registro |

Recursos disponiveis: `/situations`, `/users`, `/product-categories`,
`/product-situations` e `/products`.

### Paginacao (Services)

A paginacao fica no service de cada recurso e usa os parametros `page` e `limit`
da URL. O `page` comeca em 1, o `limit` padrao e 10 e o maximo permitido e 100.

```
GET /products?page=2&limit=5
```

Resposta:

```json
{
  "data": [
    {
      "id": 6,
      "name": "Caneta Esferografica",
      "productSituationId": 1,
      "productCategoryId": 4,
      "createdAt": "2026-09-10T18:00:00.000Z",
      "updatedAt": "2026-09-10T18:00:00.000Z",
      "productCategory": { "id": 4, "name": "Papelaria" },
      "productSituation": { "id": 1, "name": "Disponivel" }
    }
  ],
  "pagination": {
    "total": 12,
    "page": 2,
    "limit": 5,
    "totalPages": 3,
    "hasPreviousPage": true,
    "hasNextPage": true
  }
}
```

A rota de produtos ainda aceita filtro por categoria e por situacao:

```
GET /products?productCategoryId=1&productSituationId=2
```

### Exemplos de corpo das requisicoes

Cadastrar situacao:
```json
{ "nameSituation": "Ativo" }
```

Cadastrar usuario:
```json
{ "name": "Pedro Victor", "email": "pedro@email.com", "situationId": 1 }
```

Cadastrar categoria ou situacao de produto:
```json
{ "name": "Informatica" }
```

Cadastrar produto:
```json
{ "name": "Notebook Dell", "productCategoryId": 1, "productSituationId": 1 }
```

### Erros

Os erros voltam sempre no mesmo formato:

```json
{ "message": "Usuario nao encontrado." }
```

Status usados: 200 (ok), 201 (cadastrado), 204 (excluido), 400 (dados invalidos),
404 (nao encontrado), 409 (e-mail repetido) e 500 (erro interno).

## Sequencia para criar projeto

Criar o arquivo package
```
npm init
```

Instalar o Express para gerenciar as requisições, rotas e URLs, entre outras funcionalidade.
```
npm i express
```

Instalar os pacotes para suporte ao TypeScript
```
npm i --save-dev @types/express
```
```
npm i --save-dev @types/node@22.15.2
```

Instalar o compilador do projeto com TypeScript e reiniciar o projeto quando o arquivo é modificado
```
npm i --save-dev ts-node
```

Gerar o arquivo de configuração para o TypeScript.
```
npx tsc --init
```

Compilar o arquivo TypeScript
```
npx tsc
```

Executar o arquivo gerado com o Node.js
```
node dist/index.js
```

Instalar a dependência para rodar processos simultâneo.
```
npm i --save-dev concurrently
```

Compilar o arquivo TypeScript. Executar o arquivo gerado.
```
npm run start:watch
```

Criar banse de dados no myqsl
```
CREATE DATABASE nodeapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Instalar a dependência para conectar o Node.js (TS) com BD.
```
npm i typeorm --save
```

Biblioteca utilizada no TypeScript para adicionar metadados (informações adicionais) a classes.
```
npm i reflect-metadata --save
```

Instalar o drive do banco de dados MySQL.
```
npm i mysql2 --save
```

Manipular variáveis de ambiente.
```
npm i dotenv --save
```

Instalar os tipos de variáveis para o TypeScript

```
npm i --save-dev @types/dotenv
```

Criar a MIGRATION que será usada para criar a tabela no banco de dados

```
npx typeorm migration:create src/migration/CreateSituationsTable
```
```
npx typeorm migration:create src/migration/CreateUsersTable
```
```
npx typeorm migration:create src/migration/AddSlugToProducts
```
```
npx typeorm migration:create src/migration/AddPasswordToUsers
```
```
npx typeorm migration:create src/migration/AddRecoverPasswordToUsers
```


Executar as migrations para criar as tabelas no banco de dados.
```
npx typeorm migration:run -d dist/data-source.js
```

Validar formulário.
```
npm i yup
```

Permitir requisição externa.
```
npm i cors
```
```
npm install --save-dev @types/cors
```

Converter o slug automaticamente antes de salvar no banco de dados.
```
npm install slugify
```

Instalar o módulo para criptografar a senha.
```
npm install --save bcryptjs
```
Instalar os tipos do bcryptjs.
```
npm install --save-dev @types/bcryptjs
```

Instalar a dependencia JWT para manipular token de autenticação.
```
npm install jsonwebtoken
```
Instalar os tipos do jsonwebtoken.
```
npm i --save-dev @types/jsonwebtoken
```

Instalar o módulo para enviar e-mail.
```
npm install nodemailer
```
Instalar os tipos do nodemailer.
```
npm install --save-dev @types/nodemailer
```
