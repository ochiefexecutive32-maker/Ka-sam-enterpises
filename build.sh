#!/bin/bash

# Ka'sam Enterprises - Node.js Build Script for Vercel Deployment

echo "🔨 Building Ka'sam Enterprises Node.js Application..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create data directory for SQLite database
echo "📁 Creating data directory..."
mkdir -p data

# Initialize database
echo "🗄️ Initializing database..."
node scripts/migrate.js

# Create necessary directories
echo "📂 Creating directories..."
mkdir -p static/images
mkdir -p static/css
mkdir -p static/js
mkdir -p media/team
mkdir -p media/projects
mkdir -p media/machines

echo "✅ Build complete!"
echo "🚀 Ready for deployment"
