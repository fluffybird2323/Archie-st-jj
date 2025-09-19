// Unified Design System for ARTIE
// This file contains all the standardized design tokens and utility classes

export const designSystem = {
  // Typography Scale
  typography: {
    // Headings
    h1: "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight",
    h2: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
    h3: "text-2xl md:text-3xl font-bold tracking-tight",
    h4: "text-xl md:text-2xl font-semibold",
    h5: "text-lg md:text-xl font-semibold",
    h6: "text-base md:text-lg font-semibold",

    // Body text
    body: "text-base font-normal",
    bodyLarge: "text-lg font-normal",
    bodySmall: "text-sm font-normal",

    // Special text
    lead: "text-lg md:text-xl text-gray-600",
    caption: "text-sm text-gray-500",
    label: "text-sm font-medium text-gray-700",
  },

  // Color System
  colors: {
    // Primary palette
    primary: "black",
    primaryHover: "gray-800",
    secondary: "white",
    secondaryHover: "gray-50",

    // Text colors
    textPrimary: "text-black",
    textSecondary: "text-gray-600",
    textMuted: "text-gray-500",

    // Background colors
    bgPrimary: "bg-white",
    bgSecondary: "bg-gray-50",
    bgAccent: "bg-black",
  },

  // Spacing System
  spacing: {
    // Page padding
    page: "px-4 md:px-6 lg:px-8",

    // Section spacing
    sectionY: "py-16 md:py-20 lg:py-24",
    sectionX: "px-4 md:px-6",

    // Component spacing
    componentY: "py-8 md:py-12",
    componentX: "px-6 md:px-8",

    // Content spacing
    contentGap: "space-y-6",
    itemGap: "space-y-4",
  },

  // Layout System
  layout: {
    // Container widths
    container: "max-w-7xl mx-auto",
    containerNarrow: "max-w-4xl mx-auto",
    containerWide: "max-w-[1400px] mx-auto",

    // Grid systems
    grid2: "grid grid-cols-1 md:grid-cols-2 gap-8",
    grid3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
    grid4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  },

  // Component Styles
  components: {
    // Buttons
    buttonPrimary: "bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105",
    buttonSecondary: "bg-white text-black border-2 border-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-200",
    buttonGhost: "text-black hover:text-gray-600 px-4 py-2 font-medium transition-colors",

    // Cards
    card: "bg-white rounded-2xl p-8 shadow-sm border border-gray-100",
    cardHover: "bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200",

    // Forms
    input: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent",
    textarea: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none",

    // Badges
    badge: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800",
    badgePrimary: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black text-white",
  },

  // Animation Classes
  animations: {
    fadeIn: "animate-fade-in",
    scaleIn: "animate-scale-in",
    slideUp: "animate-slide-up",
    pulse: "animate-pulse",
  },

  // Border Radius
  radius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
  },

  // Shadows
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    inner: "shadow-inner",
  }
}

// Utility function to combine classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}
