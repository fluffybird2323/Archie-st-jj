import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = cookies()

    // Clear the admin token cookie
    cookieStore.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
      path: "/",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
