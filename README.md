# Sistema de Gestão de Equipamentos de TI

Este projeto é um sistema web completo para controle de equipamentos de TI, com backend em Flask (Python) e frontend em React (Vite).

## Estrutura do Projeto

```
Projetos/
  sistema-equipamentos-novo/      # Backend Flask
  frontend-equipamentos-vite/      # Frontend React (Vite)
  setup.bat                        # Script de setup automático (Windows)
```

## Funcionalidades
- Cadastro, edição e exclusão de equipamentos, usuários e manutenções
- Relatórios e dashboards com gráficos
- Exportação de dados (CSV, Excel, PDF)
- Filtros, busca e paginação
- Interface moderna e responsiva

## Como rodar o projeto

1. **Clone o repositório**
2. **Execute o script de setup (Windows):**
   ```
   setup.bat
   ```
3. **Para rodar backend e frontend juntos:**
   ```
   cd frontend-equipamentos-vite
   npm run dev
   ```

Acesse o sistema em [http://localhost:5173](http://localhost:5173)

---

> Para dúvidas, sugestões ou melhorias, abra uma issue ou envie um pull request! 