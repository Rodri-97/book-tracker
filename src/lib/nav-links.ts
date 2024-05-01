export type NavLinkProp = {
  id: number;
  href: string;
  text: string;
};

export const unauthedNavLinks = [
  { id: 1, href: "/", text: "Home" },
  { id: 2, href: "/login", text: "Login" },
  { id: 3, href: "/register", text: "Register" },
];

export const authedNavLinks = [
  { id: 1, href: "/", text: "Home" },
  { id: 2, href: "#", text: "Bookshelves" },
  { id: 3, href: "#", text: "Reviews" },
  { id: 4, href: "#", text: "Profile" },
  { id: 5, href: "#", text: "Statistics" },
];
