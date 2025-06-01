import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted/50 py-6 text-muted-foreground mt-12">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-xs">
          Made with Next.js, themed by{" "}
          <Link
            href="https://github.com/amirrr/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-primary"
          >
            amirrr
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
