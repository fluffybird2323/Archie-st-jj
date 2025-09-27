import { NextRequest, NextResponse } from "next/server"
import { testEmailSetup, sendOrderConfirmation, sendAdminOrderNotification, type OrderData } from "@/lib/sendgrid"

export async function GET() {
  try {
    const success = await testEmailSetup()

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Test email sent successfully! Check your inbox."
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to send test email. Check your SendGrid configuration."
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Test email error:", error)
    return NextResponse.json({
      success: false,
      message: "Error testing email setup",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, orderData } = await request.json()

    if (type === "order-confirmation" && orderData) {
      const success = await sendOrderConfirmation(orderData)
      return NextResponse.json({ success, message: success ? "Order confirmation sent" : "Failed to send confirmation" })
    }

    if (type === "admin-notification" && orderData) {
      const success = await sendAdminOrderNotification(orderData)
      return NextResponse.json({ success, message: success ? "Admin notification sent" : "Failed to send notification" })
    }

    // Sample order data for testing
    if (type === "test-order") {
      const sampleOrder: OrderData = {
        orderId: `TEST-${Date.now()}`,
        items: [
          {
            name: "ARTIE Signature Hoodie",
            price: 89.99,
            quantity: 1,
            size: "L",
            color: "Black",
            image: "https://i.imgur.com/example.jpg"
          }
        ],
        total: 89.99,
        currency: "$",
        customer: {
          name: "Test Customer",
          email: process.env.ADMIN_EMAIL || "admin@artiestudio.org"
        },
        orderDate: new Date()
      }

      const confirmationSent = await sendOrderConfirmation(sampleOrder)
      const adminNotificationSent = await sendAdminOrderNotification(sampleOrder)

      return NextResponse.json({
        success: confirmationSent && adminNotificationSent,
        message: "Test order emails sent",
        details: {
          confirmationSent,
          adminNotificationSent
        }
      })
    }

    return NextResponse.json({ success: false, message: "Invalid request type" }, { status: 400 })
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json({
      success: false,
      message: "Error processing email request",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}