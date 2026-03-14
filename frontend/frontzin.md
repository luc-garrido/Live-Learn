🎓 Live & Learn (L&L) – Frontend

Interface web da plataforma Live & Learn, um sistema inteligente que cria trilhas de estudo personalizadas automaticamente a partir do que o usuário deseja aprender.

O objetivo do projeto é permitir que qualquer pessoa digite um tema de estudo e receba uma trilha estruturada com conteúdo, vídeos e atividades.

---

🚀 Funcionalidades Implementadas

👤 Login simples

Usuário entra apenas com:

- Nome
- Email

Ao entrar:

1. O frontend envia uma requisição para criação do usuário
2. O "userId" é salvo no navegador
3. O usuário é redirecionado para o dashboard

---

📚 Dashboard de Trilhas

Após login, o usuário visualiza suas trilhas de estudo.

Funcionalidades:

- Buscar trilhas do usuário
- Listar trilhas disponíveis
- Acessar uma trilha específica

---

🧩 Página da Trilha

Mostra todos os módulos da trilha selecionada.

Cada módulo representa uma etapa do aprendizado.

---

🎥 Página de Estudo do Módulo

Dentro do módulo o usuário encontra:

- Conteúdo textual
- Vídeos educacionais
- Atividades para reforço

---

🔗 Fluxo da Aplicação

Login do usuário

↓

Criação do usuário na API

↓

Dashboard com trilhas

↓

Acesso a uma trilha

↓

Visualização de módulos

↓

Estudo do módulo (conteúdo + vídeos + atividades)

---

🧱 Estrutura do Frontend

src
│
├── pages
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── TrackPage.tsx
│   └── ModulePage.tsx
│
├── services
│   ├── api.ts
│   ├── userService.ts
│   ├── trackService.ts
│   ├── moduleService.ts
│   ├── videoService.ts
│   ├── contentService.ts
│   └── activityService.ts
│
├── components
│   ├── TrackCard.tsx
│   ├── ModuleCard.tsx
│   ├── VideoPlayer.tsx
│   ├── ActivityCard.tsx
│   └── ProgressBar.tsx
│
├── App.tsx
└── main.tsx

---

⚙️ Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router
- Fetch API

---

📡 Integração com Backend

O frontend consome os seguintes endpoints da API:

POST /criarUser
POST /criarTrilha

GET /tracks
GET /modules
GET /contents
GET /videos
GET /activities

POST /responderAtividade

---

🔜 Próximos Passos

Backend

- Finalizar endpoints da API
- Conectar banco de dados
- Gerar trilhas automaticamente

Integrações

- Buscar vídeos educacionais automaticamente
- Buscar conteúdos de fontes confiáveis

Interface

- Aplicar design final
- Criar componentes visuais
- Melhorar experiência do usuário

---

🧠 Visão do Projeto

O Live & Learn busca simplificar o aprendizado na internet.

Em vez de procurar conteúdos espalhados, o usuário recebe uma trilha estruturada automaticamente, permitindo aprender de forma mais rápida e organizada.

---

👨‍💻 Status do Projeto

🚧 Em desenvolvimento – versão MVP para Hackathon