import { AvatarMenu } from "./avatar-menu";
import { Navigation } from "./navigation";

export const Navbar = () => {
  return (
    <nav className="rounded-lg px-4 flex justify-between items-center relative py-2">
      <Navigation />
      <AvatarMenu />
    </nav>
  );
};
