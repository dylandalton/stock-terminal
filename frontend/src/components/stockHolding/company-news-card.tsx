import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import NewsArticleCard from "./news-article-card"

interface Article {
  title: string
  author: string
  article: string
}

interface CompanyNewsCardProps {
  articles: Article[]
}

export default function CompanyNewsCard({ articles }: CompanyNewsCardProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Latest Company News</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {articles.map((article, index) => (
              <NewsArticleCard key={index} {...article} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

