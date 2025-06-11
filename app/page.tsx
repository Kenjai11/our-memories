import { Metadata } from 'next';
import AboutUs from '@/components/AboutUs';
import PhotoUpload from '@/components/PhotoUpload';
import MemoryTimeline from '@/components/MemoryTimeline';

export const metadata: Metadata = {
  title: 'Our Memories',
  description: 'A special collection of our memories together',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            Our Beautiful Memories
          </h1>
          <p className="text-xl text-gray-700">
            A special collection of our moments together
          </p>
        </header>

        <AboutUs />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PhotoUpload />
          <MemoryTimeline />
        </div>
      </div>
    </main>
  );
}
