import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Library } from 'lucide-react';
import type { ExtractEntitiesOutput } from '@/ai/flows/extract-entities';

type EntitiesCardProps = {
  entities: ExtractEntitiesOutput;
};

function EntitySection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={index} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function EntitiesCard({ entities }: EntitiesCardProps) {
  const { companies, locations, technologies } = entities;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Extracted Entities</CardTitle>
        <Library className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <EntitySection title="Companies" items={companies} />
        <EntitySection title="Locations" items={locations} />
        <EntitySection title="Technologies" items={technologies} />
      </CardContent>
    </Card>
  );
}
