import { cookies } from "next/headers"

export interface AdminTokenPayload {
  userId: string
  role: string
  exp: number
}

export async function verifyAdminToken(): Promise<AdminTokenPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin-token")?.value

    if (!token) {
      return null
    }

    // In a real implementation, you would verify the JWT token here
    // For now, we'll do a basic check
    if (token === "admin-demo-token") {
      return {
        userId: "admin-user",
        role: "admin",
        exp: Date.now() + 3600000, // 1 hour from now
      }
    }

    // You could also implement JWT verification here:
    // const decoded = jwt.verify(token, process.env.JWT_SECRET) as AdminTokenPayload
    // return decoded

    return null
  } catch (error) {
    console.error("Error verifying admin token:", error)
    return null
  }
}

export function isTokenExpired(payload: AdminTokenPayload): boolean {
  return Date.now() > payload.exp
}

export function hasAdminRole(payload: AdminTokenPayload): boolean {
  return payload.role === "admin" || payload.role === "super-admin"
}
