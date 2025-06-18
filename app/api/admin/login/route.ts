import { type NextRequest, NextResponse } from "next/server"
import { loginAdmin } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    console.log("API: Login endpoint hit")

    const body = await request.json()
    const { email, password } = body

    console.log("API: Login attempt for:", email)

    if (!email || !password) {
      console.error("API: Email and password are required")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log("API: Calling loginAdmin function")
    const result = await loginAdmin(email, password)

    console.log("API: Login result:", { success: result.success, error: result.error })

    if (!result.success) {
      console.error("API: Login failed for", email, "Error:", result.error)
      return NextResponse.json({ error: result.error || "Invalid credentials" }, { status: 401 })
    }

    // Set secure HTTP-only cookie
    const cookieStore = cookies()
    cookieStore.set("admin_token", result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    })

    console.log("API: Admin token cookie set successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API: Login API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Add a GET handler for debugging
export async function GET() {
  return NextResponse.json({
    message: "Admin login API endpoint is working",
    timestamp: new Date().toISOString(),
  })
}
