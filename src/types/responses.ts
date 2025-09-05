
import { ApiResponse, Brand, Category, Product } from '@/Interfaces';


export type ProductResponse = ApiResponse<Product>
export type CategoryResponse = ApiResponse<Category>
export type BrandResponse = ApiResponse<Brand>



// get specific [product , category , brand]
export type SingleProductResponse = {
	data: Product;
}
export type SingleCategoryResponse = {
	data: Category;
}
export type SingleBrandResponse = {
	data: Brand;
}