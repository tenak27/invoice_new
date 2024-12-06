@echo off
echo Démarrage de IAM Invoicer en mode production
echo =========================================
echo.

:: Vérifier si .env existe
if not exist ".env" (
    echo Fichier .env manquant. Lancement de l'installation...
    call install.bat
)

:: Démarrer l'application en mode production
call npm start
pause