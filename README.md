# Tecnologias

* Node
* TypeScript
* Prisma
* Docker
* SQL Server
* Angular
* Bootstrap

## Como executar

* Assim que abrir o arquivo na raiz, usar ```cd server``` em uma aba de terminal e ```cd web``` em outra para poder ter 2 terminais simultâneos para rodar a aplicação.
* Clone o repositório para sua maquina com o comando (```git clone```);
* Instale as dependências em de cada pasta (server e web) com ```npm install```;
* Inicie o container do banco de dados com ```docker-compose up```;
* Rodar todas as migrations do prisma ```npx prisma migrate dev```;
* Inicie o servidor (server) com ```npm run dev``` e então inicie o front (web) com ```ng serve -o```;
* Para abrir o Prisma Studio (db visual editor) ```npx prisma studio```;
