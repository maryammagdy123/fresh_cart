import { Brand } from "@/Interfaces"
import { apiServices } from "@/services/api"
import { BrandResponse } from "@/types"
import Image from "next/image"
import Link from "next/link"

export default async function BrandsPage() {

	const data: BrandResponse = await apiServices.getAllBrands()
	const brands: Brand[] = data.data

	return (
		<section className="container mx-auto px-6 py-8">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-4xl font-bold mb-2">Browse Brands</h1>
				<p className="text-gray-600">Discover all your favorite brands</p>
			</div>

			{/* Brands grid */}
			<div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{brands.map((brand) => (
					<Link href={`/brands/${brand._id}`} key={brand._id}>
						<div
							key={brand._id}
							className="border rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center justify-center p-4 bg-white"
						>
							{/* Brand image */}
							<div className="relative w-[150px] h-[150px] mb-3">
								<Image
									src={brand.image}
									alt={brand.name}
									fill
									className="object-contain p-6 "
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
								/>
							</div>
							{/* Brand name */}

						</div>
					</Link>
				))}
			</div>
		</section >
	)
}
