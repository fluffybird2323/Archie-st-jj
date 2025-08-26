# ARTIE Store - Dual Payment System Deployment

This repository maintains two versions of the ARTIE store with different payment processors that can be deployed interchangeably to the `main` branch.

## 🏗️ Architecture

```
├── main (deployment target)
├── deploy-square (stable Square version)
├── deploy-stripe (stable Stripe version)
├── development branches...
└── deployment scripts
```

## 💳 Payment Versions

### Square Version (`deploy-square`)
- **Payment Processor**: Square Point of Sale
- **Best For**: Physical stores, in-person transactions
- **Features**: 
  - Order management
  - Inventory tracking
  - POS integration
  - Real-time order updates

### Stripe Version (`deploy-stripe`)
- **Payment Processor**: Stripe Online Payments
- **Best For**: E-commerce, international sales
- **Features**:
  - Multi-currency support
  - Japan compliance pages (Commerce Disclosure, Refund Policy)
  - International payment methods (Alipay, WeChat Pay, Konbini)
  - PCI DSS Level 1 compliance

## 🚀 Quick Deployment

### Interactive Mode (Recommended)
```bash
./switch-version.sh
```

### Direct Deployment
```bash
# Deploy Square version
./deploy-square.sh

# Deploy Stripe version  
./deploy-stripe.sh
```

## 🔧 Manual Process

If you prefer manual control:

```bash
# Deploy Square version
git checkout main
git reset --hard deploy-square
git push origin main --force-with-lease

# Deploy Stripe version
git checkout main  
git reset --hard deploy-stripe
git push origin main --force-with-lease
```

## 📝 Development Workflow

1. **Work on features in feature branches**
2. **Merge completed features into appropriate deploy branch**:
   - Square features → `deploy-square`
   - Stripe features → `deploy-stripe` 
   - Universal features → both branches
3. **Use scripts to deploy to main when ready**

## ⚠️ Important Notes

- **Always test** in staging before deploying to production
- **Environment variables** need to be set correctly for each version:
  - Square: `SQUARE_ACCESS_TOKEN`, `SQUARE_ENVIRONMENT`  
  - Stripe: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Database schema** should be compatible with both versions
- **Backup main** before major deployments

## 🌏 Regional Considerations

- **Japan Market**: Must use Stripe version for compliance requirements
- **US/EU Markets**: Either version works, choose based on business needs
- **Multi-region**: Consider using Stripe for unified international experience

## 🔄 Branch Sync

Keep deploy branches updated:

```bash
# Update Square deploy branch
git checkout deploy-square
git merge main  # or specific feature branches
git push origin deploy-square

# Update Stripe deploy branch  
git checkout deploy-stripe
git merge main  # or specific feature branches
git push origin deploy-stripe
```

## 📊 Monitoring

After deployment, verify:
- [ ] Payment flow works
- [ ] Compliance pages load (Stripe version)
- [ ] Environment variables are correct
- [ ] Database connections work
- [ ] API endpoints respond correctly

## 🚨 Rollback

If issues occur after deployment:
```bash
git checkout main
git reset --hard HEAD~1  # Go back one commit
git push origin main --force-with-lease
```

Or switch to the other payment version as a quick fallback.