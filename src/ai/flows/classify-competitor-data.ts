'use server';
/**
 * @fileOverview Classifies competitor data into predefined categories.
 *
 * - classifyCompetitorData - A function that classifies competitor data.
 * - ClassifyCompetitorDataInput - The input type for the classifyCompetitorData function.
 * - ClassifyCompetitorDataOutput - The return type for the classifyCompetitorData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyCompetitorDataInputSchema = z.object({
  competitorData: z.string().describe('The competitor data to classify.'),
});
export type ClassifyCompetitorDataInput = z.infer<typeof ClassifyCompetitorDataInputSchema>;

const ClassifyCompetitorDataOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category that the competitor data belongs to (e.g., Product Launch, Hiring, Market Expansion, Funding, or Partnership).'
    ),
  confidence: z.number().describe('The confidence score for the classification.'),
});
export type ClassifyCompetitorDataOutput = z.infer<typeof ClassifyCompetitorDataOutputSchema>;

export async function classifyCompetitorData(
  input: ClassifyCompetitorDataInput
): Promise<ClassifyCompetitorDataOutput> {
  return classifyCompetitorDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyCompetitorDataPrompt',
  input: {schema: ClassifyCompetitorDataInputSchema},
  output: {schema: ClassifyCompetitorDataOutputSchema},
  prompt: `You are an expert business analyst specializing in competitor intelligence.

  Classify the following competitor data into one of the following categories: Product Launch, Hiring, Market Expansion, Funding, or Partnership.

  Return a confidence score between 0 and 1 for the classification. The confidence score should reflect how clearly the text aligns with a single category. For example, if the text is clearly and solely about a product launch, the confidence should be high (e.g., > 0.9). If the text mentions multiple themes (like a product launch and a new partnership), the confidence for the primary category should be lower (e.g., 0.6-0.8).

  Competitor Data: {{{competitorData}}}
  `,
});

const classifyCompetitorDataFlow = ai.defineFlow(
  {
    name: 'classifyCompetitorDataFlow',
    inputSchema: ClassifyCompetitorDataInputSchema,
    outputSchema: ClassifyCompetitorDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
