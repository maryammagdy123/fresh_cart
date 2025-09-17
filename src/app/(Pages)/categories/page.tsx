import BrowsCategory from "@/components/Category/BrowsCategory";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Category } from "@/Interfaces";
import { getAllCategories } from "@/services/api";
import { CategoryResponse } from "@/types";
import { Grid2x2 } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";


export const metadata: Metadata = {
	title: "Browse Categories",
	description: "Explore all product categories and subcategories.",
};

export default async function BrowseByCategory() {

	const catRes: CategoryResponse = await getAllCategories();
	const categories: Category[] = catRes.data
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<div className="container mx-auto p-6 grid grid-cols-1  gap-6">


				{/* Main Content */}
				<main>
					<div className="flex justify-between items-center mb-6">
						<div>
							<h2 className="text-2xl font-bold">Browse by Category</h2>
							<p className="text-gray-500 text-sm">
								Select a category to view its subcategories and products.
							</p>
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
		</Suspense>
	);
}
