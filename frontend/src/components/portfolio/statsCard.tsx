import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  indicator?: {
    value: string;
    positive?: boolean;
  };
  isLoading?: boolean;
  className?: string;
}

export function StatsCard({
  title,
  value,
  indicator,
  isLoading = false,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("p-6 relative", className)}>
      {isLoading ? (
        <div className="h-[88px] flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {indicator && (
            <div
              className={cn(
                "absolute top-6 right-6 px-2.5 py-0.5 rounded-full text-sm font-medium",
                indicator.positive
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              {indicator.value}
            </div>
          )}
        </>
      )}
    </Card>
  );
}