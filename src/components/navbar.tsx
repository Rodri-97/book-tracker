"use client";

import LogoutButton from "@/app/(auth)/_components/logout-button";
import type { NavLinkProp } from "@/lib/nav-links";
import { authedNavLinks, unauthedNavLinks } from "@/lib/nav-links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar({ authed }: { authed: boolean }) {
  const navLinks: NavLinkProp[] = authed ? authedNavLinks : unauthedNavLinks;

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function closeMobileNav() {
    return setMobileNavOpen(false);
  }

  return (
    <nav className="relative h-20 flex justify-between items-center border-b-[1px] border-b-gray-300 p-2 lg:px-24">
      <Link href="/" className="flex flex-row justify-center items-center">
        <img
          className="h-[72px] w-[72px]"
          src="/logo.png"
          alt="LitQuest logo"
        />
      </Link>
      <div className="h-full justify-center items-center hidden lg:flex">
        <NavbarLinks navLinks={navLinks} />
      </div>
      <div
        className="flex justify-center items-center hover:cursor-pointer lg:hidden"
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <img src="/menu.png" alt="Navbar Menu" />
      </div>

      {mobileNavOpen ? (
        <div className="absolute z-50 left-0 top-20 bg-white border-y-2 border-y-blue-700 w-full flex flex-col justify-center items-center gap-4 p-4 lg:hidden">
          <NavbarLinks navLinks={navLinks} closeMobileNav={closeMobileNav} />
        </div>
      ) : null}
    </nav>
  );
}

function NavbarLinks({
  navLinks,
  closeMobileNav,
}: {
  navLinks: NavLinkProp[];
  closeMobileNav?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((navLink) => {
        return (
          <Link
            className={`h-full flex justify-center items-center lg:pr-6 ${
              pathname === navLink.href ? "text-blue-700" : "text-gray-500"
            } font-medium`}
            key={navLink.id}
            href={navLink.href}
            onClick={closeMobileNav}
          >
            {navLink.text}
          </Link>
        );
      })}
      {navLinks.map((navLink) => navLink.href).includes("/login") ? null : (
        <LogoutButton />
      )}
    </>
  );
}
