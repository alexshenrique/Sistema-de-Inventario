#!/bin/bash

# Script de setup para Mac/Linux
# Uso: bash setup.sh

set -e

# Backend
cd sistema-equipamentos-novo

echo "[1/4] Criando ambiente virtual Python..."
python3 -m venv venv
source venv/bin/activate

echo "[2/4] Instalando dependências do backend..."
pip install --upgrade pip
pip install -r requirements.txt

deactivate
cd ..

# Frontend
cd frontend-equipamentos-vite

echo "[3/4] Instalando dependências do frontend..."
npm install

echo "[4/4] Instalando 'concurrently' para rodar frontend e backend juntos..."
npm install --save-dev concurrently

cd ..

echo "\nSetup concluído!"
echo "----------------------------------------"
echo "Para rodar o projeto em desenvolvimento, use:"
echo "  1. Ative o ambiente do backend:"
echo "     cd sistema-equipamentos-novo && source venv/bin/activate && flask run"
echo "  2. Em outro terminal, rode o frontend:"
echo "     cd frontend-equipamentos-vite && npm run dev"
echo "\nOU, para rodar ambos juntos (se configurado no package.json do frontend):"
echo "     cd frontend-equipamentos-vite && npm run dev:all"
echo "----------------------------------------"
echo "Dúvidas? Veja o README.md para mais detalhes." 