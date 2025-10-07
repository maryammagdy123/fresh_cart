"use client"


import { Product } from "@/Interfaces"

import { addToWishlist, getWishlist, removeFromWishlist } from "@/services/api"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import ProductGridCard from "./ProductGridCard"
import ProductListCard from "./ProductListCard"






interface ProductCardProps {
	viewMode?: "grid" | "list",
	product: Product

}

export default function ProductCard({ viewMode = "grid", product }: ProductCardProps) {

	const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
	const [isAddingToWishList, setIsAddingToWishList] = useState<boolean>(false);
	const { status } = useSession()

	async function handleToggleWishlist() {
		if (status !== "authenticated") {
			toast.error("You must be logged in to add items to the wishlist.")
			return
		}
		try {
			setIsAddingToWishList(true);
			const successMsg = isInWishlist ? "Removed from wishlist" : "Added to wishlist";
			const errorMsg = isInWishlist ? "Failed to remove from wishlist" : "Failed to add to wishlist";
			const actionFn = isInWishlist ? removeFromWishlist : addToWishlist;
			const data = await actionFn(product._id);

			if (data.status === "success") {
				setIsInWishlist(!isInWishlist);
				toast.success(successMsg);
				setIsAddingToWishList(false);
			} else {
				toast.error(errorMsg);
			}
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong");
		} finally { setIsAddingToWishList(false); }
	}


	useEffect(() => {

		if (status !== "authenticated") return;

		const checkWishlistStatus = async () => {
			try {
				const wishlist = await getWishlist();
				setIsInWishlist(
					wishlist.data?.some((item: Product) => item._id === product._id)
				);
			} catch (err) {
				console.error(err);
			}
		};

		checkWishlistStatus();
	}, [product._id, status]);

	return (
		<section>
			{viewMode === "grid" ? (
				// 🔹 Grid view mode
				<ProductGridCard product={product} />
			) : (
				//  list viewmode
				<ProductListCard product={product} />
			)}
		</section>
	)
}
