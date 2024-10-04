# Desafio Souv

## Índice

1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação](#instalação)
4. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
5. [Executando a Aplicação](#executando-a-aplicação)
6. [Testes](#testes)
7. [Configuração do Husky e Lint-Staged](#configuração-do-husky-e-lint-staged)
8. [Estrutura de Pastas](#estrutura-de-pastas)
9. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
10. [Executando a Aplicação](#executando-a-aplicação)
11. [Testes](#testes)
12. [Configuração do Husky e Lint-Staged](#configuração-do-husky-e-lint-Staged)
13. [Estrutura de Pastas](#estrutura-de-pastas)

## Introdução

Este documento tem como objetivo orientar você sobre como configurar e executar o projeto localmente. Siga os passos abaixo para garantir que tudo funcione corretamente.
Este documento tem como objetivo orientar você sobre como configurar e executar o projeto localmente. Siga os passos abaixo para garantir que tudo funcione corretamente.

## Pré-requisitos

- **Node.js**
- **npm**
- **Git**
- **Node.js**
- **npm**
- **Git**

## Instalação

### 1. Clonar o Repositório

```bash
  https://github.com/EdsonLopesJr/DESAFIO-SOUV-BACKEND.git
```

### 2. Navegar para o Diretório do Projeto

```bash
cd DESAFIO-SOUV-BACKEND
cd DESAFIO-SOUV-BACKEND
```

### 3. Instalar as Dependências

```bash
npm install
npm install
```

## Configuração do Banco de Dados

Este projeto utiliza o banco de dados remoto **neon.tech** como padrão. Para facilitar a configuração, um arquivo `.env` já está disponível.

Se você preferir utilizar um banco de dados local, o projeto também é compatível com o **PostgreSQL** através do **Prisma** como ORM. Siga os passos abaixo para configurar o seu banco de dados local:

1. **Criar um Banco de Dados no PostgreSQL**  
   Certifique-se de ter um banco de dados PostgreSQL em execução. Crie um novo banco de dados onde o projeto irá armazenar suas informações.

2. **Configurar o Arquivo `.env`**  
   Altere as configurações do banco de dados no arquivo `.env` para refletir suas credenciais. Um exemplo de configuração é:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
   ```

   Substitua `user`, `password` e `mydatabase` pelas informações corretas do seu banco de dados.

3. **Executar Migrações**
   Após a configuração do banco de dados, execute as migrações para configurar o esquema do banco de dados:

```bash
npx prisma migrate dev --name init
```

> **Observação**
> se optar por usar o banco de dados remoto neon.tech, não é necessário realizar as etapas acima. Basta garantir que as credenciais no arquivo .env estejam corretas para o ambiente remoto.

## Executando a Aplicação

#### **Modo de Desenvolvimento**

Para iniciar o servidor em modo de desenvolvimento, onde as alterações no código são refletidas automaticamente, execute:

```bash
npm run start:dev
```

#### **Modo Produção**

Se você quiser iniciar o servidor em modo produção (após a construção), execute:

```bash
npm run build
npm start
```

## Testes

#### Executando Testes

O projeto utiliza Jest para testes. Para executar os testes, você pode usar os seguintes comandos:

- **Executar todos os testes:**

  ```bash
  npm test
  ```

- **Executar testes em modo verbose:**

  ```bash
  npm run test:verbose
  ```

- **Executar testes unitários em modo de observação:**

  ```bash
  npm run test:unit
  ```

- **Executar apenas testes relacionados a arquivos alterados:**

  ```bash
  npm run test:staged
  ```

## Configuração do Husky e Lint-Staged

O projeto utiliza Husky e Lint-Staged para garantir que o código siga as convenções de estilo e não quebre testes durante o desenvolvimento. Para isso:

- Husky: Garante que os hooks do Git sejam executados antes de certos eventos, como `commit` e `push`.

- Lint-Staged: Executa comandos de `lint` apenas em arquivos que foram alterados.

## Estruturas de Pastas

Aqui está uma visão geral da estrutura de pastas do projeto:

O projeto segue princípios de SOLID, Clean Architecture e Design Patterns, como Factory Method, Adapter e Command.

```bash
/desafio-souv
├── /src                  # Código-fonte
│   ├── /main.ts          # Ponto de entrada do aplicativo
│   ├── /application      # Casos de uso da aplicação
│   ├── /domain           # Entidades e regras de negócio
│   ├── /Infrastructure   # Implementações específicas, como bancos de dados e API
├── .env                  # Configurações de ambiente
├── package.json          # Dependências e scripts do projeto
└── tsconfig.json         # Configurações do TypeScript
```
