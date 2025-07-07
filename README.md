# Sistema de Gestão de Equipamentos de TI

Este projeto é um sistema completo para gestão de equipamentos de TI, com backend em Flask (Python) e frontend em React (Vite).

## Estrutura do Projeto

- `sistema-equipamentos-novo/` — Backend (API Flask)
- `frontend-equipamentos-vite/` — Frontend (React + Vite)

## Como rodar o projeto

### Windows

1. Execute o script de setup:
   ```bat
   setup.bat
   ```
2. Siga as instruções exibidas no terminal para rodar backend e frontend.

### Mac/Linux

1. Execute o script de setup:
   ```bash
   bash setup.sh
   ```
2. Para rodar o backend e o frontend separadamente:
   - **Backend:**
     ```bash
     cd sistema-equipamentos-novo
     source venv/bin/activate
     flask run
     ```
   - **Frontend:**
     ```bash
     cd frontend-equipamentos-vite
     npm run dev
     ```
3. Para rodar ambos juntos (se configurado no package.json do frontend):
   ```bash
   cd frontend-equipamentos-vite
   npm run dev:all
   ```

---

Acesse o sistema em [http://localhost:5173](http://localhost:5173) após iniciar o frontend.

Para mais detalhes, consulte a documentação de cada pasta. 