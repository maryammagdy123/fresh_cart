// components/PasswordChecklist.tsx

import { passwordChecks } from "@/helpers/passwordChecks";


interface Props {
	password: string;
}

export function PasswordChecklist({ password }: Props) {
	return (
		<ul className="mt-3 space-y-1 text-sm">
			{passwordChecks.map((c, i) => {
				const passed = c.test(password || "");
				return (
					<li
						key={i}
						className={`flex items-center gap-2  ${passed ? "text-green-600" : "text-gray-400"
							}`}
					>
						<span
							className={`h-2 w-2 rounded-full  ${passed ? "bg-green-600" : "bg-gray-600"
								}`}
						></span>
						{c.label}
					</li>
				);
			})}
		</ul>
	);
}
