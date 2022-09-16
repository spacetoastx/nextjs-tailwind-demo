import Link from "next/link";
import { CommandSearch } from "./CommandSearch";

export const NavBar = () => {
  return (
    <nav className="container mx-auto flex h-20 items-center gap-8 px-8">
      <Link href="/">
        <span className="cursor-pointer text-xl font-semibold tracking-tighter">
          Issue Explorer
        </span>
      </Link>
      <CommandSearch />
    </nav>
  );
};
