import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoSelector } from '@/components/PhotoSelector';
import { ArrowLeft, Heart, Sparkles, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CollageEditorProps {
  collageId: number;
}

export function CollageEditor({ collageId }: CollageEditorProps) {
  const [collage, setCollage] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCollage = async () => {
      try {
        const response = await fetch(`/api/collages/${collageId}`);
        if (response.ok) {
          const data = await response.json();
          setCollage(data);
        }
      } catch (error) {
        console.error('Failed to fetch love art:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollage();
  }, [collageId]);

  const handleAddPhoto = async (photoId: number) => {
    try {
      const response = await fetch(`/api/collages/${collageId}/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photo_id: photoId,
          position_x: Math.random() * 200,
          position_y: Math.random() * 200,
          width: 150,
          height: 150,
        }),
      });

      if (response.ok) {
        // Refresh love art data
        const collageResponse = await fetch(`/api/collages/${collageId}`);
        if (collageResponse.ok) {
          const data = await collageResponse.json();
          setCollage(data);
        }
      }
    } catch (error) {
      console.error('Failed to add media to love art:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Heart className="h-8 w-8 text-red-500 mx-auto mb-2 animate-pulse" />
          <p>Loading our creative space...</p>
        </div>
      </div>
    );
  }

  if (!collage) {
    return (
      <div className="text-center py-12">
        <Heart className="h-12 w-12 text-red-300 mx-auto mb-4" />
        <p>Love art not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild className="border-pink-200">
            <Link to="/love-art">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">{collage.title}</h1>
              <Heart className="h-5 w-5 text-red-500" />
              <Sparkles className="h-4 w-4 text-pink-400" />
            </div>
            {collage.description && (
              <p className="text-muted-foreground italic">{collage.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 text-center border border-pink-200">
        <p className="text-pink-700 text-sm italic">
          "Creating beautiful art from our beautiful memories" 💕
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Our Love Canvas</span>
                <Heart className="h-5 w-5 text-red-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="relative w-full aspect-video border-2 border-dashed border-pink-300 rounded-lg overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50"
                style={{ backgroundColor: collage.background_color }}
              >
                {collage.photos?.map((photo: any) => (
                  <div
                    key={photo.id}
                    className="absolute border-2 border-red-400 rounded shadow-lg"
                    style={{
                      left: `${photo.position_x}px`,
                      top: `${photo.position_y}px`,
                      width: `${photo.width}px`,
                      height: `${photo.height}px`,
                      transform: `rotate(${photo.rotation}deg)`,
                      zIndex: photo.z_index,
                    }}
                  >
                    {photo.media_type === 'video' ? (
                      <div className="relative w-full h-full">
                        <video
                          src={photo.file_path}
                          className="w-full h-full object-cover rounded"
                          preload="metadata"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={photo.file_path}
                        alt={photo.original_name}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                ))}
                
                {collage.photos?.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Heart className="h-12 w-12 text-pink-300 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Ready to add our beautiful photos and videos to this canvas?
                      </p>
                      <p className="text-sm text-pink-600 mt-2">
                        Select media from the panel to start creating magic ✨
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <PhotoSelector onPhotoSelect={handleAddPhoto} />
        </div>
      </div>
    </div>
  );
}
