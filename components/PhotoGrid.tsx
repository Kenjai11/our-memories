import * as React from 'react';
import { PhotoCard } from '@/components/PhotoCard';
import type { Photo } from '@/types/photo';
import { Heart } from 'lucide-react';

interface PhotoGridProps {
  photos: Photo[];
  isLoading: boolean;
  onPhotoDeleted: () => void;
}

export function PhotoGrid({ photos, isLoading, onPhotoDeleted }: PhotoGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-12 w-12 text-red-300 mx-auto mb-4" />
        <p className="text-muted-foreground text-lg">Our memory vault is waiting for its first treasure</p>
        <p className="text-sm text-muted-foreground">Upload a photo or video to start building our collection, Donna</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <PhotoCard 
          key={photo.id} 
          photo={photo} 
          onPhotoDeleted={onPhotoDeleted}
        />
      ))}
    </div>
  );
}
