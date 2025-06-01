"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
import { Badge } from "@/components/ui/badge";
import type { Research } from "../data"; // Path updated if data.ts is in the same dir
import { ExternalLink, Github, FileText, Video, Loader2 } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function getLinkIcon(linkName: string) {
  const name = linkName.toLowerCase();
  if (name.includes("github")) return <Github className="h-3 w-3" />; // Slightly smaller icon
  if (
    name.includes("paper") ||
    name.includes("publication") ||
    name.includes("preprint") ||
    name.includes("whitepaper") ||
    name.includes("documentation") ||
    name.includes("pnas")
  )
    return <FileText className="h-3 w-3" />;
  if (
    name.includes("demo") ||
    name.includes("video") ||
    name.includes("presentation")
  )
    return <Video className="h-3 w-3" />;
  return <ExternalLink className="h-3 w-3" />;
}

// Type for the props that detail components will receive
export interface ResearchDetailProps {
  markdownContent: string;
  links: Array<{ name: string; url: string }>; // Pass links to detail component
}

// Mapping project IDs to their dynamically imported detail components
const detailComponentsMap: Record<
  string,
  React.ComponentType<ResearchDetailProps>
> = {
  "explaining-explanations": dynamic(
    () =>
      import("@/app/research/details/ExplainingExplanationsDetails").then(
        (mod) => mod.default
      ),
    {
      loading: () => (
        <div className="p-4 flex items-center justify-center text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading details...
        </div>
      ),
    }
  ),
  "global-common-sense-study": dynamic(
    () =>
      import("@/app/research/details/GlobalCommonSenseStudyDetails").then(
        (mod) => mod.default
      ),
    {
      loading: () => (
        <div className="p-4 flex items-center justify-center text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading details...
        </div>
      ),
    }
  ),
};

export default function ResearchCard({ project }: { project: Research }) {
  const ProjectDetailComponent = detailComponentsMap[project.id];

  return (
    <AccordionItem
      value={project.id}
      className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/30 transition-colors duration-200 group"
    >
      <AccordionTrigger className="p-4 md:p-5 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-t-lg text-left">
        <div className="flex-1 pr-2">
          {" "}
          {/* Added pr-2 for spacing from chevron */}
          <h3 className="text-lg font-semibold font-serif text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="text-xs text-muted-foreground mt-1 flex items-center space-x-2">
            <span>{project.year}</span>
            <span>|</span>
            <Badge
              variant={
                project.status === "Completed"
                  ? "default"
                  : project.status === "Ongoing"
                  ? "outline"
                  : "secondary"
              }
              className="capitalize text-xs px-1.5 py-0.5 font-medium"
            >
              {project.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
            {project.summary}
          </p>
          {project.links.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 items-center">
              {project.links.slice(0, 3).map((link) => (
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={link.name}
                  onClick={(e) => e.stopPropagation()} // Prevent accordion from toggling when clicking a link
                  className="inline-flex items-center text-xs text-primary hover:text-primary/80 hover:underline focus:outline-none focus:ring-1 focus:ring-primary/50 rounded-sm"
                  title={link.name}
                >
                  {getLinkIcon(link.name)}
                  <span className="ml-1">{link.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 md:px-6 pb-4 md:pb-6 pt-0 border-t border-border">
        {ProjectDetailComponent ? (
          <ProjectDetailComponent
            markdownContent={project.description}
            links={project.links}
          />
        ) : (
          <div className="py-4 text-muted-foreground">
            Detailed content not available for this project.
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
