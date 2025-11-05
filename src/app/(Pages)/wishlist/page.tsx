
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import InnerWishList from "@/components/Wishlist/InnerWishList";

export default async function Page() {




	return (
		<Suspense fallback={<LoadingSpinner />}>
			<InnerWishList />
		</Suspense>
	);
}
