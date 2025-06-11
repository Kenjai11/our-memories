import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Heart } from 'lucide-react';

interface CreateCollageDialogProps {
  onCollageCreated: () => void;
}

export function CreateCollageDialog({ onCollageCreated }: CreateCollageDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!title.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch('/api/collages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
        }),
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        setOpen(false);
        onCollageCreated();
      }
    } catch (error) {
      console.error('Failed to create love art:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          Create Love Art
          <Heart className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-pink-200">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Create Our Love Art</span>
          </DialogTitle>
          <DialogDescription>
            Give your artistic creation a beautiful name and tell the story behind it
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Love Art Title</Label>
            <Input
              id="title"
              placeholder="Our Perfect Weekend, First Date Memories..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border-pink-200 focus:ring-red-500"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Our Story (optional)</Label>
            <Input
              id="description"
              placeholder="What makes these moments special to us..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-pink-200 focus:ring-red-500"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || !title.trim()} className="bg-red-500 hover:bg-red-600">
              {isCreating ? 'Creating Magic...' : 'Create Love Art'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
