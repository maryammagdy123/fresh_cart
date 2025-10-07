"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "animate.css"

export default function HomeContainer() {
	const btns = [
		{
			href: "/products",
			label: "Shop Now",
			variant: "default" as const,
		},
		{
			href: "/Categories",
			label: "Browse Categories",
			variant: "outline" as const,
		},
	]
	return (
		<>
			<section className="LandingPage container mx-auto px-4 py-40">
				<div className="text-center space-y-6">
					{/* Title */}
					<h1 className="animate__animated animate__fadeInDown animate__faster text-4xl font-bold tracking-tight lg:text-6xl">
						Welcome to FreshCart
					</h1>

					{/* Subtitle */}
					<p className="animate__animated animate__fadeInUp animate__delay-1s text-gray-400 max-w-2xl mx-auto text-xl">
						Discover the latest technology, fashion and lifestyle products. Quality
						<br />
						guaranteed with fast shipping and excellent customer services
					</p>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center animate__animated animate__fadeInUp animate__delay-2s">
						{btns.map((btn) => {
							const { href, label, variant } = btn
							return (
								<Button
									size="lg"
									variant={variant}
									className="text-lg px-8"
									key={href}
								>
									<Link href={href}>{label}</Link>
								</Button>
							)
						})}
					</div>
				</div>
			</section>
		</>
	)
}
