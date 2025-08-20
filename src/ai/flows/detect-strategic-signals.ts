'use server';

/**
 * @fileOverview Detects strategic signals from input information.
 *
 * - detectStrategicSignals - A function that handles the strategic signal detection process.
 * - DetectStrategicSignalsInput - The input type for the detectStrategicSignals function.
 * - DetectStrategicSignalsOutput - The return type for the detectStrategicSignals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectStrategicSignalsInputSchema = z.object({
  inputInformation: z
    .string()
    .describe('The input information to analyze for strategic signals.'),
});
export type DetectStrategicSignalsInput = z.infer<
  typeof DetectStrategicSignalsInputSchema
>;

const DetectStrategicSignalsOutputSchema = z.object({
  strategicSignals: z
    .array(z.string())
    .describe('The strategic signals detected in the input information.'),
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
  prompt: `You are a strategic analyst who detects strategic signals from input information.

  Analyze the following input information for strategic signals, such as repeated hiring patterns, product development trends, or market expansion activities. Provide both the list of signals and an explanation of how they were detected.

  Input Information: {{{inputInformation}}}`,
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
