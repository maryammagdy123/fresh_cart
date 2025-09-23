import EmptyOrders from '@/components/Orders/EmptyOrders'
import { Button } from '@/components/ui/button'
import { userId } from '@/helpers/getUserToken'

import { UserOrderResponse } from '@/Interfaces/order'
import { getUserOrders } from '@/services/api'
import Image from 'next/image'
import React from 'react'

export default async function page() {
	const userID = await userId()
	const orderRes: UserOrderResponse = await getUserOrders(userID)
	const orders = orderRes
	if (!orders) {
		return <EmptyOrders />
	}

	return (
		<div>
			{
				orders.cartItems?.length > 0 ? <div className="container mx-auto p-6">
					<h1 className="text-2xl font-bold mb-6">My Orders</h1>

					<div className="space-y-4">
						{orders.cartItems?.map(order => (
							<div key={order._id}
								className="border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition">
								{/* Order Info */}
								<div>
									<p className="text-sm text-gray-500">Order #{order._id}</p>
									<p className="text-lg font-semibold">Total: ${orders.totalOrderPrice}</p>
									<p className="text-sm text-gray-400">{orders.createdAt}</p>
									<span
										className={`inline-block mt-1 px-3 py-1 text-xs rounded-full 
              ${orders.isDelivered === true ? 'bg-green-100 text-green-700' :

												'bg-gray-100 text-gray-700'}`}
									>
										{orders.isPaid}
									</span>
								</div>

								{/* Products Preview */}
								<div className="flex items-center gap-2">
									{orders.cartItems.slice(0, 3).map(item => (
										<Image key={item._id} src={item.product.imageCover ?? ""}
											className="w-12 h-12 rounded-md object-cover border" fill width={400} height={400} alt={item.product.title} />

									))}
									{orders.cartItems.length > 3 &&
										<span className="text-xs text-gray-500">+{orders.cartItems.length - 3} more</span>}
								</div>

								{/* View Button */}
								<Button
									className="ml-4 px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800">
									View Details
								</Button>
							</div>
						))}
					</div>
				</div> : <EmptyOrders />
			}


		</div>
	)
}
