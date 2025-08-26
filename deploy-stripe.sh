#!/bin/bash

# Deploy Stripe Version Script
# This script switches main to the Stripe payment version with compliance pages

set -e  # Exit on any error

echo "🔄 Deploying Stripe version to main..."

# Ensure we're in a clean state
git status --porcelain > /dev/null
if [ ! -z "$(git status --porcelain)" ]; then
    echo "⚠️  Working directory is not clean. Stashing changes..."
    git stash push -m "Auto-stash before Stripe deployment"
fi

# Switch to main and sync with deploy-stripe
git checkout main
echo "📋 Resetting main to match deploy-stripe..."
git reset --hard deploy-stripe

# Push to origin
echo "🚀 Pushing Stripe version to main..."
git push origin main --force-with-lease

echo "✅ Stripe version successfully deployed to main!"
echo "💳 Payment processor: Stripe"
echo "📄 Includes compliance pages for Japan"
echo "🌐 Ready for deployment"