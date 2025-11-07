<h1 align="center">🚀 API Node.js com Docker, Prisma, MySQL, MongoDB e Redis</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Docker-Ready-blue?logo=docker" alt="Docker" />
  <img src="https://img.shields.io/badge/Prisma-ORM-lightgrey?logo=prisma" alt="Prisma ORM" />
  <img src="https://img.shields.io/badge/Redis-Cache-red?logo=redis" alt="Redis" />
  <img src="https://img.shields.io/badge/MongoDB-NoSQL-green?logo=mongodb" alt="MongoDB" />
</p>

---

## 🧠 Sobre o Projeto

API desenvolvida em **Node.js** utilizando **Prisma ORM** para MySQL, **Mongoose** para MongoDB e **ioredis** para cache em Redis.  
O ambiente roda completamente em **containers Docker**, garantindo portabilidade e fácil configuração.

---

## ⚙️ Stack Utilizada

- 🟩 **Node.js** — Ambiente de execução JavaScript  
- 🐳 **Docker** — Containers de aplicação e bancos  
- 🧩 **Prisma ORM** — Integração com banco relacional  
- 🍃 **Mongoose** — ODM para MongoDB  
- 🔴 **Redis** — Cache de dados  
- 🐬 **MySQL** — Banco de dados relacional  

---

## Passo 1: 📦 Instalação

Clone o repositório e instale as dependências:

``` 
git clone https://github.com/WesleySantosC/API.git
```
---

## Passo 2: 📦 Instalando Prisma:
```
npm install prisma --save-dev && npm install @prisma/client
```
---

## Passo 3: 📦 Rodando Prisma:

```
docker exec -it api npx prisma migrate dev
```

E depois rode o outro comando:

```
docker exec -it api npx prisma db push
```
---

## Passo 4: 📦 Instalando Redis:

```
sudo apt install redis-server && redis-cli
```
E execute o comando que é uma dependência do <code>Redis</code>:

```
npm install ioredis
```
---

## Passo 5: 📦 Instalando Express:

```
npm install express && npm install --save-dev @types/express
```
---

## Passo 6: 📦 Instalando Mongoose:

```
npm install mongoose && npm install --save-dev @types/mongoose
```
---

### Passo 7: ▶️ Rodar o projeto:

```
npm start
```

Ou se estiver com o docker, dno terminal digite o comando:

Lista os containers:
```
docker ps
```

E se estiverem ali, rode o comando:

```
docker start api && docker start redis && docker start mysql&& docker start mongo
```
---

E via <code>Postman, Insomnia, Thunder</code> teste os métodos na URL: <code>http://localhost:3000/alunos</code> 

---

#### **🧪 Rotas da API**
Mostra os endpoints disponíveis — fica visual e facilita testes:
```
## 🧪 Rotas da API

| Método | Endpoint        | Descrição                   |
|---------|-----------------|----------------------------|
| GET     | /alunos         | Lista todos os alunos      |
| POST    | /alunos         | Cria um novo aluno         |
| PUT     | /alunos/:id     | Atualiza um aluno existente|
| DELETE  | /alunos/:id     | Remove um aluno            |
```
---

### 🔍 Vendo Resultado nos containers:

* Verificando dados no Mysql 🐬:
	* Entre no container do Mysql <code>docker exec -it mysql mysql -u root -p</code> e faça os seguintes comandos:
   
 ```
 Use a tabela: use users

 Faça uma consulta: SELECT * FROM Aluno;
 ```
---

* Verificando dados no Redis 🔴:
  * Entre no container do Redis </code>docker exec -it redis redis-cli</code> e faça os comandos:

```
Faça uma consulta das Keys que já existem: KEYS *

Verificando o tempo de uma key: TTL nome
```
---

*Verificando dados no Mongo:
	* Entre no container do Mongo <code>docker exec -it mongo mongosh</code> e faça os seguintes comandos:
```
Verificar as tabelas existentes: show databases;

Selecionando a tabela: use escola;

Visualizando dados: db.alunos.find();
``` 

---
<p align="center">
Feito por <b>Wesley Santos</b> <br/>
<a href="https://github.com/WesleySantosC">GitHub</a> -
<a href="https://www.linkedin.com/in/wesley-santos-991979255/">LinkedIn</a>
</p>
