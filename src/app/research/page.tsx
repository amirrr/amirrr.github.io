
import { researchs as researchItems } from './data';
import ResearchCard from './components/ResearchCard';
import type { Metadata } from 'next';
import { Accordion } from '@/components/ui/accordion';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Research | ${siteConfig.siteName}`,
  description: `Explore the research undertaken by ${siteConfig.name.first} ${siteConfig.name.last}.`,
};

export default function ResearchPage() {
  return (
    <div className="space-y-8 fade-in max-w-3xl mx-auto py-8 md:py-12">
      <header className="mb-10">
        <div className="inline-block">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-foreground">Research</h1>
          <hr className="mt-1 border-t-2 border-foreground w-1/3" />
        </div>
      </header>
      {researchItems.length === 0 ? (
         <p className="text-center text-muted-foreground text-base py-6">No research to display yet. Please check back later.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {researchItems.map((item) => (
            <ResearchCard key={item.id} project={item} />
          ))}
        </Accordion>
      )}
    </div>
  );
}
