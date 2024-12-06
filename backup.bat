@echo off
echo Sauvegarde de IAM Invoicer
echo ========================
echo.

:: Créer le dossier de sauvegarde s'il n'existe pas
if not exist "backups" mkdir backups

:: Créer un dossier pour la sauvegarde du jour
set backup_dir=backups\%date:~-4,4%%date:~-7,2%%date:~-10,2%
if not exist "%backup_dir%" mkdir "%backup_dir%"

:: Sauvegarder la base de données
echo Sauvegarde de la base de données...
copy "data\database.sqlite" "%backup_dir%\database.sqlite"

:: Sauvegarder les fichiers de configuration
echo Sauvegarde des fichiers de configuration...
copy ".env" "%backup_dir%\.env"

:: Créer une archive ZIP
echo Création de l'archive...
powershell Compress-Archive -Path "%backup_dir%" -DestinationPath "%backup_dir%.zip"

:: Supprimer le dossier temporaire
rmdir /s /q "%backup_dir%"

echo.
echo Sauvegarde terminée avec succès !
echo Fichier de sauvegarde : %backup_dir%.zip
echo.
pause