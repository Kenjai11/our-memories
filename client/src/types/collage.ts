export interface Collage {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
  layout_type: string;
  background_color: string;
}

export interface CollagePhoto {
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
