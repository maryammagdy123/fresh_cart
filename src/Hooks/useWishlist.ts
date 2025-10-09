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

		const prevState = isInWishlist;
		setIsInWishlist(!prevState); // ✅ Optimistic update

		try {
			setIsLoading(true);
			const action = prevState ? removeFromWishlist : addToWishlist;
			const res = await action(productId);

			if (res.status === "success") {
				toast.success(prevState ? "Removed from wishlist" : "Added to wishlist");
			} else {
				setIsInWishlist(prevState);
				toast.error("Action failed");
			}
		} catch (err) {
			console.error(err);
			setIsInWishlist(prevState);
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		async function checkWishlist() {
			const cached = localStorage.getItem("wishlist");
			if (cached) {
				const wishlist = JSON.parse(cached);
				const exists = wishlist.some((item: Product) => item._id === productId);
				setIsInWishlist(exists);
			}

			try {
				const wishlist = await getWishlist();
				localStorage.setItem("wishlist", JSON.stringify(wishlist.data));
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
