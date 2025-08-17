'use server';

/**
 * @fileOverview Detects strategic signals from competitor data.
 *
 * - detectStrategicSignals - A function that handles the strategic signal detection process.
 * - DetectStrategicSignalsInput - The input type for the detectStrategicSignals function.
 * - DetectStrategicSignalsOutput - The return type for the detectStrategicSignals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectStrategicSignalsInputSchema = z.object({
  competitorData: z
    .string()
    .describe('The competitor data to analyze for strategic signals.'),
});
export type DetectStrategicSignalsInput = z.infer<
  typeof DetectStrategicSignalsInputSchema
>;

const DetectStrategicSignalsOutputSchema = z.object({
  strategicSignals: z
    .array(z.string())
    .describe('The strategic signals detected in the competitor data.'),
  explanation: z
    .string()
    .describe('An explanation of how the strategic signals were detected.'),
});
export type DetectStrategicSignalsOutput = z.infer<
  typeof DetectStrategicSignalsOutputSchema
>;

export async function detectStrategicSignals(
  input: DetectStrategicSignalsInput
): Promise<DetectStrategicSignalsOutput> {
  return detectStrategicSignalsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectStrategicSignalsPrompt',
  input: {schema: DetectStrategicSignalsInputSchema},
  output: {schema: DetectStrategicSignalsOutputSchema},
  prompt: `You are a strategic analyst who detects strategic signals from competitor data.

  Analyze the following competitor data for strategic signals, such as repeated hiring patterns, product development trends, or market expansion activities. Provide both the list of signals and an explanation of how they were detected.

  Competitor Data: {{{competitorData}}}`,
});

const detectStrategicSignalsFlow = ai.defineFlow(
  {
    name: 'detectStrategicSignalsFlow',
    inputSchema: DetectStrategicSignalsInputSchema,
    outputSchema: DetectStrategicSignalsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
