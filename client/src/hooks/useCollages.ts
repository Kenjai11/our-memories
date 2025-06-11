import * as React from 'react';
import type { Collage } from '@/types/collage';

export function useCollages() {
  const [collages, setCollages] = React.useState<Collage[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchCollages = async () => {
    try {
      const response = await fetch('/api/collages');
      if (response.ok) {
        const data = await response.json();
        setCollages(data);
      }
    } catch (error) {
      console.error('Failed to fetch collages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCollages();
  }, []);

  const refreshCollages = () => {
    setIsLoading(true);
    fetchCollages();
  };

  return {
    collages,
    isLoading,
    refreshCollages,
  };
}
