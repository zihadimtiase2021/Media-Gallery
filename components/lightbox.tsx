"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import type { MediaItem } from "@/lib/gallery-data"

interface LightboxProps {
  items: MediaItem[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const item = items[index]

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + items.length) % items.length)
  }, [index, items.length, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((index + 1) % items.length)
  }, [index, items.length, onNavigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose, goPrev, goNext])

  if (!item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex flex-col bg-foreground/95 backdrop-blur-sm"
    >
      <header className="flex items-center justify-between px-4 py-4 md:px-8">
        <div className="text-background">
          <p className="font-heading text-lg leading-tight md:text-xl">
            {item.title}
          </p>
          <p className="text-xs text-background/60">
            {item.location} — {item.year}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="rounded-full p-2 text-background/80 transition-colors hover:bg-background/10 hover:text-background"
        >
          <X className="size-6" />
        </button>
      </header>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 md:px-16">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous item"
          className="absolute left-2 z-10 rounded-full p-2 text-background/70 transition-colors hover:bg-background/10 hover:text-background md:left-6"
        >
          <ChevronLeft className="size-7 md:size-9" />
        </button>

        <figure className="relative flex max-h-full max-w-full items-center justify-center">
          <div className="relative max-h-[78vh] max-w-[86vw]">
            <Image
              src={item.src || "/placeholder.svg"}
              alt={item.title}
              width={1200}
              height={1200}
              className="max-h-[78vh] w-auto rounded-sm object-contain"
              priority
            />
            {item.type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-background/85 text-foreground">
                  <Play className="ml-1 size-7 fill-current" />
                </span>
              </span>
            )}
          </div>
        </figure>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next item"
          className="absolute right-2 z-10 rounded-full p-2 text-background/70 transition-colors hover:bg-background/10 hover:text-background md:right-6"
        >
          <ChevronRight className="size-7 md:size-9" />
        </button>
      </div>

      <footer className="px-4 pb-5 text-center text-xs uppercase tracking-[0.2em] text-background/50">
        {index + 1} / {items.length} — {item.category}
      </footer>
    </div>
  )
}
