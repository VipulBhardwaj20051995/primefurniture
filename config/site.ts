export type SiteConfig = typeof siteConfig;

// Make sure this file exists and has the correct data

export const siteConfig = {
  name: "Prime Furniture",
  description: "Modern furniture for modern homes",
  navItems: [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ],
  navMenuItems: [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ],
};