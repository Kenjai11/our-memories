import * as React from 'react';
import type { Photo } from '@/types/photo';

export function usePhotos() {
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPhotos();
  }, []);

  const refreshPhotos = () => {
    setIsLoading(true);
    fetchPhotos();
  };

  return {
    photos,
    isLoading,
    refreshPhotos,
  };
}
