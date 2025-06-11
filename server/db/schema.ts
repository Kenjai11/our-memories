export interface PhotosTable {
  id: number;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
  description: string | null;
  tags: string | null;
  media_type: string;
}

export interface CollagesTable {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
  layout_type: string;
  background_color: string;
}

export interface CollagePhotosTable {
  id: number;
  collage_id: number;
  photo_id: number;
  position_x: number;
  position_y: number;
  width: number;
  height: number;
  rotation: number;
  z_index: number;
}

export interface DatabaseSchema {
  photos: PhotosTable;
  collages: CollagesTable;
  collage_photos: CollagePhotosTable;
}
