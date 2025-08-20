'use server';
/**
 * @fileOverview Classifies input information into predefined categories.
 *
 * - classifyInputInformation - A function that classifies the input information.
 * - ClassifyInputInformationInput - The input type for the classifyInputInformation function.
 * - ClassifyInputInformationOutput - The return type for the classifyInputInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyInputInformationInputSchema = z.object({
  inputInformation: z.string().describe('The input information to classify.'),
});
export type ClassifyInputInformationInput = z.infer<typeof ClassifyInputInformationInputSchema>;

const ClassifyInputInformationOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category that the input information belongs to (e.g., Product Launch, Hiring, Market Expansion, Funding, or Partnership).'
    ),
  confidence: z.number().describe('The confidence score for the classification.'),
});
export type ClassifyInputInformationOutput = z.infer<typeof ClassifyInputInformationOutputSchema>;

export async function classifyInputInformation(
  input: ClassifyInputInformationInput
): Promise<ClassifyInputInformationOutput> {
  return classifyInputInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyInputInformationPrompt',
  input: {schema: ClassifyInputInformationInputSchema},
  output: {schema: ClassifyInputInformationOutputSchema},
  prompt: `You are an expert business analyst specializing in competitor intelligence.

  Classify the following input information into one of the following categories: Product Launch, Hiring, Market Expansion, Funding, or Partnership.

  Return a confidence score between 0 and 1 for the classification. The confidence score should reflect how clearly the text aligns with a single category. For example, if the text is clearly and solely about a product launch, the confidence should be high (e.g., > 0.9). If the text mentions multiple themes (like a product launch and a new partnership), the confidence for the primary category should be lower (e.g., 0.6-0.8).

  Input Information: {{{inputInformation}}}
  `,
});

const classifyInputInformationFlow = ai.defineFlow(
  {
    name: 'classifyInputInformationFlow',
    inputSchema: ClassifyInputInformationInputSchema,
    outputSchema: ClassifyInputInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
