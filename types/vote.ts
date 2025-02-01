export interface VoteItem {
  id: string
  content: string
  upvotes: number
  downvotes: number
}

export type Person = {
  id: string
  name: string
  image: string
  votes: number
  category_id: string
}

export type VoteState = string | null

export type ThemeMode = "light" | "dark"

export type Category = {
  id: string
  name: string
  nameEn?: string
  participants: string[]
}

// Single CATEGORIES definition with both English and Arabic names
export const CATEGORIES = [
  {
    id: "cat1",
    name: "Creators",
    nameEn: "Creators",
    participants: [
      "سارة حيـون",
      "نـبـيـل الـحـمـوتـي",
      "فـوزيـة كـريـشـو",
      "حسين ترك"
    ]
  },
  {
    id: "cat2",
    name: "Sports Field",
    nameEn: "Athletes",
    participants: [
      "منعم العبوضي",
      "فهيم دراز & عبد الوهاب الخميري",
      "محمد بنعمر",
      "محمد قرقاش"
    ]
  },
  {
    id: "cat3",
    name: "organizations",
    nameEn: "organizations",
    participants: [
      "مريم بوعسيلة",
      "شباب غيث",
      "أشرف بلحيان",
      "وليد الحدادي"
    ]
  }
] as const