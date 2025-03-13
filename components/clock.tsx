"use client"

import { useEffect, useState } from "react"

export function Clock() {
  const [time, setTime] = useState<Date>(new Date())
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    // Fetch server time initially
    const fetchServerTime = async () => {
      try {
        const res = await fetch("/api/time")
        if (!res.ok) throw new Error("Failed to fetch time")
        const data = await res.json()
        setTime(new Date(data.time))
        setError(false)
      } catch (err) {
        console.error("Error fetching server time:", err)
        setError(true)
        // Fallback to client time
        setTime(new Date())
      }
    }

    fetchServerTime()

    // Update time every second
    const interval = setInterval(() => {
      setTime((prev) => new Date(prev.getTime() + 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Format time as HH:MM:SS
  const formattedTime = new Intl.DateTimeFormat("default", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(time)

  // Format date
  const formattedDate = new Intl.DateTimeFormat("default", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(time)

  // Get timezone name
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-7xl font-bold tracking-tighter text-foreground sm:text-8xl md:text-9xl">{formattedTime}</div>
      <div className="text-xl text-muted-foreground">{formattedDate}</div>
      <div className="text-sm text-muted-foreground">{timeZone}</div>
      {error && <div className="text-xs text-amber-500">Using local time (server time unavailable)</div>}
    </div>
  )
}

