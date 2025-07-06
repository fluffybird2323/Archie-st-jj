"use client"

/**
 * Simple ARCHIE logo component.
 * Feel free to swap the SVG, font, or styling to match your branding.
 */
export function Logo({ className = "" }: { className?: string }) {
  return <span className={`inline-block font-black text-2xl tracking-tight ${className}`}>ARTIE</span>
}
