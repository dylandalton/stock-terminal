import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleScrapeResponse } from "@/state/slices/scrapeSlice"

export default function NewsArticleCard({ title, author, articleText, article_url }: ArticleScrapeResponse) {
  const handleClick = () => {
    if(article_url){
      window.open(article_url, '_blank');
    }
  };
  
  return (
    <Card 
      className="w-full cursor-pointer hover:cursor-pointer"
      onClick={handleClick}
    >
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

