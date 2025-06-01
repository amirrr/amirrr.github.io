import Link from "next/link";
import { siteConfig } from "@/config/site";

const navLinks = [
  { name: "About", href: "/" },
  { name: "Posts", href: "/blog" },
  { name: "Research", href: "/research" },
];

export default function Navbar() {
  return (
    <header className="bg-background/80 backdrop-blur-sm shadow-sm">
      <nav className="max-w-3xl mx-auto px-4 py-6 flex justify-between items-start">
        {/* Left Side: Name and Title Block */}
        <div>
          <Link href="/" className="block group">
            <span className="block text-3xl font-bold font-serif text-foreground group-hover:text-primary transform origin-left transition-colors duration-150 ease-in-out">
              {siteConfig.name.first}
            </span>
            <span className="block text-3xl font-bold font-serif text-foreground group-hover:text-primary transform origin-left transition-colors duration-150 ease-in-out leading-tight">
              {siteConfig.name.last}
            </span>
          </Link>
          <hr className="md-2 border-t-2 border-foreground w-full" />
          <p className="text-sm text-muted-foreground">{siteConfig.title}</p>
        </div>

        {/* Right Side: Vertical Navigation Links */}
        <ul className="flex flex-col items-end space-y-0">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="inline-block text-muted-foreground transition-colors duration-150 ease-in-out px-2 py-0.5 text-sm"
              >
                <span className="animated-nav-link relative inline-block overflow-hidden rounded-sm underline underline-offset-2 decoration-1 hover:text-accent-foreground hover:decoration-accent-foreground">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
