export interface Category {
	_id: string
	name: string
	slug: string
	image: string
}
export interface Subcategory {
	_id: string
	name: string
	slug: string
	category: string
}