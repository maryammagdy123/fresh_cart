import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/services/api";
import { useSession } from "next-auth/react";
import { Product } from "@/Interfaces";

export function useWishlist(productId: string) {
	const [isInWishlist, setIsInWishlist] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { status } = useSession();

	async function toggleWishlist() {
		if (status !== "authenticated") {
			toast.error("You must be logged in to add items to the wishlist.");
			return;
		}

		try {
			setIsLoading(true);
			const action = isInWishlist ? removeFromWishlist : addToWishlist;
			const res = await action(productId);

			if (res.status === "success") {
				setIsInWishlist(!isInWishlist);
				toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
			} else {
				toast.error("Action failed");
			}
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		async function checkWishlist() {
			try {
				const wishlist = await getWishlist();
				setIsInWishlist(
					wishlist.data?.some((item: Product) => item._id === productId)
				);
			} catch (err) {
				console.error(err);
			}
		}
		checkWishlist();
	}, [productId]);

	return { isInWishlist, isLoading, toggleWishlist };
}

