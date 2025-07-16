# Sistema de Gestão de Equipamentos de TI

![GitHub last commit](https://img.shields.io/github/last-commit/alexshenrique01/sistema-equipamentos-ti)
![GitHub license](https://img.shields.io/github/license/alexshenrique01/sistema-equipamentos-ti)
![GitHub issues](https://img.shields.io/github/issues/alexshenrique01/sistema-equipamentos-ti)

## 📑 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Demonstração](#demonstração)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Testes](#testes)
- [Deploy](#deploy)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## 💻 Sobre o Projeto

Sistema completo para gestão de equipamentos de TI, com backend em Flask (Python) e frontend em React (Vite). Permite cadastro, controle, manutenção, exportação de dados e visualização de dashboards interativos.

## ✅ Funcionalidades

- Cadastro, edição e exclusão de equipamentos
- Campo obrigatório "marca" nos equipamentos
- Exportação de dados (CSV, Excel, PDF)
- Dashboard com cards de resumo e gráficos interativos
- Filtros avançados e relatórios customizados
- Autenticação de usuários
- Deploy automatizado no Render.com
- Scripts de setup multiplataforma

## 🚀 Tecnologias Utilizadas

- **Backend:**
  - Python
  - Flask
  - SQLAlchemy
  - Alembic (migrações)
  - Gunicorn (produção)
- **Frontend:**
  - React (Vite)
  - Material UI
  - Recharts
  - Chart.js
- **Outros:**
  - Render.com (deploy)
  - Concurrently (scripts)

## 🗂️ Estrutura do Projeto

```
sistema-equipamentos-ti/
  ├── app/
  ├── instance/
  ├── migrations/
  ├── tests/
  ├── requirements.txt
  ├── run.py
  ├── criar_db.py
  ├── README.md
  └── ...
```

## 🖼️ Demonstração

> **Adicione aqui prints ou GIFs do sistema em funcionamento!**
> 
> Exemplo:
> ![Dashboard](caminho/para/imagem-dashboard.png)

## ▶️ Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/alexshenrique01/sistema-equipamentos-ti.git
cd sistema-equipamentos-ti

# Instale as dependências do backend
python -m venv .venv
.venv\Scripts\activate  # Windows
# ou
source .venv/bin/activate  # Mac/Linux
pip install -r requirements.txt

# Instale as dependências do frontend
cd frontend-equipamentos
npm install

# Volte para a raiz e rode tudo junto (multiplataforma)
cd ..
npm install  # para instalar o concurrently, se necessário
npm run start-all

# Backend: http://localhost:5000
# Frontend: http://localhost:3000
```

## 🧪 Testes

> Explique aqui como rodar os testes, se houver.

```bash
# Exemplo
test comando aqui
```

## ☁️ Deploy

- Deploy automatizado no [Render.com](https://render.com/)
- Configure as variáveis de ambiente conforme o arquivo `.env.example`
- Certifique-se de liberar o CORS para o frontend em produção

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome`)
3. Commit suas alterações (`git commit -m 'feat: minha contribuição'`)
4. Push na branch (`git push origin feature/nome`)
5. Abra um Pull Request

Consulte o arquivo `GuiaGit.txt` para um guia rápido de versionamento.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📬 Contato

- **Alex Silva** — [alexshenrique01@gmail.com](mailto:alexshenrique01@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/alexshenrique) 