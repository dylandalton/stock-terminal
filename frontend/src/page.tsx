import CompanyNewsCard from "./company-news-card"

const sampleArticles = [
  {
    title: "New Product Launch",
    author: "John Doe",
    article: "We're excited to announce the launch of our latest product, which will revolutionize the industry..."
  },
  {
    title: "Q2 Financial Results",
    author: "Jane Smith",
    article: "Our second quarter financial results show strong growth in key areas, with revenue up 15% year-over-year..."
  },
  {
    title: "Expansion into New Markets",
    author: "Mike Johnson",
    article: "We're thrilled to share our plans for expansion into three new international markets, starting next month..."
  },
  {
    title: "Employee Spotlight: Sarah Lee",
    author: "HR Team",
    article: "This month, we're featuring Sarah Lee from our engineering team. Sarah has been instrumental in developing..."
  }
]

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <CompanyNewsCard articles={sampleArticles} />
    </div>
  )
}

