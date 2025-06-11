import * as React from 'react';
import { PhotoUpload } from '@/components/PhotoUpload';
import { PhotoGrid } from '@/components/PhotoGrid';
import { usePhotos } from '@/hooks/usePhotos';
import { Heart } from 'lucide-react';

export function GalleryPage() {
  const { photos, isLoading, refreshPhotos } = usePhotos();

  const handleUploadSuccess = () => {
    refreshPhotos();
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Heart className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold">Our Memory Vault</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every picture and video tells a piece of our story, Donna. This is where our beautiful moments live forever, 
          safely kept in this space I made just for us.
        </p>
      </div>

      <PhotoUpload onUploadSuccess={handleUploadSuccess} />

      <div className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Our Beautiful Memories Together
          <Heart className="h-5 w-5 text-red-500 inline ml-2" />
        </h2>
        <PhotoGrid photos={photos} isLoading={isLoading} onPhotoDeleted={refreshPhotos} />
      </div>
    </div>
  );
}
