import Link from "next/link";
import Image from "next/image";
import {
  researchs as allResearchItems,
  type Research as ResearchItem,
} from "@/app/research/data";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const sortedResearch = [...allResearchItems].sort(
    (a, b) =>
      b.year - a.year ||
      new Date(b.summary.split(" ")[0] + " 1, " + b.year).getTime() -
        new Date(a.summary.split(" ")[0] + " 1, " + a.year).getTime()
  );
  const recentResearch = sortedResearch.slice(0, 2);

  return (
    <div className="space-y-10 md:space-y-14 fade-in max-w-3xl mx-auto pt-6 md:pt-10">
      <section>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-4">
          <div className="flex-shrink-0">
            <Image
              src={siteConfig.profileImage || "https://placehold.co/120x120"}
              alt={siteConfig.profileImageAlt}
              width={120}
              height={120}
              className="rounded-full object-cover shadow-md"
              data-ai-hint="profile portrait"
              priority
            />
          </div>
          <div className="text-center sm:text-left flex-grow">
            <h2 className="text-xl sm:text-2xl font-semibold font-serif text-foreground mb-3">
              About Me
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {siteConfig.aboutMe.map((paragraph, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {siteConfig.newsItems.length > 0 && (
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold font-serif text-foreground mb-5">
            Timeline
          </h2>
          <ul className="space-y-3 text-[13px]">
            {siteConfig.newsItems.map((item, index) => (
              <li key={index} className="flex flex-col sm:flex-row">
                <span className="text-muted-foreground sm:w-1/4 mb-0.5 sm:mb-0 sm:pr-3 shrink-0">
                  {item.date}:
                </span>
                <p
                  className="text-foreground flex-1 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {recentResearch.length > 0 && (
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold font-serif text-foreground mb-5">
            Recent Research
          </h2>
          <div className="space-y-5">
            {recentResearch.map((item: ResearchItem) => (
              <article
                key={item.id}
                className="pb-3 border-b border-dashed border-border last:border-b-0"
              >
                <Link href={`/research`} className="group">
                  <h3 className="text-lg font-semibold font-serif text-foreground group-hover:text-primary group-hover:underline transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.year} | {item.status}
                </p>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                  {item.summary}
                </p>
                <Link
                  href={`/research`}
                  className="text-xs text-primary hover:underline mt-2 inline-block"
                >
                  Learn More &rarr;
                </Link>
              </article>
            ))}
          </div>
          {allResearchItems.length > 2 && (
            <div className="mt-5 text-right">
              <Link
                href="/research"
                className="text-sm text-primary hover:underline"
              >
                View all research &rarr;
              </Link>
            </div>
          )}
        </section>
      )}

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold font-serif text-foreground mb-3">
          Contact
        </h2>
        <div className="text-sm sm:text-base text-muted-foreground space-y-1.5">
          <p>
            <strong>Email: </strong>
            <Image
              src={"/images/email.png"}
              alt="email"
              width={277}
              height={17}
              className="inline-block"
            />
          </p>
          {siteConfig.university && (
            <p>
              <strong>University:</strong> {siteConfig.university}
            </p>
          )}
          <p>
            You can also find me on{" "}
            <Link
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </Link>{" "}
            or{" "}
            <Link
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
