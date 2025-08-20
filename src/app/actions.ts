'use server';

import { summarizeInputInformation } from '@/ai/flows/summarize-input-information';
import { classifyInputInformation } from '@/ai/flows/classify-input-information';
import { extractEntities } from '@/ai/flows/extract-entities';
import { detectStrategicSignals } from '@/ai/flows/detect-strategic-signals';
import type { AnalysisResult } from '@/lib/types';

export type FormState = {
  result: AnalysisResult | null;
  error: string | null;
};

export async function analyzeInputInformation(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const text = formData.get('inputInformation') as string;

  if (!text || text.trim().length === 0) {
    return { result: null, error: 'Please provide some text to analyze.' };
  }

  try {
    const [summaryResult, classificationResult, entitiesResult, insightsResult] =
      await Promise.all([
        summarizeInputInformation({ inputInformation: text }),
        classifyInputInformation({ inputInformation: text }),
        extractEntities({ text: text }),
        detectStrategicSignals({ inputInformation: text }),
      ]);

    const result: AnalysisResult = {
      summary: summaryResult.summary,
      classification: classificationResult,
      entities: entitiesResult,
      strategicInsights: insightsResult,
    };

    return { result, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    console.error(e);
    return {
      result: null,
      error: `An error occurred during analysis: ${error}. Please try again.`,
    };
  }
}
