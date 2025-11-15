import React from 'react'
import { Button } from './ui/button'
import { Grid, List } from 'lucide-react'

interface ViewmodeProps {
	viewMode: "grid" | "list",
	setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>
}
export default function Viewmode({ viewMode, setViewMode }: ViewmodeProps) {
	return (
		<div className="flex items-center justify-end mb-6 mt-4">
			<div className="flex items-center border rounded-md">
				<Button
					variant={viewMode === "grid" ? "default" : "ghost"}
					size="sm"
					onClick={() => setViewMode("grid")}
					className="rounded-r-none"
				>
					<Grid className="h-4 w-4" />
				</Button>

				<Button
					variant={viewMode === "list" ? "default" : "ghost"}
					size="sm"
					onClick={() => setViewMode("list")}
					className="rounded-l-none"
				>
					<List className="h-4 w-4" />
				</Button>
			</div>

		</div>
	)
}
