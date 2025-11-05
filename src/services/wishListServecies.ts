import { getToken } from "@/helpers/getUserToken";
import axios from "axios";


const baseURL = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function getWishlist() {
	const token = await getToken();
	const { data } = await axios.get(baseURL, { headers: { token } });
	return data;
}

export async function addToWishlist(productId: string) {
	const token = await getToken();
	const { data } = await axios.post(
		baseURL,
		{ productId },
		{ headers: { token } }
	);
	return data;
}

export async function removeFromWishlist(productId: string) {
	const token = await getToken();
	const { data } = await axios.delete(`${baseURL}/${productId}`, {
		headers: { token },
	});
	return data;
}
