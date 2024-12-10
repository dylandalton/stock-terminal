import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import NewsArticleCard from "./news-article-card"
import { useAppSelector } from "@/lib/hooks/typedHooks"
import { Newspaper } from 'lucide-react';

export default function CompanyNewsCard() {
  const scrapedArticles = useAppSelector((state) => state.scrape.scrapedArticles);
  return (
    <Card className="w-full max-w-4xl my-5">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <CardTitle className="text-2xl font-bold mr-2">Latest Company News</CardTitle>
          <Newspaper className="h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {scrapedArticles.map((article, index) => (
              <NewsArticleCard key={index} {...article} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

