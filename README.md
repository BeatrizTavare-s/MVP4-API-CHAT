
# 🤖 OpenAI Schedule API - Módulo do Projeto Study Content

Esta é a **API Secundária 01** do projeto **Study Content**, desenvolvida em **Node.js + Express** com **PostgreSQL**. Sua função é:

- Gerar cronogramas de estudo utilizando a **API da OpenAI (GPT-4o)**
- Armazenar no banco de dados a **quantidade de requisições feitas por dia**, para evitar uso excessivo da API da OpenAI

> 🔗 Esta API é consumida pela API principal (Python) e integra o fluxo de geração automática de cronogramas de estudo com IA.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- PostgreSQL
- API da OpenAI (GPT-4o)
- Docker

---

## 📌 Funcionalidades

- `GET /chat?prompt=...` → Envia o prompt para a OpenAI e retorna o cronograma gerado
- Controle de chamadas por dia para evitar excesso de uso
- Armazenamento de logs de requisições no banco de dados

---

## ⚙️ Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o `.env`:
   ```
   PORT=3002
   DATABASE_URL=postgres://usuario:senha@localhost:5432/openai_api
   OPENAI_API_KEY=sua-chave-aqui
   ```

3. Execute a API:
   ```bash
   npm run dev
   ```

---

## 🐳 Como rodar com Docker

1. Acesse a pasta com backend principal:
[Study Content](https://github.com/BeatrizTavare-s/MVP4-backend)

2. Execute o comando para build:
```bash
docker compose up --build
```

## 🧾 Documentação da API da OpenAI (GPT-4o)

Essa API utiliza o endpoint:

```
POST https://api.openai.com/v1/chat/completions
```

### Exemplo de payload:

```json
{
  "model": "gpt-4o",
  "messages": [
    { "role": "user", "content": "Crie um cronograma de estudo para 1 semana de inglês básico" }
  ],
  "temperature": 0.7
}
```

### Headers necessários:

```
Authorization: Bearer <sua-chave-API>
Content-Type: application/json
```

Para mais informações:  
📚 [Documentação Oficial OpenAI](https://platform.openai.com/docs/overview)

---

## 🧭 Arquitetura do Projeto

A API se integra ao projeto da seguinte forma:

![Arquitetura](https://github.com/BeatrizTavare-s/MVP4-backend/blob/main/img-readme/Fluxograma-explicado.PNG)

Ela se comunica com a OpenAI e com a API principal em Python, garantindo que o uso da IA seja controlado e eficiente.

---

## 🎥 Demonstração do Projeto

Vídeo de apresentação no YouTube:  
🔗 [https://www.youtube.com/watch?v=ZLq17Gpz654&ab_channel=BeatrizTavares](https://www.youtube.com/watch?v=ZLq17Gpz654&ab_channel=BeatrizTavares)
