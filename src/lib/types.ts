import type { ClassifyTextCorpusOutput } from '@/ai/flows/classify-input-information';
import type { ExtractEntitiesOutput } from '@/ai/flows/extract-entities';
import type { DetectStrategicSignalsOutput } from '@/ai/flows/detect-strategic-signals';

export type AnalysisResult = {
  summary: string;
  classification: ClassifyTextCorpusOutput;
  entities: ExtractEntitiesOutput;
  strategicInsights: DetectStrategicSignalsOutput;
};
