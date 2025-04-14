import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border border-border/50 hover:border-teal-500/50 transition-all hover:shadow-md overflow-hidden group">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 mb-4 group-hover:bg-teal-200 dark:group-hover:bg-teal-800/30 transition-colors">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
