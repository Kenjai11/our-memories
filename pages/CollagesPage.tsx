import * as React from 'react';
import { CollageGrid } from '@/components/CollageGrid';
import { CreateCollageDialog } from '@/components/CreateCollageDialog';
import { useCollages } from '@/hooks/useCollages';
import { Heart, Sparkles } from 'lucide-react';

export function CollagesPage() {
  const { collages, isLoading, refreshCollages } = useCollages();

  const handleCollageCreated = () => {
    refreshCollages();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="text-center flex-1">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <Sparkles className="h-6 w-6 text-pink-400" />
          </div>
          <h1 className="text-3xl font-bold">Our Love Art Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            Create artistic masterpieces from our precious moments, Donna. Each collage is a canvas of our love story.
          </p>
        </div>
        <CreateCollageDialog onCollageCreated={handleCollageCreated} />
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 text-center border border-pink-200">
        <p className="text-pink-700 italic">
          "Every love art we create together becomes a masterpiece, just like our love story" 💕
        </p>
      </div>

      <CollageGrid collages={collages} isLoading={isLoading} />
    </div>
  );
}
