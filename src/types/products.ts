export interface ProductRequestType {
  name: string
  slug: string
  description: string
  price: number
  quantity: number
  images?: string[]
  color?: string[]
  category: string
  brand: string
  soldUnits: number
  ratings: number
}