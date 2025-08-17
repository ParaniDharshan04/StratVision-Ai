// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Extracts key entities (company names, locations, technologies) from competitor data.
 *
 * - extractEntities - A function that handles the entity extraction process.
 * - ExtractEntitiesInput - The input type for the extractEntities function.
 * - ExtractEntitiesOutput - The return type for the extractEntities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractEntitiesInputSchema = z.object({
  text: z
    .string()
    .describe('The competitor data text from which to extract entities.'),
});
export type ExtractEntitiesInput = z.infer<typeof ExtractEntitiesInputSchema>;

const ExtractEntitiesOutputSchema = z.object({
  companies: z.array(z.string()).describe('List of company names.'),
  locations: z.array(z.string()).describe('List of locations.'),
  technologies: z.array(z.string()).describe('List of technologies.'),
});
export type ExtractEntitiesOutput = z.infer<typeof ExtractEntitiesOutputSchema>;

export async function extractEntities(input: ExtractEntitiesInput): Promise<ExtractEntitiesOutput> {
  return extractEntitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractEntitiesPrompt',
  input: {schema: ExtractEntitiesInputSchema},
  output: {schema: ExtractEntitiesOutputSchema},
  prompt: `You are an expert in extracting entities from text data.

  Given the following text, extract the key entities, including company names, locations, and technologies. Return the results in a JSON format.

  Text: {{{text}}}
  `,
});

const extractEntitiesFlow = ai.defineFlow(
  {
    name: 'extractEntitiesFlow',
    inputSchema: ExtractEntitiesInputSchema,
    outputSchema: ExtractEntitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
