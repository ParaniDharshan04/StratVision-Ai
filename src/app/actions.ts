'use server';

import { summarizeCompetitorData } from '@/ai/flows/summarize-competitor-data';
import { classifyCompetitorData } from '@/ai/flows/classify-competitor-data';
import { extractEntities } from '@/ai/flows/extract-entities';
import { detectStrategicSignals } from '@/ai/flows/detect-strategic-signals';
import type { AnalysisResult } from '@/lib/types';

export type FormState = {
  result: AnalysisResult | null;
  error: string | null;
};

export async function analyzeCompetitorData(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const text = formData.get('competitorData') as string;

  if (!text || text.trim().length === 0) {
    return { result: null, error: 'Please provide some text to analyze.' };
  }

  try {
    const [summaryResult, classificationResult, entitiesResult, insightsResult] =
      await Promise.all([
        summarizeCompetitorData({ competitorData: text }),
        classifyCompetitorData({ competitorData: text }),
        extractEntities({ text: text }),
        detectStrategicSignals({ competitorData: text }),
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
