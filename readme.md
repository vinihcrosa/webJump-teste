# Teste WebJump

## Como rodar

Assim que baixar o codigo comece instalando os pacotes do npm:

``` shell
  npm install
```

Após é necessário rodar o comando para aplicar as migrations no banco de dados:

``` shell
  npx prisma migrate dev
```

E por fim para subir o servidor basta rodar o comando:

``` shell
  npm run start:dev
```

Caso queira rodar a suite de testes basta rodar o comando:

``` shell
  npm run test
```

## Tecnologias usadas

Para o banco de dados foi escolhido o uso do [prisma](https://www.prisma.io/), um orm que abstrai os comando do banco de dados e tem a funcionalidade de migrations, que pode fazer um controle de versao do banco de dados.

Para criar o servidor foi usado a biblioteca [express](https://expressjs.com/pt-br/).

Para organizar o codigo foi usado o padrão MVC, e para desacoplar a camada de banco de dados da camada de aplicação foi criado interfaces para implementação dos repositorios.

Os casos de uso são implementados na pasta useCases, separos por dominio, ou seja, os casos de uso referentes a produtos estão em uma pasta, enquanto os casos de uso referentes a categorias estão em outra pasta.

Para a suite de testes o framework escolhido foi o [vitest](https://vitest.dev/), apenassquestáo de performance.

## Rotas da api

Para rodar as rotas da api existe um arquivo json exportado do [insomnia](https://insomnia.rest/download), esse arquivo pode ser importando tanto no proprio insomnia quanto no [postman](https://www.postman.com/).

## Logs

Os logs da aplicação são mostrados tanto no terminal quanto gravados em um arquivo na pasta logs, mas caso houvesse um servico de logs externo como o kibana seria simples de integrar.

## Imagens dos produtos

A rota de criação de produtos aceita um campo chamado image com uma imagem do produto que sera gravado em uma pasta publica no servidor e para acessar as imagens basta acessar a api no endpoint '/public/images/imageName'
