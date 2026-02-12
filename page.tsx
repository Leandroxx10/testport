"use client"

import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    // Redirect to static HTML file
    window.location.href = "/index.html"
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <span className="text-[#10b981] text-4xl font-mono">Loading...</span>
        </div>
      </div>
    </div>
  )
}
