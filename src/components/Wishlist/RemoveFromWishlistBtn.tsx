"use client"
import { useState } from 'react'
import { Button } from '../ui/button'

import React from 'react';
import { Loader2 } from 'lucide-react';
interface RemoveFromWishlistBtnProps {
	id: string
	handleRemoveFromWishList: (productId: string, setIsDelete: (value: boolean) => void) => void
}
export default function RemoveFromWishlistBtn({ id, handleRemoveFromWishList }: RemoveFromWishlistBtnProps) {
	const [isDelete, setIsDelete] = useState(false)

	return (
		<Button onClick={() => handleRemoveFromWishList(id, setIsDelete)} disabled={isDelete} className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
			{
				isDelete && <Loader2 className='animate-spin' />
			}
			Remove
		</Button>
	)
}
