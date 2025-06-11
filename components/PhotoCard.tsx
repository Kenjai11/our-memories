import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Play } from 'lucide-react';
import type { Photo } from '@/types/photo';

interface PhotoCardProps {
  photo: Photo;
  onPhotoDeleted: () => void;
}

export function PhotoCard({ photo, onPhotoDeleted }: PhotoCardProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    const mediaType = photo.media_type === 'video' ? 'video' : 'photo';
    if (!confirm(`Are you sure you want to delete this ${mediaType}?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/photos/${photo.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onPhotoDeleted();
      }
    } catch (error) {
      console.error('Failed to delete media:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const isVideo = photo.media_type === 'video';

  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="aspect-square overflow-hidden">
          {isVideo ? (
            <div className="relative w-full h-full">
              <video
                src={photo.file_path}
                className="w-full h-full object-cover"
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
          ) : (
            <img
              src={photo.file_path}
              alt={photo.description || photo.original_name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        {photo.description && (
          <div className="p-3">
            <p className="text-sm text-muted-foreground truncate">
              {photo.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
