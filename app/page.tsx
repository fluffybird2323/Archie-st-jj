"use client"

import { verifyAdminToken } from "../lib/auth"

export default function SyntheticV0PageForDeployment() {
  return <verifyAdminToken />
}