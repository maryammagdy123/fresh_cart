"use client"
import React from 'react'
import { Button } from '../ui/button'
import { apiServices } from '@/services/api';
import toast from 'react-hot-toast';
interface RemoveFromWishlistBtnProps {
	id: string
}
export default function RemoveFromWishlistBtn({ id }: RemoveFromWishlistBtnProps) {

	async function handleRemoveFromWishList() {
		const data = await apiServices.removeFromWishlist(id);
		if (data.status === "success") {
			toast.success("Removed from wishlist");
		} else {
			toast.error(data.message);
		}
	}
	return (
		<Button onClick={() => handleRemoveFromWishList()} className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
			Remove
		</Button>
	)
}
