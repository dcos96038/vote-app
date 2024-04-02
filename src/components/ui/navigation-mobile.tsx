import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./sheet";

interface NavigationMobileProps {
	routes: { title: string; href: string }[];
}

export const NavigationMobile: React.FC<NavigationMobileProps> = ({
	routes,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<Sheet open={isOpen}>
			<SheetTrigger className="sm:hidden" onClick={() => setIsOpen(true)}>
				<IconMenu2 stroke={2} />
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader className="mb-6">
					<SheetTitle className="text-2xl">Vote App</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col items-center gap-10 ">
					{routes.map((r) => (
						<Link
							onClick={() => {
								setIsOpen(false);
							}}
							className={cn(
								"w-full rounded-md bg-accent px-4 py-2 text-center",
								{
									"bg-white text-black": pathname === r.href,
								},
							)}
							key={r.title}
							title={r.title}
							href={r.href}
						>
							{r.title}
						</Link>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
};
