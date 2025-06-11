import * as React from 'react';
import { useParams } from 'react-router-dom';
import { CollageEditor } from '@/components/CollageEditor';

export function CollageEditorPage() {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Love art not found</div>;
  }

  return <CollageEditor collageId={parseInt(id)} />;
}
