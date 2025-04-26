#!/bin/bash
set -e

APP_DIR="/var/www/book-store-app"
cd "$APP_DIR"

echo "Fetching PORT from AWS Parameter Store..."

PORT_PARAM="/book-store-app/port"
PORT=$(aws ssm get-parameter --name "$PORT_PARAM" --query Parameter.Value --output text)

# Create .env file
cat > "$APP_DIR/.env" << EOF
PORT=${PORT}
EOF

# Install PM2 if not available
command -v pm2 &> /dev/null || npm install -g pm2

# Forcefully restart the app using PM2 (if already running)
pm2 start "$APP_DIR/index.js" --name "book-store-app" --env production -f
pm2 startup | bash || true
pm2 save || true

echo "Application started successfully."
