// SummarizeCompetitorData flow
'use server';

/**
 * @fileOverview Summarizes competitor data to quickly understand key points.
 *
 * - summarizeCompetitorData - A function that summarizes the competitor data.
 * - SummarizeCompetitorDataInput - The input type for the summarizeCompetitorData function.
 * - SummarizeCompetitorDataOutput - The return type for the summarizeCompetitorData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCompetitorDataInputSchema = z.object({
  competitorData: z.string().describe('The competitor data to summarize.'),
});
export type SummarizeCompetitorDataInput = z.infer<typeof SummarizeCompetitorDataInputSchema>;

const SummarizeCompetitorDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the competitor data.'),
});
export type SummarizeCompetitorDataOutput = z.infer<typeof SummarizeCompetitorDataOutputSchema>;

export async function summarizeCompetitorData(
  input: SummarizeCompetitorDataInput
): Promise<SummarizeCompetitorDataOutput> {
  return summarizeCompetitorDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCompetitorDataPrompt',
  input: {schema: SummarizeCompetitorDataInputSchema},
  output: {schema: SummarizeCompetitorDataOutputSchema},
  prompt: `Summarize the following competitor data in a concise manner:\n\n{{{competitorData}}}`,
});

const summarizeCompetitorDataFlow = ai.defineFlow(
  {
    name: 'summarizeCompetitorDataFlow',
    inputSchema: SummarizeCompetitorDataInputSchema,
    outputSchema: SummarizeCompetitorDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
