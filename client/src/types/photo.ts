export interface Photo {
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
