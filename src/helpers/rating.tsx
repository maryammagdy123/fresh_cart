import { Star } from "lucide-react";

export const renderStars = (rating: number) => {
	const stars = []
	const fullStars = Math.floor(rating);
	const halfStars = rating % 1 !== 0;

	for (let i = 0; i < fullStars; i++) {
		stars.push(
			<Star key={i} className="h-5 w-5  fill-yellow-500 text-yellow-500" />
		);

	}
}