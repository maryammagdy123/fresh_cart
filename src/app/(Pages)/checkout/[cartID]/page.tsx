"use client"
import CheckoutForm from '@/components/Form/CheckoutForm'
import { useParams } from 'next/navigation'
import React from 'react'


export default function CheckOut() {
	const { cartID } = useParams<{ cartID: string }>()
	console.log(cartID)
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
				{/* Header */}
				<h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
					Complete Order check out
				</h1>
				<CheckoutForm cartID={cartID} />
			</div>
		</div>

	)
}
