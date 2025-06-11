import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { GalleryPage } from '@/pages/GalleryPage';
import { CollagesPage } from '@/pages/CollagesPage';
import { CollageEditorPage } from '@/pages/CollageEditorPage';
import { Navigation } from '@/components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/our-love" element={<HomePage />} />
            <Route path="/memories" element={<GalleryPage />} />
            <Route path="/love-art" element={<CollagesPage />} />
            <Route path="/love-art/:id/create" element={<CollageEditorPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
