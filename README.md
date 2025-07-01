# 🔮 Estimador de Idade - Desafio Técnico Voltera

Projeto desenvolvido como parte do desafio técnico para a vaga de Front-End na **Voltera**.

A aplicação utiliza a API pública [Agify.io](https://agify.io) para estimar a idade de uma pessoa com base no nome digitado. O usuário insere um nome no campo de busca, e o sistema retorna uma idade aproximada, além de uma mensagem personalizada com base na faixa etária.

## ✨ Funcionalidades

- 🔎 Input com debounce de 1 segundo para otimizar as chamadas à API
- ⚙️ Reatividade com SvelteKit e navegação controlada por `goto()`
- 🌓 Suporte a **modo claro/escuro** com botão de toggle
- 🎯 Feedback visual com **loader animado**, tratamento de erros e estados distintos
- 💬 Mensagens personalizadas com base na idade estimada
- 🎨 Estilização responsiva com **CSS puro**, organizado por temas

## 🛠️ Tecnologias Utilizadas

- [Svelte](https://svelte.dev)
- [SvelteKit](https://kit.svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Agify API](https://agify.io/)
- CSS puro (sem frameworks)

## 📂 Estrutura do Projeto

```bash
.
├── src
│   ├── routes
│   │   └── +page.svelte   # Página principal
|   |   └── +layout.svelte # Estilização 
|   |   └── +page.ts       # Estilização 
│   ├── styles
│   │   └── theme.css      # Estilos globais e tema dark/light
│   └── app.html           # Template base
└── README.md

````

## 🚀 Como rodar localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/michaelleoliveir/voltera-frontend-test
   cd voltera-frontend-test

2. **Instale as dependências:**

    ```bash
    npm install

3. **Rode o servidor**

    ```bash
    npm run dev