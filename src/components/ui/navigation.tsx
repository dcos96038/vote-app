"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils/globals";

import { NavigationMobile } from "./navigation-mobile";

const routes = [
	{
		title: "Inicio",
		href: "/home",
	},
	{
		title: "Top",
		href: "/top",
	},
	{
		title: "Votar",
		href: "/vote",
	},
	{
		title: "Proponer",
		href: "/propose",
	},
];

export function Navigation() {
	const pathname = usePathname();

	return (
		<div>
			<NavigationMenu className="hidden sm:block">
				<NavigationMenuList>
					{routes.map((r) => (
						<NavigationMenuItem key={r.title}>
							<Link href={r.href} legacyBehavior passHref>
								<NavigationMenuLink
									active={pathname === r.href}
									className={navigationMenuTriggerStyle()}
								>
									{r.title}
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>

			<NavigationMobile routes={routes} />
		</div>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
