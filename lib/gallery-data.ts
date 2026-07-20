import galleryData from "@/data/gallery.json"

export type MediaCategory =
  | "Landscapes"
  | "Architecture"
  | "Portraits"
  | "Street"

export type MediaType = "photo" | "video"

export interface MediaItem {
  id: string
  title: string
  location: string
  year: number
  category: MediaCategory
  type: MediaType
  src: string
  /** Aspect ratio hint used to size the masonry tile (width / height). */
  ratio: number
}

export const categories: MediaCategory[] =
  galleryData.categories as MediaCategory[]

export const mediaItems: MediaItem[] = galleryData.media as MediaItem[]
