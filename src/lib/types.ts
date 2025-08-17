import type { ClassifyCompetitorDataOutput } from '@/ai/flows/classify-competitor-data';
import type { ExtractEntitiesOutput } from '@/ai/flows/extract-entities';
import type { DetectStrategicSignalsOutput } from '@/ai/flows/detect-strategic-signals';

export type AnalysisResult = {
  summary: string;
  classification: ClassifyCompetitorDataOutput;
  entities: ExtractEntitiesOutput;
  strategicInsights: DetectStrategicSignalsOutput;
};
