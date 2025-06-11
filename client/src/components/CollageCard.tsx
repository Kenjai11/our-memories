import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Calendar } from 'lucide-react';
import type { Collage } from '@/types/collage';

interface CollageCardProps {
  collage: Collage;
}

export function CollageCard({ collage }: CollageCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{collage.title}</span>
          <Button size="icon" variant="ghost" asChild>
            <Link to={`/love-art/${collage.id}/create`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 flex items-center justify-center mb-4"
          style={{ backgroundColor: collage.background_color }}
        >
          <span className="text-muted-foreground">Love Art Preview</span>
        </div>
        
        {collage.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {collage.description}
          </p>
        )}
        
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(collage.created_at)}
        </div>
      </CardContent>
    </Card>
  );
}
