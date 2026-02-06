'use client'

import { useEffect } from "react"

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

const isPosthogEnabled =
  process.env.NEXT_PUBLIC_POSTHOG_KEY &&
  (process.env.NEXT_PUBLIC_POSTHOG_ENABLED === "true" ||
    process.env.NODE_ENV === "production")

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!isPosthogEnabled) return
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: "/ingest",
      defaults: '2025-11-30'
    })
  }, [])

  if (!isPosthogEnabled) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      {children}
    </PHProvider>
  )
}
