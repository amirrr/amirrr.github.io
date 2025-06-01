import { posts, type Post } from "../data";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import { siteConfig } from "@/config/site";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: `Post Not Found | ${siteConfig.siteName}`,
    };
  }

  return {
    title: `${post.title} | ${siteConfig.siteName}`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publicationDate,
      authors: [`${siteConfig.name.first} ${siteConfig.name.last}`],
    },
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto fade-in py-6 md:py-10">
      <div className="mb-4">
        <Link
          href="/blog"
          className="text-xs text-muted-foreground hover:text-primary inline-flex items-center underline underline-offset-2 decoration-1 transition-colors duration-150 ease-in-out"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Back to Blog
        </Link>
      </div>

      <header className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground mb-2.5">
          {post.title}
        </h1>
        <div className="text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="flex items-center">
            <CalendarDays className="mr-1 h-3.5 w-3.5" />
            {new Date(post.publicationDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.readingTimeMinutes && (
            <span className="flex items-center">
              <Clock className="mr-1 h-3.5 w-3.5" />
              {post.readingTimeMinutes} min read
            </span>
          )}
        </div>
      </header>

      <MarkdownRenderer content={post.content} />
    </article>
  );
}
