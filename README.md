# Case Estante Virtual

API responsável por cadastrar atletas e resultados, além de retornar o ranking de duas competições dos jogos olímpicos: lançamento de dardo e natação 100m.

## Descrição do Projeto

A API cadastra uma competição, um atleta e os resultados do atleta para cada competição. Na competição de natação, vence o atleta que completar a prova em menor tempo, já na competição de lançamento de dardos, cada atleta terá três chances, sendo considerada a maior distância de aremesso das três. Por fim, a API pode retornar o resultado parcial de cada competição, porém não aceita cadastro de resultados de competições já encerradas.

## Entidades (Typescript)

### Athlete (Atleta)

Representa os atletas de nossa aplicação. Os atletas são compostos pelas seguintes características:

- `id (string) e gerado pela própria aplicação `

- `name (string)`

### Competition (Competição)

Representa as competições de nossa aplicação. As competições são compostas pelas seguintes características:

- `id (string) e gerado pela própria aplicação`

- `name (string) único por competição`

- `is_closed (boolean) representando se a competição está fechada`

- `attempts (number) número de tentativas de cada competição`

### Results (Resultados)

Representa os resultados de nossa aplicação. Os resultados são compostos pelas seguintes características:

- `id (string) e gerado pela própria aplicação`

- `value (number) `

- `value_2 (number)`

- `value_3 (number)`

- `unit (string)`

- `competition_id (string) chave estrangeira, referencia a competição`

- `athlete_id (string) chave estrangeira, referencia o atleta`

## Tabelas (MySQL)

### CASE_EV_ATHLETE

- `id VARCHAR(255) e chave primária`
- `name VARCHAR(255) e não-nulo`

### CASE_EV_COMPETITION

- `id VARCHAR(255) e chave primária`
- `name VARCHAR(255) e não-nulo`
- `is_closed BOOLEAN e não nulo, padrão: falso`
- `attempts INT e não-nulo`

### CASE_EV_RESULT

- `id VARCHAR(255) e chave primária`
- `value FLOAT e não-nulo`
- `value_2 FLOAT pode ser nulo`
- `value_3 FLOAT pode ser nulo`
- `unit VARCHAR(255) e não-nulo`
- `competition_id VARCHAR(255) chave estrangeira e não-nulo`
- `athlete_id VARCHAR(255) chave estrangeira e não-nulo`

## Instruções

### Instalando as dependências

- `npm install:`
  Instala todas as dependências listadas no `package.json`.

### Populando as tabelas

- `npm run migrations`
  Cria e popula as tabelas com dados mockados de usuários e shows.
  - Esse script deve ser executado apenas uma única vez
  - Se executado uma segunda vez, ele dropa as tabelas e reseta os dados mockados

### Criando o arquivo .env:

Criar o arquivo `.env` e configurar com as informações de seu banco de dados.

```
PORT: 3003
DB_HOST = host
DB_USER = usuario
DB_PASSWORD = senha
DB_NAME = nome-do-banco-de-dados
JWT_KEY = "minha-senha-segura"
JWT_EXPIRES_IN = "24h"
BCRYPT_SALT_ROUNDS = 12
```

### Executar o projeto:

- `npm run dev`:
  Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor `localhost` toda a vez que o projeto for alterado e salvo.

## Funcionalidades

**1. Cadastro de um atleta**

- **Método:** `POST `
- **Caminho:** `/athlete/create `
- **Entrada:** `name`
- **Saída:** `mensagem de cadastro de um novo atleta`
- **Validações e regras de negócio:**

  - `name deve ser fornecido e deve ser do tipo string`

**2. Cadastro de uma competição**

- **Método:** `POST `
- **Caminho:** `/competition/create`
- **Entrada:** `name, attempts`
  **Saída:** `mensagem de cadastro de uma nova competição`
- **Validações e regras de negócio:**
  - `name deve ser fornecido e deve ser do tipo string`
  - `name deve ser único, não podendo se repetir no banco de dados`
  - `attempts deve ser fornecido e deve ser do tipo number`

**3. Fechar uma competição**

- **Método:** `POST `
- **Caminho:** `/competition/close/:id`
- **Entrada:** `id como parâmetros`
  **Saída:** `mensagem de sucesso ao fechar uma competição`
- **Validações e regras de negócio:**
  - `o id passado por parâmetros deve ser válido`

**4. Cadastro dos resultados**

- **Método:** `POST `
- **Caminho:** `/result/create`
- **Entrada:** `value, value_2, value_3, unit, competition_id, athlete_id`
  **Saída:** `mensagem de sucesso ao cadastrar o resultado`
- **Validações e regras de negócio:**
  - `value deve ser fornecido, deve ser do tipo number e maior que 0`
  - `value_2 e value_3 devem ser fornecidos caso a competição tenha 3 tentativas, devem ser do tipo number e maior que 0`
  - `unit deve ser fornecido e deve ser do tipo string`
  - `competition_id deve ser fornecido, válido e do tipo string`
  - `athlete_id deve ser fornecido, válido e do tipo string`

**5. Buscar resultados**

- **Método:** `get `
- **Caminho:** `/ranking/:id`
- **Entrada:** `id como parâmetros`
  **Saída:** `uma lista ordenada com os melhores resultados da competição`
- **Validações e regras de negócio:**
  - `o id passado por parâmetros deve ser válido`

## Documentação (links)

- [Postman](https://documenter.getpostman.com/view/21578696/2s847EREDQ)

## Coverage
![coverage_ev](https://user-images.githubusercontent.com/104534121/214390444-d584e7c7-9291-4df5-b29d-1587043e84b8.png)

## Tecnologias Utilizadas

- NodeJS
- TypeScript
- MySQL
- Knex
- Express
- Cors
- JWT
- BcryptJS
- Markdown
- Jest

## Autor

- - [Gabriel Wenchenck](https://github.com/gabrielwenchenck)
