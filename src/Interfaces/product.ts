import { Brand } from "./brand"
import { Category, Subcategory } from "./category"

export interface Product {
	sold: number
	images: string[]
	subcategory: Subcategory[]
	ratingsQuantity: number
	_id: string
	title: string
	slug: string
	description: string
	quantity: number
	price: number
	imageCover: string
	category: Category
	brand: Brand
	ratingsAverage: number
	createdAt: string
	updatedAt: string
	id: string
}





