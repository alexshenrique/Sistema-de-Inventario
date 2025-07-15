# Sistema de Gestão de Equipamentos de TI

Este projeto é um sistema completo para gestão de equipamentos de TI, com backend em Flask (Python) e frontend em React (Vite).

## Descrição do Projeto

O sistema permite o controle eficiente de equipamentos de tecnologia da informação, incluindo cadastro, edição, exclusão, controle de manutenções, geração de relatórios e dashboards interativos. Ideal para equipes de TI que precisam gerenciar ativos, manutenções e usuários de forma centralizada.

## Funcionalidades

- Cadastro, edição e exclusão de equipamentos
- Gestão de usuários
- Controle de manutenções
- Relatórios em PDF, Excel e CSV
- Dashboard com gráficos interativos
- Exportação de dados
- Autenticação de usuários
- Interface web moderna e responsiva

## Tecnologias Utilizadas

- **Backend:**
  - Python 3.10+
  - Flask
  - Flask-SQLAlchemy
  - Flask-Migrate
  - Flask-Login
  - Flask-CORS
  - SQLite (padrão, pode ser adaptado para outros bancos)
- **Frontend:**
  - React
  - Vite
  - Material UI
  - Chart.js

## Estrutura do Projeto

- `sistema-equipamentos-novo/` — Backend (API Flask)
- `frontend-equipamentos-vite/` — Frontend (React + Vite)

## Como rodar o projeto

### Pré-requisitos

- Python 3.10+
- Node.js 18+
- npm

### Instalação das dependências

1. **Backend:**
   ```bash
   cd sistema-equipamentos-novo
   python -m venv .venv
   # Ative o ambiente virtual:
   # Windows:
   .venv\Scripts\Activate.ps1
   # Mac/Linux:
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. **Frontend:**
   ```bash
   cd frontend-equipamentos-vite
   npm install
   ```

### Rodando tudo junto (backend + frontend)

1. Volte para a raiz do projeto.
2. Instale o concurrently (caso não tenha):
   ```bash
   npm install -g concurrently
   ```
3. Execute:
   ```bash
   node start-all.js
   ```

Isso irá iniciar o backend e o frontend automaticamente em terminais separados.

### Rodando separadamente

- **Backend:**
  ```bash
  cd sistema-equipamentos-novo
  # Ative o ambiente virtual e rode:
  .venv\Scripts\Activate.ps1   # Windows
  # ou
  source .venv/bin/activate     # Mac/Linux
  python run.py
  ```
- **Frontend:**
  ```bash
  cd frontend-equipamentos-vite
  npm run dev
  ```

---

Acesse o sistema em [http://localhost:5173](http://localhost:5173) após iniciar o frontend.

Para mais detalhes, consulte a documentação de cada pasta.

## Como contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature ou correção (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -m 'Minha contribuição'`)
4. Faça push para o seu fork (`git push origin minha-feature`)
5. Abra um Pull Request

## Como rodar os testes

1. Ative o ambiente virtual do backend
2. Execute:
   ```bash
   cd sistema-equipamentos-novo
   pytest
   ```

## Deploy

- O backend pode ser publicado em serviços como Render.com, Heroku, etc.
- Use Gunicorn para rodar o backend em produção:
  ```bash
  gunicorn run:app
  ```
- O frontend pode ser publicado no Vercel, Netlify, etc. Gere o build com:
  ```bash
  cd frontend-equipamentos-vite
  npm run build
  ```

## Variáveis de ambiente

- **Backend:**
  - `SECRET_KEY` — Chave secreta do Flask
  - `DATABASE_URL` — URL do banco de dados (opcional, padrão SQLite)
- **Frontend:**
  - `VITE_API_URL` — URL da API do backend

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato

Dúvidas, sugestões ou feedback? Entre em contato:
- [Alex Silva] — [alexshenrique01@gmail.com]
- [LinkedIn](https://www.linkedin.com/alexshenrique) 