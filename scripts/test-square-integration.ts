/**
 * End-to-End Testing Script for Square Integration
 * This script tests the complete flow from cart to order tracking
 */

interface TestResult {
  step: string
  status: "PASS" | "FAIL" | "SKIP"
  message: string
  data?: any
}

class SquareIntegrationTester {
  private baseUrl: string
  private results: TestResult[] = []

  constructor(baseUrl = "http://localhost:3000") {
    this.baseUrl = baseUrl
  }

  private log(step: string, status: "PASS" | "FAIL" | "SKIP", message: string, data?: any) {
    const result: TestResult = { step, status, message, data }
    this.results.push(result)

    const emoji = status === "PASS" ? "✅" : status === "FAIL" ? "❌" : "⏭️"
    console.log(`${emoji} ${step}: ${message}`)

    if (data) {
      console.log("   Data:", JSON.stringify(data, null, 2))
    }
  }

  async testEnvironmentVariables() {
    console.log("\n🔧 Testing Environment Variables...")

    const requiredVars = ["SQUARE_ACCESS_TOKEN", "SQUARE_APPLICATION_ID", "SQUARE_ENVIRONMENT", "SQUARE_LOCATION_ID"]

    for (const varName of requiredVars) {
      if (process.env[varName]) {
        this.log(`ENV_${varName}`, "PASS", `${varName} is set`)
      } else {
        this.log(`ENV_${varName}`, "FAIL", `${varName} is missing`)
      }
    }
  }

  async testCheckoutSessionCreation() {
    console.log("\n🛒 Testing Checkout Session Creation...")

    const testLineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Test Hoodie - Size: M - Color: Black",
            images: ["/placeholder.svg?height=400&width=400"],
          },
          unit_amount: 5000, // $50.00
        },
        quantity: 2,
      },
    ]

    try {
      const response = await fetch(`${this.baseUrl}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems: testLineItems,
          locale: "en",
        }),
      })

      const data = await response.json()

      if (response.ok && data.sessionId && data.checkoutUrl && data.orderId) {
        this.log("CHECKOUT_SESSION", "PASS", "Checkout session created successfully", {
          sessionId: data.sessionId,
          orderId: data.orderId,
          checkoutUrl: data.checkoutUrl.substring(0, 50) + "...",
        })
        return data
      } else {
        this.log(
          "CHECKOUT_SESSION",
          "FAIL",
          `Failed to create checkout session: ${data.error || "Unknown error"}`,
          data,
        )
        return null
      }
    } catch (error) {
      this.log("CHECKOUT_SESSION", "FAIL", `Network error: ${error instanceof Error ? error.message : "Unknown error"}`)
      return null
    }
  }

  async testOrderTracking(orderId?: string) {
    console.log("\n📦 Testing Order Tracking...")

    if (!orderId) {
      this.log("ORDER_TRACKING", "SKIP", "No order ID provided, skipping order tracking test")
      return
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/track-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      })

      const data = await response.json()

      if (response.ok && data.order) {
        this.log("ORDER_TRACKING", "PASS", "Order retrieved successfully", {
          orderId: data.order.id,
          status: data.order.status,
          totalAmount: data.order.totalAmount,
          currency: data.order.currency,
          itemCount: data.order.lineItems.length,
        })
        return data.order
      } else {
        this.log("ORDER_TRACKING", "FAIL", `Failed to retrieve order: ${data.error || "Unknown error"}`, data)
        return null
      }
    } catch (error) {
      this.log("ORDER_TRACKING", "FAIL", `Network error: ${error instanceof Error ? error.message : "Unknown error"}`)
      return null
    }
  }

  async testInvalidOrderTracking() {
    console.log("\n🚫 Testing Invalid Order Tracking...")

    const invalidOrderId = "INVALID_ORDER_ID_123"

    try {
      const response = await fetch(`${this.baseUrl}/api/track-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: invalidOrderId }),
      })

      const data = await response.json()

      if (!response.ok && data.error) {
        this.log("INVALID_ORDER_TRACKING", "PASS", "Invalid order properly rejected", {
          error: data.error,
        })
      } else {
        this.log("INVALID_ORDER_TRACKING", "FAIL", "Invalid order should have been rejected", data)
      }
    } catch (error) {
      this.log(
        "INVALID_ORDER_TRACKING",
        "FAIL",
        `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    }
  }

  async testCurrencyConversion() {
    console.log("\n💱 Testing Currency Conversion...")

    const testCases = [
      { locale: "en", expectedCurrency: "USD" },
      { locale: "ja", expectedCurrency: "JPY" },
      { locale: "zh", expectedCurrency: "CNY" },
    ]

    for (const testCase of testCases) {
      const testLineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Test Item - ${testCase.locale.toUpperCase()}`,
              images: [],
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ]

      try {
        const response = await fetch(`${this.baseUrl}/api/create-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lineItems: testLineItems,
            locale: testCase.locale,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          this.log(
            `CURRENCY_${testCase.locale.toUpperCase()}`,
            "PASS",
            `Currency conversion for ${testCase.locale} locale works`,
            {
              locale: testCase.locale,
              sessionId: data.sessionId,
            },
          )
        } else {
          this.log(
            `CURRENCY_${testCase.locale.toUpperCase()}`,
            "FAIL",
            `Currency conversion failed for ${testCase.locale}`,
            data,
          )
        }
      } catch (error) {
        this.log(
          `CURRENCY_${testCase.locale.toUpperCase()}`,
          "FAIL",
          `Network error for ${testCase.locale}: ${error instanceof Error ? error.message : "Unknown error"}`,
        )
      }
    }
  }

  async testEmptyCart() {
    console.log("\n🛒 Testing Empty Cart Handling...")

    try {
      const response = await fetch(`${this.baseUrl}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems: [],
          locale: "en",
        }),
      })

      const data = await response.json()

      if (!response.ok && data.error) {
        this.log("EMPTY_CART", "PASS", "Empty cart properly rejected", {
          error: data.error,
        })
      } else {
        this.log("EMPTY_CART", "FAIL", "Empty cart should have been rejected", data)
      }
    } catch (error) {
      this.log("EMPTY_CART", "FAIL", `Network error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async runAllTests() {
    console.log("🚀 Starting Square Integration End-to-End Tests...")
    console.log(`Base URL: ${this.baseUrl}`)
    console.log("=" * 60)

    // Test environment setup
    await this.testEnvironmentVariables()

    // Test checkout session creation
    const checkoutData = await this.testCheckoutSessionCreation()

    // Test order tracking with valid order (if we have one)
    if (checkoutData?.orderId) {
      await this.testOrderTracking(checkoutData.orderId)
    }

    // Test invalid order tracking
    await this.testInvalidOrderTracking()

    // Test currency conversion
    await this.testCurrencyConversion()

    // Test empty cart handling
    await this.testEmptyCart()

    // Print summary
    this.printSummary()
  }

  private printSummary() {
    console.log("\n" + "=" * 60)
    console.log("📊 TEST SUMMARY")
    console.log("=" * 60)

    const passed = this.results.filter((r) => r.status === "PASS").length
    const failed = this.results.filter((r) => r.status === "FAIL").length
    const skipped = this.results.filter((r) => r.status === "SKIP").length

    console.log(`✅ Passed: ${passed}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`⏭️  Skipped: ${skipped}`)
    console.log(`📈 Total: ${this.results.length}`)

    if (failed > 0) {
      console.log("\n❌ FAILED TESTS:")
      this.results.filter((r) => r.status === "FAIL").forEach((r) => console.log(`   - ${r.step}: ${r.message}`))
    }

    console.log(
      "\n" + (failed === 0 ? "🎉 All tests passed!" : "⚠️  Some tests failed. Please review the results above."),
    )
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new SquareIntegrationTester()
  tester.runAllTests().catch(console.error)
}

export { SquareIntegrationTester }
