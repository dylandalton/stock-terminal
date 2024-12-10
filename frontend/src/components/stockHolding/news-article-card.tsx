import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleScrapeResponse } from "@/state/slices/scrapeSlice"

export default function NewsArticleCard({ title, author, articleText }: ArticleScrapeResponse) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">By {author}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{articleText}</p>
      </CardContent>
    </Card>
  )
}

