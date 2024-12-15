import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticlesScrapedResponse } from "@/state/slices/scrapedArticlesSlice"

export default function NewsArticleCard({ title, author, url }: ArticlesScrapedResponse) {
  const handleClick = () => {
    if(url){
      window.open(url, '_blank');
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
    </Card>
  )
}

