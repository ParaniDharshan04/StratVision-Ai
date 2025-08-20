import { config } from 'dotenv';
config();

import '@/ai/flows/extract-entities.ts';
import '@/ai/flows/summarize-input-information.ts';
import '@/ai/flows/classify-input-information.ts';
import '@/ai/flows/detect-strategic-signals.ts';
