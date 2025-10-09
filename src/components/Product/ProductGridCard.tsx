import { Product } from '@/Interfaces'
import Image from 'next/image'
import React from 'react'
import { useWishlist } from '@/Hooks/useWishlist'
import Link from 'next/link'
import { renderStars } from '@/helpers/rating'
import AddToCartBtn from '../Cart/AddToCartBtn'
import WishListButton from '../Wishlist/WishListButton'
interface ProductGridCardProps {
	product: Product
}
function ProductGridCard({ product }: ProductGridCardProps) {
	const { isInWishlist, isLoading, toggleWishlist } = useWishlist(product._id);
	return (
		<div className="relative border rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition  h-full">
			{/* product image */}
			<div className="relative w-full h-48 mb-4 bg-gray-100 rounded-lg ">
				<Image src={product.imageCover ?? ""}
					alt={product.title}
					fill
					className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 h-full"
					sizes="(max-width:766px) 100vw, (max-width:1200px) 50vw ,25vw"
					loading="lazy" />

				{/* ADD TO WISHLIST BUTTON */}
				<div className="absolute top-2 right-2 md:right-2 md:bottom-2 ">
					<WishListButton
						isInWishlist={isInWishlist}
						isLoading={isLoading}
						onClick={toggleWishlist}
					/>
				</div>
			</div>

			{/* title + brand */}
			<Link href={`/brands/${product.brand._id}`}>
				<span className="text-md text-gray-600 hover:underline hover:text-blue-700">{product.brand.name}</span>
			</Link>
			<Link href={`/products/${product.id}`}>
				<h2 className="text-lg font-semibold ">
					{product.title.length > 15 ? product.title.slice(0, 10) + "..." : product.title}
				</h2>
			</Link>
			{/* stars + category */}
			<div className="flex flex-col  justify-between text-sm text-gray-500 mb-1">
				<div className="flex  gap-1">
					{renderStars(product.ratingsAverage)}
					<span>
						({product.ratingsQuantity})
					</span>
				</div>
				<Link href="#">
					<span className="text-md text-gray-600 hover:underline hover:text-blue-700">{product.category.name}</span>
				</Link>
			</div>

			{/* price + sold quantity */}
			<div className="flex gap-4 justify-between mb-4">
				<p className="text-gray-800 font-medium">EGP{product.price}</p>
				<span className="text-gray-500 text-sm">
					{product.sold ? product.sold.toString().slice(0, 4) : 0} sold
				</span>
			</div>

			{/* popular badge for most sold product */}
			{
				product.sold > 100 && (
					<div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">Popular</div>
				)
			}


			{/* actions */}

			<AddToCartBtn productId={product._id} productQuantity={product.quantity} />

		</div>
	)
}
export default React.memo(ProductGridCard)