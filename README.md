# Plataforma Open-Source de "Link-in-Bio" com Analytics Avançado

Uma alternativa open-source e customizável ao Linktree, construída sobre uma plataforma de Backend-as-a-Service (BaaS) com um dashboard de analytics detalhado e focado em privacidade.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Sobre o Projeto

Este projeto é uma plataforma completa que permite a usuários criarem suas próprias páginas de "links na bio", similar ao Linktree ou ao Bio.link. O grande diferencial está no **motor de analytics avançado**, que oferece insights detalhados sobre o desempenho dos links.

O objetivo é demonstrar proficiência em uma stack de tecnologia moderna (Jamstack + BaaS) e em desafios de engenharia de dados do mundo real, como a coleta e agregação eficiente de um grande volume de eventos.

## ✨ Recursos Principais

- **Autenticação de Usuários:** Cadastro e login seguros com e-mail/senha e provedores sociais (Google, GitHub, etc.).
- **Gerenciamento de Links:** Interface para criar, editar e deletar links.
- **Páginas Públicas Customizáveis:** Cada usuário tem uma página pública (ex: `seusite.com/username`) gerada estaticamente para máxima performance.
- **Dashboard de Analytics Interativo:**
  - Visualização de cliques por dia, semana e mês.
  - Análise geográfica (de qual país vêm os cliques).
  - Fontes de tráfego (referrers).
  - Comparativo de desempenho entre links.
- **Coleta de Dados Eficiente:** Utiliza Supabase Edge Functions para registrar cliques de forma assíncrona, sem impactar a experiência de redirecionamento do usuário.
- **Processamento de Dados Otimizado:** Emprega `Materialized Views` e funções `PL/pgSQL` no PostgreSQL para pré-agregar os dados, garantindo que o dashboard carregue de forma instantânea.

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (com App Router)
- **Backend & Banco de Dados (BaaS):** [Supabase](https://supabase.com/)
- **Banco de Dados Primário:** [PostgreSQL](https://www.postgresql.org/)
- **Autenticação:** [Supabase Auth](https://supabase.com/docs/guides/auth)
- **Funções Serverless:** [Supabase Edge Functions](https://supabase.com/docs/guides/functions) (escritas em Deno/TypeScript)
- **Hospedagem:** [Vercel](https://vercel.com/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Visualização de Dados:** [Tremor](https://www.tremor.so/) ou [Recharts](https://recharts.org/)

## ⚙️ Como Rodar Localmente

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento.

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
    cd SEU-REPOSITORIO
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure o Supabase:**

    - Crie um projeto em [supabase.com](https://supabase.com).
    - Vá para `Project Settings` > `API` e copie o **Project URL** e a chave **`anon` `public`**.
    - Vá para `Project Settings` > `Database` e copie a sua **Connection string**.
    - Vá em `SQL Editor` e rode os comandos SQL presentes nos arquivos de schema do projeto para criar as tabelas.

4.  **Configure as Variáveis de Ambiente:**

    - Renomeie o arquivo `.env.local.example` para `.env.local`.
    - Preencha as variáveis com as chaves do seu projeto Supabase:
      ```env
      NEXT_PUBLIC_SUPABASE_URL=URL_DO_SEU_PROJETO
      NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC
      ```

5.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
