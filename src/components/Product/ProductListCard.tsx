import { Product } from '@/Interfaces'
import Image from 'next/image'
import React from 'react'

import Link from 'next/link'
import { renderStars } from '@/helpers/rating'
import AddToCartBtn from '../Cart/AddToCartBtn'
import { useWishlist } from '@/Hooks/useWishlist'
import WishListButton from '../Wishlist/WishListButton'
interface ProductListCardProps {
	product: Product
}
function ProductListCard({ product }: ProductListCardProps) {
	const { isInWishlist, isLoading, toggleWishlist } = useWishlist(product._id);
	return (
		<div className="relative border rounded-2xl shadow-md p-4 flex md:flex-row flex-col items-center gap-6 hover:shadow-lg transition w-full overflow-hidden">

			{/* product image */}
			<div className="relative w-32 h-32 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
				<Image src={product.imageCover}
					alt={product.title}
					fill
					className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
					sizes="(max-width:766px) 100vw, (max-width:1200px) 50vw ,25vw" />

				{/* ADD TO WISHLIST BUTTON */}
				<div className="absolute top-2 right-2 md:right-2 md:bottom-2 ">
					<WishListButton
						isInWishlist={isInWishlist}
						isLoading={isLoading}
						onClick={toggleWishlist}
					/>
				</div>
			</div>

			{/* product details */}
			<div className="flex-1 flex flex-col justify-between">
				{/* brand + title */}
				<div className="mb-2">
					<Link href={`/brands/${product.brand._id}`}>
						<span className="text-md text-gray-600 hover:underline hover:text-blue-700">{product.brand.name}</span>
					</Link>

					<Link href={`/products/${product.id}`}>	<h2 className="text-lg font-semibold line-clamp-2">
						{product.title.length > 15 ? product.title.slice(0, 10) + "..." : product.title}
					</h2>
					</Link>

					<p className="md:line-clamp-1 text-gray-500 text-sm">{product.description}</p>
				</div>

				{/* rating + sold + category */}
				<div className=" flex flex-col md:flex-row md:items-center md:justify-between mb-2">
					<div className=" flex gap-1">
						{renderStars(product.ratingsAverage)}
						<span className=" text-sm text-gray-500 ">
							({product.ratingsQuantity})
						</span>

					</div>
					<span className="text-gray-500 text-sm">
						{product.sold ? product.sold.toString().slice(0, 4) : 0} sold
					</span>
				</div>
				<Link href="#">
					<span className="text-sm text-gray-600 hover:underline hover:text-blue-700">{product.category.name}</span>
				</Link>

				{/* price + button */}
				<div className="flex items-center justify-between mt-3">
					<p className="text-lg font-semibold text-gray-800">EGP{product.price}</p>
					{/* actions */}
					<AddToCartBtn productId={product._id} productQuantity={product.quantity} />


				</div>
			</div>

			{/* badge for popular */}
			{product.sold > 100 && (
				<div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
					Popular
				</div>
			)}
		</div>
	)
}
export default React.memo(ProductListCard)