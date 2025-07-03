@echo off
REM Script de setup automático para o sistema de equipamentos

REM Backend
cd sistema-equipamentos-novo
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
flask db upgrade
cd ..\frontend-equipamentos-vite

REM Frontend
npm install

cd ..
echo.
echo Ambiente pronto!
echo Para rodar backend e frontend juntos, execute:
echo cd frontend-equipamentos-vite
echo npm run dev
pause 