"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/services/api";
import toast from "react-hot-toast";
import { Product } from "@/Interfaces";


export function useWishlist() {
	const queryClient = useQueryClient();

	// ✅ fetch wishlist
	const { data, isLoading } = useQuery({
		queryKey: ["wishlist"],
		queryFn: getWishlist,
	});

	const wishlist = data?.data || [];

	// ✅ add/remove mutations
	const addMutation = useMutation({
		mutationFn: addToWishlist,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
			toast.success("Added to wishlist ❤️");
		},
	});

	const removeMutation = useMutation({
		mutationFn: removeFromWishlist,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
			toast.success("Removed from wishlist 💔");
		},
	});


	function toggleWishlist(productId: string) {
		const isInWishlist = wishlist.some((item: Product) => item._id === productId);
		if (isInWishlist) {
			removeMutation.mutate(productId);
		} else {
			addMutation.mutate(productId);
		}
	}
	const wishlistCount = wishlist.length;

	return {
		wishlist,
		wishlistCount,
		isLoading,
		toggleWishlist,
		addMutation,
		removeMutation
	};
}
