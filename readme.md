## Perguntas Técnicas

Se encontram no arquivo PerguntesTecnicas.md

## Instalação

clone o repositório com git clone

acesse a pasta baixada

instale as dependencias com o comando npm install

Esse projeto já está pré-configurado com um banco em nuvem hospedado no heroku

Mas se preferir se conectar a um banco local:

Crie o banco de dados e atualize o arquivo database.js com os dados do banco

O comando SQL utilizado para criação do banco se encontra no fim desse arquivo

## Uso

Utilize o comando npm run start para iniciar o projeto.

Caso tudo de certo o servidor irá escutar a porta 3000 e vai fornecer o endpoint /tempo/:id

id é o código da cidade e é formado por 7 números, a lista completa está dispónivel em: http://bulk.openweathermap.org/sample/

Separei alguns códigos de cidades brasileiras abaixo para faciliar

Guarulhos: 3461786

São Paulo: 3448433

Itaquaquecetuba: 3460644

Rio de Janeiro: 3451189

Brasília: 3469058

Salvador: 6321026

Maceió: 6320645



### Versões e Dependencias

Esse web app foi desenvolvido com as sequintes dependencias e (versões):

Node: v15.2.1

### Dependencias

- "cors": "^2.8.5",
- "express": "^4.17.1",
- "mysql2": "^2.2.5",
- "node-fetch": "^2.6.1",
- "sequelize": "^6.6.4"

### Dependencias Dev

- "jest": "^27.0.6",
-  "nodemon": "^2.0.9"

### Comando SQL para criação do banco

CREATE TABLE IF NOT EXISTS city_weather (

  city_api_id INT PRIMARY KEY,

  city_name VARCHAR(255) NOT NULL,

  temp DECIMAL(5,2) NOT NULL,

  feels_like DECIMAL(5,2) NOT NULL,

  last_update TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);
