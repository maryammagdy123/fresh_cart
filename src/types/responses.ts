import { UpdateWishListResponse } from '@/Interfaces/wishlist';
import { Subcategory } from './../Interfaces/category';

import { ApiResponse, Brand, Category, Product } from '@/Interfaces';


export type ProductResponse = ApiResponse<Product>
export type CategoryResponse = ApiResponse<Category>
export type BrandResponse = ApiResponse<Brand>
export type SubcategoryResponse = ApiResponse<Subcategory>
export type AddToWishListResponse = UpdateWishListResponse;
export type RemoveFromWishListResponse = UpdateWishListResponse;




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
export type SingleSubcategoryResponse = {
	data: Subcategory;
}