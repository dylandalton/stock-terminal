import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import NewsArticleCard from "./news-article-card"
import { useAppSelector } from "@/lib/hooks/typedHooks"

export default function CompanyNewsCard() {
  const scrapedArticles = useAppSelector((state) => state.scrape.scrapedArticles);
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Latest Company News</CardTitle>
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

