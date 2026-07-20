"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import type { MediaItem } from "@/lib/gallery-data"

interface GalleryTileProps {
  item: MediaItem
  onOpen: () => void
}

export function GalleryTile({ item, onOpen }: GalleryTileProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${item.title}`}
      className="group relative mb-4 block w-full overflow-hidden rounded-lg bg-muted shadow-sm transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Image
        src={item.src || "/placeholder.svg"}
        alt={item.title}
        width={800}
        height={Math.round(800 / item.ratio)}
        className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
      />

      {item.type === "video" && (
        <span className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md transition-transform group-hover:scale-110">
          <Play className="ml-0.5 size-5 fill-current" />
        </span>
      )}

      <span className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-heading text-lg leading-tight text-background font-semibold">
          {item.title}
        </span>
        <span className="text-xs text-background/85 mt-1">
          {item.location} — {item.year}
        </span>
      </span>
    </button>
  )
}
