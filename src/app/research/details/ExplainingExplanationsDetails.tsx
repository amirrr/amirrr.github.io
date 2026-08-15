"use client";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { ResearchDetailProps } from "@/app/research/components/ResearchCard";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import ExplanationStyleExplorer from "./components/ExplanationStyleExplorer";

export default function ExplainingExplanationsDetails({
  markdownContent,
  links,
}: ResearchDetailProps) {
  return (
    <div className="py-4 space-y-6">
      <MarkdownRenderer
        content={markdownContent}
        className="prose-sm max-w-none dark:prose-invert"
      />

      {links && links.length > 0 && (
        <section>
          <h3 className="text-base font-semibold font-serif text-foreground mb-2">
            Relevant Links
          </h3>
          <div className="space-y-1.5">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                {link.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <ExplanationStyleExplorer />
    </div>
  );
}
