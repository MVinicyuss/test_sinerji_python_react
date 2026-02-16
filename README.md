# Teste Técnico - Aplicação Full Stack com Docker

Aplicação Full Stack desenvolvida com FastAPI (backend), React + TypeScript (frontend) e PostgreSQL (banco de dados), completamente containerizada com Docker.

## 🐳 Tecnologias

- **Backend**: FastAPI
- **Frontend**: React
- **Banco de Dados**: PostgreSQL

## ✨ Funcionalidades

- Sistema de autenticação com JWT
- Cadastro de usuários
- Login de usuários
- Proteção de rotas
- Persistência de dados no PostgreSQL

## Como Executar

### 1. Clone o repositório e navegue até a pasta do projeto

```bash
cd Teste
```

### 2. Executar a aplicação

```bash
docker-compose up --build
```

### 3. Acesse a aplicação

- **Frontend**: http://localhost (porta 80)
- **Backend API**: http://localhost:8000
- **Documentação API**: http://localhost:8000/docs
- **Banco de Dados PostgreSQL**: localhost:5432


## 📁 Estrutura do Projeto

```
Teste/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── requirements.txt
│   ├── main.py
│   ├── auth/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   └── services/
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   ├── package.json
│   └── src/
├── docker-compose.yml
├── .env
└── .env.example
```

