import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export interface OrderItem {
  name: string
  price: number
  quantity: number
  size?: string
  color?: string
  image?: string
}

export interface CustomerInfo {
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export interface OrderData {
  orderId: string
  items: OrderItem[]
  total: number
  currency: string
  customer: CustomerInfo
  orderDate: Date
  shippingMethod?: string
  trackingNumber?: string
}

// Email templates
const ORDER_CONFIRMATION_TEMPLATE = (orderData: OrderData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Order Confirmation - ARTIE</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: #000; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px; }
        .content { padding: 30px; }
        .order-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
        .items-table th { background: #f8f9fa; font-weight: 600; }
        .total { font-size: 20px; font-weight: bold; text-align: right; margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .item-image { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ARTIE</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your order!</p>
        </div>

        <div class="content">
            <h2>Order Confirmation #${orderData.orderId}</h2>
            <p>Hi ${orderData.customer.name},</p>
            <p>We've received your order and are preparing it for shipment. You'll receive a shipping confirmation email with tracking information once your order is on its way.</p>

            <div class="order-info">
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                <p><strong>Order Date:</strong> ${orderData.orderDate.toLocaleDateString()}</p>
                <p><strong>Email:</strong> ${orderData.customer.email}</p>
                ${orderData.customer.address ? `
                <p><strong>Shipping Address:</strong><br>
                ${orderData.customer.address.street}<br>
                ${orderData.customer.address.city}, ${orderData.customer.address.state} ${orderData.customer.address.zipCode}<br>
                ${orderData.customer.address.country}</p>
                ` : ''}
            </div>

            <h3>Items Ordered</h3>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Details</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderData.items.map(item => `
                        <tr>
                            <td>
                                ${item.image ? `<img src="${item.image}" alt="${item.name}" class="item-image">` : ''}
                            </td>
                            <td>
                                <strong>${item.name}</strong><br>
                                ${item.size ? `Size: ${item.size}` : ''}
                                ${item.size && item.color ? ' • ' : ''}
                                ${item.color ? `Color: ${item.color}` : ''}
                            </td>
                            <td>${item.quantity}</td>
                            <td>${orderData.currency}${item.price.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="total">
                Total: ${orderData.currency}${orderData.total.toFixed(2)}
            </div>

            <p>If you have any questions about your order, please don't hesitate to contact us at <a href="mailto:orders@artiestudio.org">orders@artiestudio.org</a>.</p>

            <p>Thank you for choosing ARTIE!</p>
        </div>

        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ARTIE. All rights reserved.</p>
            <p>Premium streetwear that defines your style.</p>
        </div>
    </div>
</body>
</html>
`

const ADMIN_ORDER_NOTIFICATION = (orderData: OrderData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Order - ARTIE Admin</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; border-radius: 8px; }
        .order-info { background: #fee2e2; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #dc2626; }
        .items { background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .total { font-size: 18px; font-weight: bold; color: #dc2626; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚨 New Order Received!</h1>
        </div>

        <div class="order-info">
            <h3>Order Information</h3>
            <p><strong>Order ID:</strong> ${orderData.orderId}</p>
            <p><strong>Customer:</strong> ${orderData.customer.name}</p>
            <p><strong>Email:</strong> ${orderData.customer.email}</p>
            <p><strong>Phone:</strong> ${orderData.customer.phone || 'Not provided'}</p>
            <p><strong>Order Date:</strong> ${orderData.orderDate.toLocaleString()}</p>
        </div>

        <div class="items">
            <h3>Items</h3>
            ${orderData.items.map(item => `
                <p><strong>${item.name}</strong> - ${item.quantity}x ${orderData.currency}${item.price.toFixed(2)}<br>
                ${item.size ? `Size: ${item.size}` : ''}${item.size && item.color ? ' • ' : ''}${item.color ? `Color: ${item.color}` : ''}</p>
            `).join('')}
        </div>

        <p class="total">Total: ${orderData.currency}${orderData.total.toFixed(2)}</p>

        ${orderData.customer.address ? `
        <div class="order-info">
            <h3>Shipping Address</h3>
            <p>${orderData.customer.address.street}<br>
            ${orderData.customer.address.city}, ${orderData.customer.address.state} ${orderData.customer.address.zipCode}<br>
            ${orderData.customer.address.country}</p>
        </div>
        ` : ''}

        <p>Please process this order as soon as possible.</p>
    </div>
</body>
</html>
`

// Send order confirmation email to customer
export async function sendOrderConfirmation(orderData: OrderData): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured')
      return false
    }

    const msg = {
      to: orderData.customer.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'orders@artiestudio.org',
        name: 'ARTIE Store'
      },
      subject: `Order Confirmation #${orderData.orderId} - ARTIE`,
      html: ORDER_CONFIRMATION_TEMPLATE(orderData),
    }

    await sgMail.send(msg)
    console.log(`Order confirmation email sent to ${orderData.customer.email}`)
    return true
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
    return false
  }
}

// Send new order notification to admin
export async function sendAdminOrderNotification(orderData: OrderData): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured')
      return false
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@artiestudio.org'

    const msg = {
      to: adminEmail,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'orders@artiestudio.org',
        name: 'ARTIE Store System'
      },
      subject: `🚨 New Order #${orderData.orderId} - ${orderData.currency}${orderData.total.toFixed(2)}`,
      html: ADMIN_ORDER_NOTIFICATION(orderData),
    }

    await sgMail.send(msg)
    console.log(`Admin notification email sent for order ${orderData.orderId}`)
    return true
  } catch (error) {
    console.error('Error sending admin notification email:', error)
    return false
  }
}

// Send shipping confirmation email
export async function sendShippingConfirmation(orderData: OrderData): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY || !orderData.trackingNumber) {
      return false
    }

    const msg = {
      to: orderData.customer.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'orders@artiestudio.org',
        name: 'ARTIE Store'
      },
      subject: `Your ARTIE order #${orderData.orderId} has shipped!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px; font-weight: 900;">ARTIE</h1>
            <p style="margin: 10px 0 0 0;">Your order is on the way!</p>
          </div>

          <div style="padding: 30px;">
            <h2>Shipping Confirmation</h2>
            <p>Hi ${orderData.customer.name},</p>
            <p>Great news! Your order #${orderData.orderId} has been shipped and is on its way to you.</p>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Tracking Number:</strong> ${orderData.trackingNumber}</p>
              <p><strong>Shipping Method:</strong> ${orderData.shippingMethod || 'Standard Shipping'}</p>
            </div>

            <p>You can track your package using the tracking number above. Delivery typically takes 3-7 business days.</p>

            <p>Thank you for your order!</p>
            <p>The ARTIE Team</p>
          </div>
        </div>
      `,
    }

    await sgMail.send(msg)
    console.log(`Shipping confirmation email sent to ${orderData.customer.email}`)
    return true
  } catch (error) {
    console.error('Error sending shipping confirmation email:', error)
    return false
  }
}

// Test email function
export async function testEmailSetup(): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured')
      return false
    }

    const msg = {
      to: process.env.ADMIN_EMAIL || 'admin@artiestudio.org',
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'test@artiestudio.org',
        name: 'ARTIE Store Test'
      },
      subject: 'SendGrid Integration Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center; padding: 40px;">
          <h1 style="color: #000;">ARTIE</h1>
          <h2>SendGrid Integration Test</h2>
          <p>This is a test email to confirm that SendGrid is properly configured for your ARTIE store.</p>
          <p>✅ Email sending is working correctly!</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      `,
    }

    await sgMail.send(msg)
    console.log('Test email sent successfully')
    return true
  } catch (error) {
    console.error('Error sending test email:', error)
    return false
  }
}