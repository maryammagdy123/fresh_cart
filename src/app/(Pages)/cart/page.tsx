"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"

export default function page() {



	return (
		<section className="p-6 max-w-6xl mx-auto">
			<h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

			<div className="grid lg:grid-cols-3 gap-8">
				{/* products list */}
				<div className="lg:col-span-2 space-y-4">

					<div
						// key={item.id}
						className="flex gap-4 p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
					>
						{/* product image */}
						<div className="relative w-28 h-28 shrink-0">
							{/* <Image
									src={item.image}
									alt={item.title}
									fill
									className="object-cover rounded-xl"
								/> */}
						</div>

						{/* product info */}
						<div className="flex-1 flex flex-col justify-between">
							<div>
								<h2 className="font-semibold text-lg">item.title</h2>
								<p className="text-sm text-gray-500">item.category</p>
								<p className="text-primary font-bold mt-1">$item price</p>
							</div>

							{/* quantity controls */}
							<div className="flex items-center gap-3 mt-3">
								<Button
									variant="outline"
									size="icon"

								>
									<Minus className="h-4 w-4" />
								</Button>
								<span className="w-6 text-center">item.qty</span>
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
							<p className="font-semibold">$item.price * item.qty</p>
							<Button
								variant="destructive"
								size="icon"

							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					</div>

				</div>

				{/* summary box */}
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
			</div>
		</section>
	)
}
