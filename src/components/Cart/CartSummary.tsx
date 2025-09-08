import React from 'react'
import { Button } from '../ui/button'

export default function CartSummary() {
	return (
		<aside className="bg-white rounded-2xl shadow-sm border p-6 h-fit">
			<h3 className="text-xl font-semibold mb-4">Order Summary</h3>
			<div className="flex justify-between mb-2 text-gray-600">
				<span>Subtotal</span>
				<span>$subtotal</span>
			</div>
			<div className="flex justify-between mb-2 text-gray-600">
				<span>Shipping</span>
				<span>Free</span>
			</div>
			<div className="flex justify-between text-lg font-bold border-t pt-3">
				<span>Total</span>
				<span>$subtotal</span>
			</div>
			<Button className="w-full mt-6">Checkout</Button>
		</aside>
	)
}
