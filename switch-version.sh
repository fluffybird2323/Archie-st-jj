#!/bin/bash

# Interactive Version Switcher
# Choose between Square and Stripe versions for deployment

set -e

echo "🏪 ARTIE Store - Payment Version Switcher"
echo "========================================"
echo ""
echo "Current branch: $(git branch --show-current)"
echo ""
echo "Choose which payment version to deploy to main:"
echo "1) Square (Point of Sale system)"
echo "2) Stripe (Online payments with compliance)"
echo "3) Check current version info"
echo "4) Cancel"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🔲 You selected: Square"
        read -p "Deploy Square version to main? (y/N): " confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            ./deploy-square.sh
        else
            echo "❌ Deployment cancelled"
        fi
        ;;
    2)
        echo ""
        echo "💳 You selected: Stripe"
        read -p "Deploy Stripe version to main? (y/N): " confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            ./deploy-stripe.sh
        else
            echo "❌ Deployment cancelled"
        fi
        ;;
    3)
        echo ""
        echo "📊 Version Information:"
        echo "====================="
        echo ""
        echo "🔲 Square Version (deploy-square):"
        echo "   - Payment: Square Point of Sale"
        echo "   - Best for: In-person transactions"
        echo "   - Features: Order management, inventory"
        echo ""
        echo "💳 Stripe Version (deploy-stripe):"
        echo "   - Payment: Stripe Online"
        echo "   - Best for: E-commerce, international"
        echo "   - Features: Compliance pages, multi-currency"
        echo "   - Required for: Japan market compliance"
        echo ""
        git log --oneline -5 deploy-square | sed 's/^/   Square: /'
        echo ""
        git log --oneline -5 deploy-stripe | sed 's/^/   Stripe: /'
        ;;
    4)
        echo "❌ Cancelled"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac