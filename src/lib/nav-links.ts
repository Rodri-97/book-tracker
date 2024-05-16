export type NavLinkProp = {
  id: number;
  href: string;
  text: string;
};

const commonNavLinks: NavLinkProp[] = [
  { id: 1, href: "/", text: "Home" },
  { id: 2, href: "/search", text: "Search" },
];

export const unauthedNavLinks: NavLinkProp[] = [
  ...commonNavLinks,
  { id: 3, href: "/login", text: "Login" },
  { id: 4, href: "/register", text: "Register" },
];

export const authedNavLinks: NavLinkProp[] = [
  ...commonNavLinks,
  { id: 3, href: "/bookshelves", text: "Bookshelves" },
  { id: 4, href: "#", text: "Reviews" },
  { id: 5, href: "#", text: "Statistics" },
];
