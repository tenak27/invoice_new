@echo off
echo Installation de IAM Invoicer
echo ============================
echo.

:: Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js n'est pas installé. Installation requise...
    echo Veuillez télécharger et installer Node.js depuis https://nodejs.org/
    echo Puis relancez ce script.
    pause
    exit
)

:: Vérifier si Git est installé
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git n'est pas installé. Installation requise...
    echo Veuillez télécharger et installer Git depuis https://git-scm.com/
    echo Puis relancez ce script.
    pause
    exit
)

:: Créer les dossiers nécessaires
if not exist "data" mkdir data
if not exist "logs" mkdir logs

:: Copier le fichier .env.example vers .env s'il n'existe pas
if not exist ".env" copy ".env.example" ".env"

:: Installer les dépendances
echo Installation des dépendances...
call npm install

:: Initialiser la base de données
echo Initialisation de la base de données...
call npx prisma migrate deploy
call npx prisma db seed

:: Construire l'application
echo Construction de l'application...
call npm run build

echo.
echo Installation terminée avec succès !
echo Pour démarrer l'application en mode développement : npm run dev
echo Pour démarrer l'application en mode production : npm start
echo.
pause