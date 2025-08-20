'use server';

/**
 * @fileOverview Summarizes a text corpus to quickly understand key points.
 *
 * - summarizeTextCorpus - A function that summarizes the text corpus.
 * - SummarizeTextCorpusInput - The input type for the summarizeTextCorpus function.
 * - SummarizeTextCorpusOutput - The return type for the summarizeTextCorpus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTextCorpusInputSchema = z.object({
  textCorpus: z.string().describe('The text corpus to summarize.'),
});
export type SummarizeTextCorpusInput = z.infer<typeof SummarizeTextCorpusInputSchema>;

const SummarizeTextCorpusOutputSchema = z.object({
  summary: z.string().describe('A summary of the text corpus.'),
});
export type SummarizeTextCorpusOutput = z.infer<typeof SummarizeTextCorpusOutputSchema>;

export async function summarizeTextCorpus(
  input: SummarizeTextCorpusInput
): Promise<SummarizeTextCorpusOutput> {
  return summarizeTextCorpusFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTextCorpusPrompt',
  input: {schema: SummarizeTextCorpusInputSchema},
  output: {schema: SummarizeTextCorpusOutputSchema},
  prompt: `Summarize the following text corpus in a concise manner:\n\n{{{textCorpus}}}`,
});

const summarizeTextCorpusFlow = ai.defineFlow(
  {
    name: 'summarizeTextCorpusFlow',
    inputSchema: SummarizeTextCorpusInputSchema,
    outputSchema: SummarizeTextCorpusOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
