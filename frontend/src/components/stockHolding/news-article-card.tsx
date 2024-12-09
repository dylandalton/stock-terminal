import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsArticleCardProps {
  title: string
  author: string
  article: string
}

export default function NewsArticleCard({ title, author, article }: NewsArticleCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">By {author}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{article}</p>
      </CardContent>
    </Card>
  )
}

