import * as React from 'react';
import { CollageCard } from '@/components/CollageCard';
import type { Collage } from '@/types/collage';
import { Heart, Sparkles } from 'lucide-react';

interface CollageGridProps {
  collages: Collage[];
  isLoading: boolean;
}

export function CollageGrid({ collages, isLoading }: CollageGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-video bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (collages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Heart className="h-12 w-12 text-red-300" />
          <Sparkles className="h-8 w-8 text-pink-300" />
        </div>
        <p className="text-muted-foreground text-lg">Ready to create our first masterpiece?</p>
        <p className="text-sm text-muted-foreground">Let's turn our beautiful photos into artistic collages, my love</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {collages.map((collage) => (
        <CollageCard key={collage.id} collage={collage} />
      ))}
    </div>
  );
}
