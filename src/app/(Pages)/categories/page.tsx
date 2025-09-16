import BrowsCategory from "@/components/Category/BrowsCategory";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
	title: "Browse Categories",
	description: "Explore all product categories and subcategories.",
};

export default function BrowseByCategory() {


	return (
		<BrowsCategory />
	);
}
