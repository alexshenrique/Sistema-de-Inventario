# Sistema de Gestão de Equipamentos de TI

Este projeto é um sistema completo para gestão de equipamentos de TI, com backend em Flask (Python) e frontend em React (Vite).

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