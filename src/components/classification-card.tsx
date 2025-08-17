import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag, Building, Rocket, DollarSign, Handshake, Briefcase } from 'lucide-react';
import type { ClassifyCompetitorDataOutput } from '@/ai/flows/classify-competitor-data';

type ClassificationCardProps = {
  classification: ClassifyCompetitorDataOutput;
};

const categoryIcons: Record<string, React.ReactNode> = {
  'Product Launch': <Rocket className="h-4 w-4" />,
  'Hiring': <Briefcase className="h-4 w-4" />,
  'Market Expansion': <Building className="h-4 w-4" />,
  'Funding': <DollarSign className="h-4 w-4" />,
  'Partnership': <Handshake className="h-4 w-4" />,
};

export function ClassificationCard({ classification }: ClassificationCardProps) {
  const { category, confidence } = classification;
  const icon = categoryIcons[category] || <Tag className="h-4 w-4" />;
  const confidencePercentage = (confidence * 100).toFixed(0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Classification</CardTitle>
        <Tag className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold">{category}</span>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Confidence</p>
          <div className="flex items-center gap-2">
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${confidencePercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{confidencePercentage}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
