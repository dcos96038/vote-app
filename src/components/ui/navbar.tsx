import { AvatarMenu } from "./avatar-menu";
import { Navigation } from "./navigation";

export const Navbar = () => {
	return (
		<nav className="relative flex items-center justify-between border-b px-4 py-2">
			<Navigation />
			<AvatarMenu />
		</nav>
	);
};
