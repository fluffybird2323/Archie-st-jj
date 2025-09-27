# Email Setup Guide for ARTIE Store

## Overview
This guide will help you set up:
1. **Free email hosting** for your artiestudio.org domain
2. **SendGrid integration** for automated order emails
3. **Testing** the email functionality

---

## Part 1: Free Email for artiestudio.org Domain

### Option A: Zoho Mail (Recommended - Most Features)

1. **Sign up at [Zoho Mail](https://www.zoho.com/mail/)**
   - Choose the "Forever Free Plan" (5 users, 5GB each)
   - Enter your domain: `artiestudio.org`

2. **Verify domain ownership**
   - Add TXT record to your domain DNS:
     ```
     Type: TXT
     Host: @
     Value: zoho-verification=zb****.zmverify.zoho.com
     ```

3. **Configure MX records** (in your domain registrar):
   ```
   Priority 10: mx.zoho.com
   Priority 20: mx2.zoho.com
   Priority 50: mx3.zoho.com
   ```

4. **Create email addresses**:
   - `admin@artiestudio.org` (main admin)
   - `orders@artiestudio.org` (for order notifications)
   - `support@artiestudio.org` (for customer support)

### Option B: ProtonMail (Privacy-focused)

1. **Sign up at [ProtonMail](https://proton.me/mail)**
2. **Add custom domain** in settings
3. **Configure DNS records** as provided

---

## Part 2: SendGrid Setup

### 1. Create SendGrid Account
1. Go to [SendGrid](https://sendgrid.com)
2. Sign up for free (100 emails/day forever free)
3. Verify your email address

### 2. Domain Authentication (Important!)
1. In SendGrid dashboard: **Settings > Sender Authentication**
2. Click **Authenticate Your Domain**
3. Enter `artiestudio.org`
4. Choose **Yes** for branded links
5. Add the provided DNS records to your domain:
   ```
   CNAME records (example):
   Host: s1._domainkey.artiestudio.org
   Value: s1.domainkey.u1234567.wl123.sendgrid.net

   Host: s2._domainkey.artiestudio.org
   Value: s2.domainkey.u1234567.wl123.sendgrid.net
   ```

### 3. Create API Key
1. Go to **Settings > API Keys**
2. Click **Create API Key**
3. Choose **Full Access** (recommended)
4. Name it: `ARTIE Store Production`
5. **Copy the key** - you won't see it again!

### 4. Configure Environment Variables
Add to your `.env.local` file:
```env
# SendGrid Configuration
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=orders@artiestudio.org
ADMIN_EMAIL=admin@artiestudio.org
MERCHANT_SUPPORT_EMAIL=support@artiestudio.org
```

---

## Part 3: Testing Email Setup

### 1. Test Basic Connectivity
Visit: `http://localhost:3001/api/test-email`

This will:
- ✅ Test SendGrid API connection
- 📧 Send test email to your admin email

### 2. Test Order Emails
Send POST request to: `http://localhost:3001/api/test-email`
```json
{
  "type": "test-order"
}
```

This will send:
- **Customer confirmation email** (to admin email)
- **Admin notification email** (to admin email)

### 3. Test with curl
```bash
# Test basic setup
curl http://localhost:3001/api/test-email

# Test order emails
curl -X POST http://localhost:3001/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"type": "test-order"}'
```

---

## Part 4: DNS Configuration Summary

You'll need to add these records to your domain registrar:

### For Zoho Mail:
```
Type: MX,  Host: @,  Value: mx.zoho.com,  Priority: 10
Type: MX,  Host: @,  Value: mx2.zoho.com, Priority: 20
Type: MX,  Host: @,  Value: mx3.zoho.com, Priority: 50
Type: TXT, Host: @,  Value: zoho-verification=zb****.zmverify.zoho.com
```

### For SendGrid:
```
Type: CNAME, Host: s1._domainkey, Value: s1.domainkey.u****.wl***.sendgrid.net
Type: CNAME, Host: s2._domainkey, Value: s2.domainkey.u****.wl***.sendgrid.net
```

---

## Part 5: Email Templates

Your store now includes:

### 1. Order Confirmation (Customer)
- Professional ARTIE branding
- Order details with images
- Customer information
- Shipping details

### 2. Admin Notification
- Urgent styling for new orders
- Complete order information
- Customer contact details
- Ready-to-process format

### 3. Shipping Confirmation
- Tracking number
- Estimated delivery
- Professional follow-up

---

## Troubleshooting

### Common Issues:

1. **"SendGrid API key not configured"**
   - Check `.env.local` has `SENDGRID_API_KEY`
   - Restart your dev server

2. **"550 Unauthenticated sending"**
   - Complete domain authentication in SendGrid
   - Wait 24-48 hours for DNS propagation

3. **Emails going to spam**
   - Complete domain authentication
   - Set up SPF record: `v=spf1 include:sendgrid.net ~all`

4. **DNS propagation delays**
   - DNS changes can take 24-48 hours
   - Test with: `nslookup -type=mx artiestudio.org`

---

## Production Checklist

Before going live:

- [ ] Domain authentication complete
- [ ] Test emails working
- [ ] Custom email addresses created
- [ ] SendGrid sending reputation good
- [ ] Environment variables set in production
- [ ] Email templates tested in all locales

---

## Cost Summary

- **Zoho Mail**: FREE (5 users, 5GB each)
- **SendGrid**: FREE (100 emails/day)
- **Domain**: Your existing cost

**Total additional cost: $0/month** 🎉

---

## Support

If you need help:
1. Check SendGrid [documentation](https://docs.sendgrid.com)
2. Test emails at `/api/test-email`
3. Check server logs for detailed error messages