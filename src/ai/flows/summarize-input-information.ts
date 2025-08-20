'use server';

/**
 * @fileOverview Summarizes input information to quickly understand key points.
 *
 * - summarizeInputInformation - A function that summarizes the input information.
 * - SummarizeInputInformationInput - The input type for the summarizeInputInformation function.
 * - SummarizeInputInformationOutput - The return type for the summarizeInputInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeInputInformationInputSchema = z.object({
  inputInformation: z.string().describe('The input information to summarize.'),
});
export type SummarizeInputInformationInput = z.infer<typeof SummarizeInputInformationInputSchema>;

const SummarizeInputInformationOutputSchema = z.object({
  summary: z.string().describe('A summary of the input information.'),
});
export type SummarizeInputInformationOutput = z.infer<typeof SummarizeInputInformationOutputSchema>;

export async function summarizeInputInformation(
  input: SummarizeInputInformationInput
): Promise<SummarizeInputInformationOutput> {
  return summarizeInputInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeInputInformationPrompt',
  input: {schema: SummarizeInputInformationInputSchema},
  output: {schema: SummarizeInputInformationOutputSchema},
  prompt: `Summarize the following input information in a concise manner:\n\n{{{inputInformation}}}`,
});

const summarizeInputInformationFlow = ai.defineFlow(
  {
    name: 'summarizeInputInformationFlow',
    inputSchema: SummarizeInputInformationInputSchema,
    outputSchema: SummarizeInputInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
