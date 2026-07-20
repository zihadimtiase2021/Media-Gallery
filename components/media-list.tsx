"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import type { MediaItem } from "@/lib/gallery-data"

interface MediaListProps {
  items: MediaItem[]
  onItemClick: (index: number) => void
}

export function MediaList({ items, onItemClick }: MediaListProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onItemClick(index)}
          className="group flex w-full gap-4 rounded-lg border border-border bg-card p-3 transition-all hover:border-accent hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={item.src || "/placeholder.svg"}
              alt={item.title}
              width={80}
              height={80}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {item.type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/10">
                <Play className="size-4 fill-accent text-accent" />
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-center gap-1 text-left">
            <h3 className="font-heading text-sm font-semibold leading-tight text-foreground group-hover:text-accent">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {item.location} — {item.year}
            </p>
            <p className="text-xs font-medium text-accent/80">
              {item.category}
            </p>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            {item.type === "video" ? "Video" : "Photo"}
          </div>
        </button>
      ))}
    </div>
  )
}
