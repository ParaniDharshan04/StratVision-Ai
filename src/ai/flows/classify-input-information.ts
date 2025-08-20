'use server';
/**
 * @fileOverview Classifies input information into predefined categories.
 *
 * - classifyTextCorpus - A function that classifies the input information.
 * - ClassifyTextCorpusInput - The input type for the classifyTextCorpus function.
 * - ClassifyTextCorpusOutput - The return type for the classifyTextCorpus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyTextCorpusInputSchema = z.object({
  textCorpus: z.string().describe('The text corpus to classify.'),
});
export type ClassifyTextCorpusInput = z.infer<typeof ClassifyTextCorpusInputSchema>;

const ClassifyTextCorpusOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category that the input information belongs to (e.g., Product Launch, Hiring, Market Expansion, Funding, or Partnership).'
    ),
  confidence: z.number().describe('The confidence score for the classification.'),
});
export type ClassifyTextCorpusOutput = z.infer<typeof ClassifyTextCorpusOutputSchema>;

export async function classifyTextCorpus(
  input: ClassifyTextCorpusInput
): Promise<ClassifyTextCorpusOutput> {
  return classifyTextCorpusFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyTextCorpusPrompt',
  input: {schema: ClassifyTextCorpusInputSchema},
  output: {schema: ClassifyTextCorpusOutputSchema},
  prompt: `You are an expert business analyst specializing in competitor intelligence.

  Classify the following text corpus into one of the following categories: Product Launch, Hiring, Market Expansion, Funding, or Partnership.

  Return a confidence score between 0 and 1 for the classification. The confidence score should reflect how clearly the text aligns with a single category. For example, if the text is clearly and solely about a product launch, the confidence should be high (e.g., > 0.9). If the text mentions multiple themes (like a product launch and a new partnership), the confidence for the primary category should be lower (e.g., 0.6-0.8).

  Text Corpus: {{{textCorpus}}}
  `,
});

const classifyTextCorpusFlow = ai.defineFlow(
  {
    name: 'classifyTextCorpusFlow',
    inputSchema: ClassifyTextCorpusInputSchema,
    outputSchema: ClassifyTextCorpusOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
