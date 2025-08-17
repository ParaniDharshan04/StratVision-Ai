'use client';

import type { AnalysisResult } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SummaryCard } from '@/components/summary-card';
import { ClassificationCard } from '@/components/classification-card';
import { EntitiesCard } from '@/components/entities-card';
import { InsightsCard } from '@/components/insights-card';
import { Lightbulb, Terminal } from 'lucide-react';

type ResultsDashboardProps = {
  result: AnalysisResult | null;
  error: string | null;
  isPending: boolean;
};

function WelcomePlaceholder() {
  return (
    <Card className="flex h-full items-center justify-center">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
        <div className="rounded-full border bg-card p-4">
          <Lightbulb className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Welcome to StratVision AI</CardTitle>
        <p className="max-w-md text-muted-foreground">
          Your strategic analysis starts here. Paste competitor data into the form on the left to generate actionable insights instantly.
        </p>
      </CardContent>
    </Card>
  );
}

export function ResultsDashboard({ result, error, isPending }: ResultsDashboardProps) {
  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Analysis Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!result) {
    return <WelcomePlaceholder />;
  }

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <SummaryCard summary={result.summary} />
      </div>
      <ClassificationCard classification={result.classification} />
      <EntitiesCard entities={result.entities} />
      <div className="lg:col-span-2">
        <InsightsCard insights={result.strategicInsights} />
      </div>
    </div>
  );
}
