"use client";

import React, { useEffect, useState } from "react";
import { Grid2x2 } from "lucide-react";
import { getAllCategories } from "@/services/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CategoryResponse } from "@/types";
import { Category } from "@/Interfaces";
import Link from "next/link";



export default function BrowsCategory() {
	const [categories, setCategories] = useState<Category[]>([]);


	useEffect(() => {
		const fetchData = async () => {
			const catRes: CategoryResponse = await getAllCategories();


			setCategories(catRes.data);

		};

		fetchData();
	}, []);

	return (
		<div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">


			{/* Main Content */}
			<main className="md:col-span-3">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h2 className="text-2xl font-bold">Browse by Category</h2>
						<p className="text-gray-500 text-sm">
							Select a category to view its subcategories and products.
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm">
							Sort: Popular
						</Button>
						<Button variant="outline" size="sm">
							<Grid2x2 className="h-4 w-4 mr-1" />
							Grid View
						</Button>
					</div>
				</div>

				{/* Category Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{categories.map((cat) => (
						<Link href={`/categories/${cat._id}`} key={cat._id}>
							<div

								className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100 p-4 flex flex-col items-center text-center"
							>
								<div className="relative h-24 w-24 mb-3">
									<Image
										src={cat.image}
										alt={cat.name}
										fill
										className="rounded-xl object-cover"
									/>
								</div>
								<h4 className="font-medium text-base">{cat.name}</h4>
							</div>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}
