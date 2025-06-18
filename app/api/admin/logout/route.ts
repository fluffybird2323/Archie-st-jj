import { type NextRequest, NextResponse } from "next/server"
import { logoutAdmin } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("admin_token")?.value

    if (token) {
      await logoutAdmin(token)
    }

    // Clear the cookie
    cookieStore.delete("admin_token")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
