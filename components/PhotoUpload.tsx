import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Camera, Heart, Video } from 'lucide-react';

interface PhotoUploadProps {
  onUploadSuccess: () => void;
}

export function PhotoUpload({ onUploadSuccess }: PhotoUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('photo', file);
      if (description) {
        formData.append('description', description);
      }

      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setDescription('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        onUploadSuccess();
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-red-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="flex">
            <Camera className="h-5 w-5 text-red-500" />
            <Video className="h-4 w-4 text-red-400 -ml-1 mt-0.5" />
          </div>
          <span>Add a New Memory</span>
          <Heart className="h-4 w-4 text-red-500" />
        </CardTitle>
        <CardDescription>
          Upload another beautiful photo or video from our journey together, my love
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="description">Tell our story (optional)</Label>
          <Input
            id="description"
            placeholder="What made this moment special for us..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-pink-200 focus:ring-red-500"
          />
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button 
          onClick={handleUploadClick}
          disabled={isUploading}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isUploading ? 'Saving Our Memory...' : 'Choose Photo or Video'}
        </Button>
      </CardContent>
    </Card>
  );
}
