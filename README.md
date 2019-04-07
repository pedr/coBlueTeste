
# Teste REST API coblue

## Instruções PARA LINUX

`git clone` repourl

`cd` para dentro do diretório

`npm install`
 
Para conseguir se conectar é necessário criar um banco de dados no Postgres, pode se usar o comando: `createdb` nomeDoBanco

E criar um arquivo `.env` dentro do diretório principal  no seguinte modelo:

`HOST=localhost`

`PORT=5432`

`DATABASE=coblue` = nome do banco criado

`USER=user`

`PASSWORD=password`

Depois disso só rodar o servidor com `node index.js` que a aplicação criará a tabela necessária

A porta padrão de acesso é a `5000`


A interface pode ser acessada em `localhost:5000/`

A API está em `localhost:5000/contatos`
