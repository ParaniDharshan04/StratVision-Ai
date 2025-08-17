'use client';

import { useActionState, useTransition } from 'react';
import { StratvisionLogo } from '@/components/stratvision-logo';
import { CompetitorForm } from '@/components/competitor-form';
import { ResultsDashboard } from '@/components/results-dashboard';
import { analyzeCompetitorData, type FormState } from '@/app/actions';

const initialState: FormState = {
  result: null,
  error: null,
};

export default function Home() {
  const [state, formAction, isPending] = useActionState(analyzeCompetitorData, initialState);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-2">
          <StratvisionLogo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">StratVision AI</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 lg:flex-row">
        <div className="flex-shrink-0 lg:w-1/3 xl:w-1/4">
          <CompetitorForm action={formAction} isPending={isPending} />
        </div>
        <div className="flex-1">
          <ResultsDashboard result={state.result} error={state.error} isPending={isPending} />
        </div>
      </main>
    </div>
  );
}
