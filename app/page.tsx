"use client"

import { useEffect, useState } from "react"
import { Clock } from "@/components/clock"
import { ThemeToggle } from "@/components/theme-toggle"

export default function TimezonesDashboard() {
  const [mounted, setMounted] = useState(false)

  // Only show the clock after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-background">
      {/* Theme toggle in the top right corner */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Clock centered on the page */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4">
          {mounted ? <Clock /> : <div className="h-24 w-64 animate-pulse rounded-md bg-muted" />}
        </div>
      </div>
    </div>
  )
}

