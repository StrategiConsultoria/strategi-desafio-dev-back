# Documentação API - Desafio técnico Strategi:

## Sobre
- Esta é a documentação da API que será consumida pelo front do desafio.

- O repositório para o front desse desafio pode ser encontrado neste [link](https://github.com/hatigo/desafio-tecnico-strategi-frontend)

---

## O problema
Desenvolva uma pequena aplicação web de venda de imóveis onde um vendedor faz o login na
aplicação, escolhe o imóvel(Apartamento ou Lote) na tela de seleção devem aparecer a localização do
imóvel(endereço), valor de venda, valor de comissão do vendedor(5%) e qualquer outra informação
que você queria colocar na tela, realiza a simulação de pagamento do imóvel (à vista ou 180 parcelas),
escolhe o cliente que a venda será realizada e na tela final apresenta um resumo(extrato do
financiamento) de toda a transação: Quem foi o vendedor, qual foi o imóvel, para quem foi vendido o
imóvel e as condições de pagamento e extrato.

--- 

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre](#sobre)
   * [O problema](#o-problema)
   * [Como usar](#como-usar)
   * [Pré Requisitos](#pr%C3%A9-requisitos)
   * [Rodando a API](#rodando-a-api)
   * [Banco de dados](#banco-de-dados)
   * [Tecnologias](#tecnologias)
   * [Autor](#autor)
<!--te-->

---

<h4 align="center"> 
	  Status: Desafio finalizado.  
</h4>

--- 

### Features

- [x] Login do usuário(corretor de imoveis).
- [x] Cadastro de Cliente.
- [x] Edição do cadastro de cliente.
- [x] Excluir cadastro do cliente.
- [x] Consultar clientes.
- [x] Consultar imóveis.
- [x] Cadastro de vendas.

--- 

# Como usar:

### Pré-requisitos


Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [PostgreSQL](https://www.postgresql.org/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/) e um gerenciador de banco de dados como o [Beekeeper Studio](https://www.beekeeperstudio.io/)

---
##  Banco de dados 

### Crie o banco de dados

```sql
CREATE IF NOT EXISTS DATABASE imobiliaria
```

### Crie a tabela de corretores

```sql
CREATE TABLE IF NOT EXISTS corretores (
  	id serial primary key,
  	nome varchar(255) NOT NULL,
  	senha varchar(8000) NOT NULL
)
```

### Crie a tabela de clientes 

```sql
CREATE TABLE IF NOT EXISTS clientes (
  	id serial primary key,
  	nome varchar(255) NOT NULL,
  	cpf varchar(11) NOT NULL UNIQUE,
  	email varchar NOT NULL UNIQUE,
  	telefone varchar(11) NOT NULL, 
  	data_de_cadastro date NOT NULL,
  	url_da_foto varchar 
  
  
)
```

### Crie a tabela de imoveis

```sql
CREATE TABLE IF NOT EXISTS imoveis (
  id serial primary key,
  tipo varchar(11) NOT NULL,
  valor_de_venda money NOT NULL,
  endereco varchar(255) NOT NULL,
  url_da_foto varchar 
  )
```
### Crie a tabela de vendas

```sql
CREATE TABLE IF NOT EXISTS vendas (
    id serial primary key,
    id_imovel integer NOT NULL,
    valor money NOT NULL,
     comissao money NOT NULL,
    id_corretor integer NOT NULL,
    cliente varchar(255) NOT NULL,
    condicao_de_pagamento varchar(255),
    foreign key (id_corretor) references corretores(id),
    foreign key (id_imovel) references imoveis(id)
    )
```

### Para popular o banco de dados utilize os dumps que estão no arquivo `schema.sql` na raiz do projeto.

### Para configurar a conexão com o banco de dados crie um arquivo `.env` e crie as variaveis de ambiente como estão no aqruivo `.env.example`
```
DB_HOST = host do banco de dados
DB_PORT = porta de conexão com o banco de dados
DB_USER = nome de usuario do banco de dados
DB_PASSWORD = senha do banco de dados
DB_DATABASE = nome do banco que deseja se conectar, neste caso é imobiliaria

jwt_SECRET = e utilize esta variável para criar uma chave secreta que será utilizada para fazer a encriptação de senhas
```
---
## Rodando a API 

# Clone este repositório
$ `git clone <https://github.com/hatigo/desafio-tecnico-strategi-backend>`

# Acesse a pasta do projeto no terminal/cmd
$ `cd desafio-tecnico--thiago-lucas-mendonca-ferreira-backend`


# Instale as dependências
$  `npm install`

# Execute a aplicação em modo de desenvolvimento
$ `npm run dev`

# O servidor inciará na porta:3000 - acesse <http://localhost:3000> 


---

## Instruções para usar os endpoints:

#### 1. `POST`  http://localhost:3000/login
Esse endpoint irá validar se o usuário existe no banco de dados e se sua senha está correta utilizando o bcrypt para comparar com o hash salvo no banco de dados, caso esteja tudo correto ele retorna um token de autenticação que será necesário para acessar os outros endpoints, caso tenha alguma informação incorreta, retornará os erros apropriados :

body da requisição:
```json=
[
    { 
        "nome": "Thiago Ferreira",
        "senha": 12345
    }
]
```

para acessar o login utilize as informações do exmplo acima ⬆️

exemplo de resposta - success:
```json=
[
   {
	"success": "login efetuado com sucesso",
	"token": "eyJhbGciOiJIUzI1NiJ9.VGhpYWdvIEZlcnJlaXJh.633jgAk_iLoLJbfjtHD8uzqDOXhb7TXeSpmGJSnZWV0",
	"dadosDoUsuario": {
		"nome": "Thiago Ferreira"
	    }
    }
]
```

exemplo de resposta - error:
```json=
[
    {
	"error": "senha incorreta"
    }
]
```

--- 



#### 2. `GET` http://localhost:3000/imoveis
Esse endpoint listará todos os imoveis cadastrados no banco de dados,
deverá ser enviado no headers da requisição o token recebido no login como bearer token:

exemplo de resposta:
```json=
{
    "success": [
		{
			"id": 2,
			"tipo": "Apartamento",
			"valor_de_venda": "R$ 30.000.000,00",
			"endereco": "10880, Malibu Point, 90265",
			"url_da_foto": "https://i0.wp.com/media.comicbook.com/uploads1/2015/06/iron-man-aeral-700x467-138304.png"
		},
		{
			"id": 3,
			"tipo": "Apartamento",
			"valor_de_venda": "R$ 340.000,00",
			"endereco": "Rua Princesa Isabel, 816 - Cidade Alta, Natal - RN",
			"url_da_foto": "https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/505e97c672c8cad6a9cb659d73ead637.jpg"
		},
		{
			"id": 4,
			"tipo": "Apartamento",
			"valor_de_venda": "R$ 429.000,00",
			"endereco": "Avenida Deputado Antônio Florêncio de Queiroz, 2995 - Ponta Negra, Natal - RN",
			"url_da_foto": "https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/43101030bf6ab55f9aaffe58e7a85dfa.jpg"
		},
}
```

---


#### 3. `GET` http://localhost:3000/clientes
Esse endpoint listará todos os clientes cadastrados no banco de dados,
deverá ser enviado no headers da requisição o token recebido no login como bearer token:


exemplo de resposta:

```json=
[
    	"success": [
		{
			"id": 3,
			"nome": "Thiago Ferreira",
			"cpf": "18096887452",
			"email": "thiago@teste.com",
			"telefone": "84988100012",
			"data_de_cadastro": "2022-02-14T03:00:00.000Z",
			"url_da_foto": null
		},
		{
			"id": 4,
			"nome": "Thiago Ferreira 2",
			"cpf": "15416897642",
			"email": "thiago@teste2.com",
			"telefone": "84945961278",
			"data_de_cadastro": "2022-02-14T03:00:00.000Z",
			"url_da_foto": null
		}
	]
]
```

---


#### 4 `POST` http://localhost:3000/cliente-cadastro
Esse endpoint receberá os dados de um novo cliente para cadastro,
não podendo haver dois emails ou cpfs iguais.
deverá ser enviado no headers da requisição o token recebido no login como bearer token:


exemplo de requisição:


```json=
[
    {
        "nome": "Thiago Ferreira 3",
        "cpf": "89564895472",
        "email": "thiago@teste3.com",
        "telefone": "84877659925"
    }
]
```


exemplo de resposta - success:

```json=
[
    {
	    "success": "cliente cadastrado com sucesso"
    }
    
]
```

exemplo de resposta - error:

```json=
[
    {
	    "error": "não foi possivel fazer o cadastro do cliente, tente novamente"
    }
    
]
```


---


#### 5`PUT`  http://localhost:3000/cliente-edicao
Esse endpoint receberá os dados de cliente para edição,
não podendo haver dois emails ou cpfs iguais.
deverá ser enviado no headers da requisição o token recebido no login como bearer token:


exemplo de requisição: 
```json=
[
	{
		"id": 4,
		"nome": "thiago lucas"
		"cpf": "02081692427",
		"email": "thiago@lucas.com",
		"telefone": "89655407985"
	}
]
```

exemplo de resposta - success:

```json=
[
	{
	    "success": "cadastro do cliente editado com sucesso"
    }
]
```

exemplo de resposta - error:

```json=
[
    {
	    "error": "é necessário estar logado para ter acesso a esta página"
    }
]
```

--- 


#### 6`DELETE` http://localhost:3000/clientes/id
Esse endpoint receberá o id do cliente do qual deseja deletar o cadastro,
deverá ser enviado no headers da requisição o token recebido no login como bearer token:


exemplo de resposta - success:

```json=
[
    {
	    "success": "cadastro do usuario deletado com sucesso"
    }
]
```

exemplo de resposta - error:

```json=
[
    {
	    "error" : "não foi possivel deletar o cadastro do cliente"
    }
]
```

---

#### 7`POST` http://localhost:3000/vendas-cadastro
Esse endpoint receberá os dados de uma nova venda para cadastro,
deverá ser enviado no headers da requisição o token recebido no login como bearer token:

exemplo de requisição:

```json=
[
	{
		"id_imovel": 4,
		"valor": "340000",
		"condicaoDePagamento": "à vista",
		"email": "thiago@cliente.com",
		"nomeCliente": "Thiago",
		"comissao": "17000"
	}
]
```

exemplo de resposta - success:


```json=
[
    {
	    "success": "venda cadastrada com sucesso"
    }
]
```

exemplo de resposta - error:


```json=
[
    {
	    "error" : "não foi possivel cadastrar a venda, tente novamente"
    }
]
```


---

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:


- [Node.js](https://nodejs.org/en/)

---
