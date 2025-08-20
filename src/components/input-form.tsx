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

type InputFormProps = {
  action: (formData: FormData) => void;
  isPending: boolean;
};

export function InputForm({ action, isPending }: InputFormProps) {
  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <CardTitle>Input Information</CardTitle>
          <CardDescription>
            Paste any text data like press releases, job postings, or blog updates below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="input-information">Text Input</Label>
            <Textarea
              placeholder="Paste content here..."
              id="input-information"
              name="inputInformation"
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
