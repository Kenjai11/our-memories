import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Home, Camera, Image } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const isActive = (paths: string[]) => paths.includes(location.pathname);

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/our-love" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold">Kenji & Donna</span>
            <Heart className="h-4 w-4 text-red-500" />
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button
              variant={isActive(['/', '/our-love']) ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/our-love">
                <Home className="h-4 w-4 mr-2" />
                Our Love
              </Link>
            </Button>
            
            <Button
              variant={isActive(['/memories']) ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/memories">
                <Camera className="h-4 w-4 mr-2" />
                Memories
              </Link>
            </Button>
            
            <Button
              variant={isActive(['/love-art']) ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/love-art">
                <Image className="h-4 w-4 mr-2" />
                Love Art
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
