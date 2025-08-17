import { config } from 'dotenv';
config();

import '@/ai/flows/extract-entities.ts';
import '@/ai/flows/summarize-competitor-data.ts';
import '@/ai/flows/classify-competitor-data.ts';
import '@/ai/flows/detect-strategic-signals.ts';