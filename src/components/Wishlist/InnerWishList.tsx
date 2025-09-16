"use client"
import { WishListResponse } from '@/Interfaces'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import RemoveFromWishlistBtn from './RemoveFromWishlistBtn'
import { WishlistContext } from '@/Context/WishListContext'
import { apiServices } from '@/services/api'
import toast from 'react-hot-toast'
import EmptyWishlist from './EmptyWishList'
import { Button } from '../ui/button'
import { cartContext } from '@/Context/CartContext'
import { useRouter } from 'next/navigation'
import AddToCartBtn from '../Cart/AddToCartBtn'

interface InnerWishListProps {
	wishListProducts: WishListResponse
}
export default function InnerWishList({ wishListProducts }: InnerWishListProps) {
	const router = useRouter()
	const [wishlist, setWislist] = useState<WishListResponse>(wishListProducts)
	const [addToCartLoader, setAddToCartLoader] = useState(false)
	const { setCartCount } = useContext(cartContext)
	const { setWishlistCount } = useContext(WishlistContext)


	// delete item from wishlist
	async function handleRemoveFromWishList(productId: string, setIsDelete: (value: boolean) => void) {
		setIsDelete(true)
		const data = await apiServices.removeFromWishlist(productId)
		if (data.status === "success") {
			toast.success("Item removed successfully!!")
		}
		setIsDelete(false)
		const newWishlistResponseData = await apiServices.getWishlist()
		setWislist(newWishlistResponseData)
	}


	useEffect(() => {
		setWishlistCount(wishlist.count)
	}, [wishlist])

	return (
		<main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">
			{/* Header */}
			<header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
				{
					wishlist.count > 0 && <>
						<h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
						<span className="text-gray-600">
							{wishlist.count} {wishlist.count === 1 ? "item" : "items"}
						</span></>
				}
			</header>

			{/* Items List */}
			{wishlist.count === 0 ? (
				<EmptyWishlist />
			) : (
				<ul className="space-y-4">
					{wishlist.data.map((item) => (
						<li
							key={item._id}
							className="
                flex flex-col sm:flex-row
                gap-4 sm:gap-6
                rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md
              "
						>
							{/* Image */}
							<div className="relative w-full sm:w-40 h-48 sm:h-32 rounded-lg overflow-hidden shrink-0">
								<Image
									src={item.imageCover}
									alt={item.title}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 200px"
									className="object-cover transition group-hover:scale-105"
								/>
							</div>

							{/* Content */}
							<div className="flex flex-1 flex-col justify-between">
								<div>
									<h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
										{item.title}
									</h2>
									<p className="text-gray-600 mb-2">${item.price}</p>
								</div>

								{/* Action Button */}
								<div className='space-x-2.5'>
									<AddToCartBtn productId={item._id} />

									<RemoveFromWishlistBtn id={item._id} handleRemoveFromWishList={handleRemoveFromWishList} />
								</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</main>
	)
}
