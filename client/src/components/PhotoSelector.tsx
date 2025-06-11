import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Heart, Play } from 'lucide-react';
import { usePhotos } from '@/hooks/usePhotos';

interface PhotoSelectorProps {
  onPhotoSelect: (photoId: number) => void;
}

export function PhotoSelector({ onPhotoSelect }: PhotoSelectorProps) {
  const { photos, isLoading } = usePhotos();

  if (isLoading) {
    return (
      <Card className="border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Add Our Memories</span>
            <Heart className="h-4 w-4 text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-pink-200 bg-gradient-to-b from-pink-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Add Our Memories</span>
          <Heart className="h-4 w-4 text-red-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {photos.length === 0 ? (
          <div className="text-center py-6">
            <Heart className="h-8 w-8 text-pink-300 mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              No memories in our vault yet.
            </p>
            <p className="text-pink-600 text-xs mt-1">
              Upload some beautiful photos and videos first! 💕
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {photos.map((photo) => (
              <div key={photo.id} className="flex items-center space-x-2 p-2 border border-pink-200 rounded-lg bg-white hover:bg-pink-50 transition-colors">
                <div className="relative w-12 h-12">
                  {photo.media_type === 'video' ? (
                    <div className="relative w-full h-full">
                      <video
                        src={photo.file_path}
                        className="w-12 h-12 object-cover rounded border border-pink-200"
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded">
                        <Play className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={photo.file_path}
                      alt={photo.original_name}
                      className="w-12 h-12 object-cover rounded border border-pink-200"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {photo.description || photo.original_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {photo.media_type === 'video' ? 'Video' : 'Photo'}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onPhotoSelect(photo.id)}
                  className="border-red-300 text-red-500 hover:bg-red-50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
