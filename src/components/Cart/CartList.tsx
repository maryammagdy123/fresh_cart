"use client"
import { Minus, Plus, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { CartProduct, GetCartResponse, Product } from '@/Interfaces/cart'
import Image from 'next/image'
import { apiServices } from '@/services/api'
import toast from 'react-hot-toast'

interface CartListProps {
	cartItem: CartProduct<Product>
}
export default function CartList({ cartItem }: CartListProps) {

	async function handleDeleteCartItem() {
		const data = await apiServices.deleteCartItem(String(cartItem.product._id))
		if (data.status === "success") {
			toast.success("Item removed successfully!!")
		}
	}
	async function getCart() {
		const data: GetCartResponse = await apiServices.getUserCart()
	}
	useEffect(() => { getCart() }, [])
	return (
		<div

			className="flex gap-4 p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
		>
			{/* product image */}
			<div className="relative w-28 h-28 shrink-0">
				<Image
					src={cartItem.product.imageCover || "/placeholder.png"}
					alt={cartItem.product._id}
					fill
					className="object-cover rounded-xl"
				/>
			</div>

			{/* product info */}
			<div className="flex-1 flex flex-col justify-between">
				<div>
					<h2 className="font-semibold text-lg">{cartItem.product.title}</h2>
					<p className="text-sm text-gray-500">{cartItem.product.brand.name}</p>
					<p className="text-primary font-bold mt-1">
						${cartItem.price}
					</p>
				</div>

				{/* quantity controls */}
				<div className="flex items-center gap-3 mt-3">
					<Button
						variant="outline"
						size="icon"

					>
						<Minus className="h-4 w-4" />
					</Button>
					<span className="w-6 text-center">{cartItem.count}</span>
					<Button
						variant="outline"
						size="icon"

					>
						<Plus className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* right side: total + remove */}
			<div className="flex flex-col justify-between items-end">
				<p className="font-semibold">${cartItem.count * cartItem.price}</p>
				<Button
					onClick={handleDeleteCartItem}
					variant="destructive"
					size="icon"

				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</div>
	)
}
