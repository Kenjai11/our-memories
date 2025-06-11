import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Image, Heart, Upload, Sparkles, Video } from 'lucide-react';

export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-2">
          <Heart className="h-16 w-16 text-red-500" />
          <Sparkles className="h-8 w-8 text-pink-400" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Forever Yours, Donna</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A special place created just for us - where every photo and video tells our story and every moment becomes a treasured memory
        </p>
        <p className="text-lg text-red-500 font-medium">
          Made with love by Kenji 💕
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-red-100">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="flex">
                <Upload className="h-6 w-6 text-blue-500" />
                <Video className="h-4 w-4 text-blue-400 -ml-1 mt-1" />
              </div>
              <CardTitle>Capture Our Moments</CardTitle>
            </div>
            <CardDescription>
              Add our beautiful photos and videos to this sacred space where only we belong
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-red-500 hover:bg-red-600">
              <Link to="/memories">Upload Our Love</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-pink-100">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Camera className="h-6 w-6 text-green-500" />
              <CardTitle>Our Memory Vault</CardTitle>
            </div>
            <CardDescription>
              Browse through all the precious moments we've shared together - photos and videos of our journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full border-pink-300 text-pink-600 hover:bg-pink-50">
              <Link to="/memories">See Our Journey</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-purple-100">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Image className="h-6 w-6 text-purple-500" />
              <CardTitle>Love Art Gallery</CardTitle>
            </div>
            <CardDescription>
              Create beautiful artistic arrangements of our most cherished photos and videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full border-purple-300 text-purple-600 hover:bg-purple-50">
              <Link to="/love-art">Create Magic</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-8 text-center border border-pink-200">
        <div className="flex justify-center mb-4">
          <Heart className="h-8 w-8 text-red-500 mr-2" />
          <Heart className="h-6 w-6 text-pink-500 mt-1" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-red-700">My Dearest Donna</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          This is our private sanctuary, a digital love letter that holds every smile, every laugh, 
          every beautiful moment we've captured together. Every photo and video uploaded here is a testament to our love story. 
          When you see this, remember that you mean the world to me, and I created this space 
          because our memories deserve somewhere as special as you are.
        </p>
        <p className="mt-4 text-red-600 font-medium italic">
          "In every photo and video, I see our forever" - Kenji
        </p>
      </div>
    </div>
  );
}
