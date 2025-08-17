import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import type { DetectStrategicSignalsOutput } from '@/ai/flows/detect-strategic-signals';

type InsightsCardProps = {
  insights: DetectStrategicSignalsOutput;
};

export function InsightsCard({ insights }: InsightsCardProps) {
  const { strategicSignals, explanation } = insights;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Strategic Insights</CardTitle>
        <TrendingUp className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Detected Signals</h3>
          {strategicSignals.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {strategicSignals.map((signal, index) => (
                <li key={index}>{signal}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No specific strategic signals detected.</p>
          )}
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Explanation</h3>
          <p className="text-sm text-muted-foreground">{explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
