#!/bin/bash

set -e

HOST=dashboard-ec2
APP_DIR=/home/ubuntu/shopify-headless

echo "🔨 Building locally..."
rm -rf .next
npm install
npm run build

echo "🚀 Syncing files..."

rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  ./ $HOST:$APP_DIR

echo "🚀 Deploying..."

ssh $HOST << EOF
cd $APP_DIR

echo "📦 Installing production deps..."
npm install --production

echo "♻️ Restarting app..."

pm2 restart shopify-headless || pm2 start npm --name shopify-headless -- start

pm2 save

echo "✅ Deployment complete"
EOF