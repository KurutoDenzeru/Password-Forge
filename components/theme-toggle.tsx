"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // Use a fallback so it matches server side initially
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-9 w-[150px] bg-muted animate-pulse rounded-lg" />
  }

  return (
    <Tabs value={theme} onValueChange={(val) => setTheme(val)}>
      <TabsList className="grid w-full grid-cols-2 h-9 items-center justify-center p-1">
        <TabsTrigger value="light" className="px-3" aria-label="Light mode">
          <Sun className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="dark" className="px-3" aria-label="Dark mode">
          <Moon className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
