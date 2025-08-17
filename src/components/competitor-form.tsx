'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90">
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
        </>
      ) : (
        'Generate Insights'
      )}
    </Button>
  );
}

type CompetitorFormProps = {
  action: (formData: FormData) => void;
  isPending: boolean;
};

export function CompetitorForm({ action, isPending }: CompetitorFormProps) {
  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <CardTitle>Competitor Data</CardTitle>
          <CardDescription>
            Paste any competitor text data like press releases, job postings, or blog updates below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="competitor-data">Text Input</Label>
            <Textarea
              placeholder="Paste competitor content here..."
              id="competitor-data"
              name="competitorData"
              className="min-h-60"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton isPending={isPending} />
        </CardFooter>
      </Card>
    </form>
  );
}
