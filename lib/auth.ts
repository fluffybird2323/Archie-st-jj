export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  is_active: boolean
}

// Simple password verification (since we're using pre-hashed passwords)
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // For the demo passwords, we'll do simple comparison
  // In production, you'd use bcrypt.compare()

  // Known test passwords and their hashes
  const knownPasswords: Record<string, string> = {
    admin123: "$2b$10$rQZ8qVZ8qVZ8qVZ8qVZ8qOqVZ8qVZ8qVZ8qVZ8qVZ8qVZ8qVZ8qVZ8",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
  }

  // Check if it's one of our known test passwords
  if (knownPasswords[password] === hash) {
    return true
  }

  // For production, uncomment this and install bcryptjs:
  // const bcrypt = require('bcryptjs')
  // return bcrypt.compare(password, hash)

  return false
}

// Login admin user (simplified for localStorage)
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    // In this simplified version, we're just checking against hardcoded values
    // In a real app, you'd fetch user from DB and compare hashed passwords
    if (email === "admin@artiestudio.org" && password === "admin123") {
      return { success: true }
    }

    return { success: false, error: "Invalid credentials" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Login failed" }
  }
}

// These functions are no longer used with localStorage-based auth
// but kept for reference if you decide to re-implement server-side sessions.
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  return null // Not used with localStorage auth
}

export async function logoutAdmin(token: string): Promise<void> {
  // Not used with localStorage auth
}

export async function requireAdmin(): Promise<AdminUser> {
  throw new Error("Unauthorized - not used with localStorage auth")
}
