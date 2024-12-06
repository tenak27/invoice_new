# IAM Invoicer - Guide d'installation Windows

## Prérequis

- Windows 10 ou plus récent
- Node.js 18.x ou plus récent
- Git (optionnel)

## Installation

1. Téléchargez et décompressez l'archive du projet

2. Double-cliquez sur `install.bat` pour lancer l'installation
   - Le script vérifiera les prérequis
   - Installera les dépendances
   - Initialisera la base de données
   - Construira l'application

## Démarrage

- Pour le développement : Double-cliquez sur `start-dev.bat`
- Pour la production : Double-cliquez sur `start-prod.bat`

## Mise à jour

Double-cliquez sur `update.bat` pour :
- Sauvegarder la base de données
- Mettre à jour les dépendances
- Appliquer les migrations
- Reconstruire l'application

## Sauvegarde

Double-cliquez sur `backup.bat` pour :
- Sauvegarder la base de données
- Sauvegarder les fichiers de configuration
- Créer une archive ZIP datée

## Structure des dossiers

```
IAM-Invoicer/
├── backups/           # Sauvegardes
├── data/             # Base de données
├── logs/             # Fichiers journaux
├── install.bat       # Script d'installation
├── start-dev.bat     # Démarrage en développement
├── start-prod.bat    # Démarrage en production
├── update.bat        # Mise à jour
└── backup.bat        # Sauvegarde
```

## Support

Pour toute assistance, contactez le support IAM TECHNOLOGY.