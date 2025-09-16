import { apiServices } from "../../../services/api";
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import InnerWishList from "@/components/Wishlist/InnerWishList";

export default async function Page() {

	async function handleDisplayWishlist() {
		const wishlistRes = await apiServices.getWishlist();
		return wishlistRes
	}
	const wishListProducts = await handleDisplayWishlist();


	return (
		<Suspense fallback={<LoadingSpinner />}>
			<InnerWishList wishListProducts={wishListProducts} />
		</Suspense>
	);
}
