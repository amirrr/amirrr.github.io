import Link from "next/link";
import { posts, type Post } from "./data";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.siteName}`,
  description: `Read the latest articles and research insights from ${siteConfig.name.first} ${siteConfig.name.last}.`,
};

export default function BlogListPage() {
  const postsByYear: { [year: string]: Post[] } = {};
  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.publicationDate).getTime() -
      new Date(a.publicationDate).getTime()
  );

  sortedPosts.forEach((post) => {
    const year = new Date(post.publicationDate).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="fade-in max-w-3xl mx-auto py-8 md:py-12">
      <header className="mb-10">
        <div className="inline-block">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-foreground">
            Blog
          </h1>
          <hr className="mt-1 border-t-2 border-foreground w-full" />
        </div>
      </header>

      {sortedPosts.length === 0 ? (
        <p className="text-center text-muted-foreground text-base py-8">
          No blog posts yet. Check back soon!
        </p>
      ) : (
        <div className="space-y-10">
          {years.map((year) => (
            <section key={year}>
              <div className="flex items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold font-serif text-foreground mr-4">
                  {year}
                </h2>
                <hr className="flex-grow border-t border-foreground" />
              </div>
              <ul className="space-y-1 sm:space-y-1.5">
                {postsByYear[year].map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex items-baseline justify-between py-1.5 text-foreground hover:text-primary transition-colors"
                    >
                      <span className="text-sm group-hover:underline truncate mr-3">
                        {post.title}
                      </span>
                      <span className="flex-grow h-px border-b border-dashed border-muted-foreground group-hover:border-solid group-hover:border-primary transition-all relative top-[2px]"></span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap group-hover:underline ml-3">
                        {new Date(post.publicationDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
