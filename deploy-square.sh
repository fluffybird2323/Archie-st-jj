#!/bin/bash

# Deploy Square Version Script
# This script switches main to the Square payment version

set -e  # Exit on any error

echo "🔄 Deploying Square version to main..."

# Ensure we're in a clean state
git status --porcelain > /dev/null
if [ ! -z "$(git status --porcelain)" ]; then
    echo "⚠️  Working directory is not clean. Stashing changes..."
    git stash push -m "Auto-stash before Square deployment"
fi

# Switch to main and sync with deploy-square
git checkout main
echo "📋 Resetting main to match deploy-square..."
git reset --hard deploy-square

# Push to origin
echo "🚀 Pushing Square version to main..."
git push origin main --force-with-lease

echo "✅ Square version successfully deployed to main!"
echo "💳 Payment processor: Square"
echo "🌐 Ready for deployment"