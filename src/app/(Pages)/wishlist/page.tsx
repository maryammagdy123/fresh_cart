import Image from "next/image";
import { apiServices } from "../../../services/api";
import { Button } from "@/components/ui/button";
import EmptyWishlist from "@/components/Wishlist/EmptyWishList";

export default async function Page() {
	const wishlistRes = await apiServices.getWishlist();
	const wishListProducts = wishlistRes.data;

	if (wishListProducts.length == 0) {
		return <EmptyWishlist />
	}
	return (
		<main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">
			{/* Header */}
			<header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
				<h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
				<span className="text-gray-600">
					{wishlistRes.count} {wishlistRes.count === 1 ? "item" : "items"}
				</span>
			</header>

			{/* Items List */}
			{wishlistRes.count === 0 ? (
				<p className="text-center text-gray-500">Your wishlist is empty 🖤</p>
			) : (
				<ul className="space-y-4">
					{wishListProducts.map((item) => (
						<li
							key={item._id}
							className="
                flex flex-col sm:flex-row
                gap-4 sm:gap-6
                rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md
              "
						>
							{/* Image */}
							<div className="relative w-full sm:w-40 h-48 sm:h-32 rounded-lg overflow-hidden shrink-0">
								<Image
									src={item.imageCover}
									alt={item.title}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 200px"
									className="object-cover transition group-hover:scale-105"
								/>
							</div>

							{/* Content */}
							<div className="flex flex-1 flex-col justify-between">
								<div>
									<h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
										{item.title}
									</h2>
									<p className="text-gray-600 mb-2">${item.price}</p>
								</div>

								{/* Action Button */}
								<div>
									<Button className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
										Remove
									</Button>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
