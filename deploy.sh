#!/bin/bash

# Variables
APP_NAME="iam-invoicer"
DOMAIN="votre-domaine.com"
NODE_VERSION="20"

# Mise à jour du système
echo "Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

# Installation des dépendances
echo "Installation des dépendances..."
sudo apt install -y curl git nginx certbot python3-certbot-nginx

# Installation de Node.js
echo "Installation de Node.js..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt install -y nodejs

# Installation de PM2
echo "Installation de PM2..."
sudo npm install -g pm2

# Configuration de Nginx
echo "Configuration de Nginx..."
sudo tee /etc/nginx/sites-available/$APP_NAME << EOF
server {
    server_name ${DOMAIN};
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Activation du site Nginx
sudo ln -s /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# Configuration SSL avec Let's Encrypt
echo "Configuration SSL..."
sudo certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos --email votre-email@domaine.com

# Installation des dépendances du projet
echo "Installation des dépendances du projet..."
npm install

# Construction du projet
echo "Construction du projet..."
npm run build

# Configuration de PM2
echo "Configuration de PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "Déploiement terminé !"
echo "Application accessible sur https://${DOMAIN}"