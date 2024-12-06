@echo off
echo Mise à jour de IAM Invoicer
echo =========================
echo.

:: Sauvegarder la base de données
echo Sauvegarde de la base de données...
if not exist "backups" mkdir backups
copy "data\database.sqlite" "backups\database_%date:~-4,4%%date:~-7,2%%date:~-10,2%.sqlite"

:: Mettre à jour les dépendances
echo Mise à jour des dépendances...
call npm install

:: Mettre à jour la base de données
echo Mise à jour de la base de données...
call npx prisma migrate deploy

:: Reconstruire l'application
echo Reconstruction de l'application...
call npm run build

echo.
echo Mise à jour terminée avec succès !
echo.
pause