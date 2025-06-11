import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';
import { setupStaticServing } from './static-serve.js';
import { db } from './db/database.js';

dotenv.config();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup multer for file uploads
const dataDirectory = process.env.DATA_DIRECTORY || './data';
const uploadsDirectory = path.join(dataDirectory, 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'));
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit for videos
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDirectory));

// Get all photos/videos
app.get('/api/photos', async (req, res) => {
  try {
    console.log('Fetching all media...');
    const photos = await db
      .selectFrom('photos')
      .selectAll()
      .orderBy('uploaded_at', 'desc')
      .execute();
    
    console.log(`Found ${photos.length} media files`);
    res.json(photos);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// Upload photo/video
app.post('/api/photos/upload', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Uploading media:', req.file.originalname);
    
    const mediaType = req.file.mimetype.startsWith('video/') ? 'video' : 'photo';
    
    const photo = await db
      .insertInto('photos')
      .values({
        filename: req.file.filename,
        original_name: req.file.originalname,
        file_path: `/uploads/${req.file.filename}`,
        file_size: req.file.size,
        mime_type: req.file.mimetype,
        media_type: mediaType,
        description: req.body.description || null,
        tags: req.body.tags || null
      })
      .returning(['id', 'filename', 'original_name', 'file_path', 'uploaded_at', 'media_type'])
      .executeTakeFirst();

    console.log('Media uploaded successfully:', photo);
    res.json(photo);
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).json({ error: 'Failed to upload media' });
  }
});

// Delete photo/video
app.delete('/api/photos/:id', async (req, res) => {
  try {
    const photoId = parseInt(req.params.id);
    console.log('Deleting media with ID:', photoId);
    
    await db
      .deleteFrom('photos')
      .where('id', '=', photoId)
      .execute();
    
    console.log('Media deleted successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

// Get all collages
app.get('/api/collages', async (req, res) => {
  try {
    console.log('Fetching all collages...');
    const collages = await db
      .selectFrom('collages')
      .selectAll()
      .orderBy('created_at', 'desc')
      .execute();
    
    console.log(`Found ${collages.length} collages`);
    res.json(collages);
  } catch (error) {
    console.error('Error fetching collages:', error);
    res.status(500).json({ error: 'Failed to fetch collages' });
  }
});

// Create collage
app.post('/api/collages', async (req, res) => {
  try {
    const { title, description, layout_type, background_color } = req.body;
    console.log('Creating collage:', title);
    
    const collage = await db
      .insertInto('collages')
      .values({
        title,
        description: description || null,
        layout_type: layout_type || 'grid',
        background_color: background_color || '#ffffff'
      })
      .returning(['id', 'title', 'description', 'created_at', 'layout_type', 'background_color'])
      .executeTakeFirst();

    console.log('Collage created successfully:', collage);
    res.json(collage);
  } catch (error) {
    console.error('Error creating collage:', error);
    res.status(500).json({ error: 'Failed to create collage' });
  }
});

// Get collage with photos/videos
app.get('/api/collages/:id', async (req, res) => {
  try {
    const collageId = parseInt(req.params.id);
    console.log('Fetching collage with ID:', collageId);
    
    const collage = await db
      .selectFrom('collages')
      .selectAll()
      .where('id', '=', collageId)
      .executeTakeFirst();
    
    if (!collage) {
      return res.status(404).json({ error: 'Collage not found' });
    }
    
    const collagePhotos = await db
      .selectFrom('collage_photos')
      .innerJoin('photos', 'photos.id', 'collage_photos.photo_id')
      .selectAll()
      .where('collage_id', '=', collageId)
      .orderBy('z_index', 'asc')
      .execute();
    
    console.log(`Found collage with ${collagePhotos.length} media files`);
    res.json({ ...collage, photos: collagePhotos });
  } catch (error) {
    console.error('Error fetching collage:', error);
    res.status(500).json({ error: 'Failed to fetch collage' });
  }
});

// Add photo/video to collage
app.post('/api/collages/:id/photos', async (req, res) => {
  try {
    const collageId = parseInt(req.params.id);
    const { photo_id, position_x, position_y, width, height, rotation, z_index } = req.body;
    
    console.log('Adding media to collage:', { collageId, photo_id });
    
    const collagePhoto = await db
      .insertInto('collage_photos')
      .values({
        collage_id: collageId,
        photo_id,
        position_x: position_x || 0,
        position_y: position_y || 0,
        width: width || 100,
        height: height || 100,
        rotation: rotation || 0,
        z_index: z_index || 0
      })
      .returning(['id'])
      .executeTakeFirst();

    console.log('Media added to collage successfully');
    res.json(collagePhoto);
  } catch (error) {
    console.error('Error adding media to collage:', error);
    res.status(500).json({ error: 'Failed to add media to collage' });
  }
});

// Export a function to start the server
export async function startServer(port) {
  try {
    if (process.env.NODE_ENV === 'production') {
      setupStaticServing(app);
    }
    app.listen(port, () => {
      console.log(`API Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Start the server directly if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Starting server...');
  startServer(process.env.PORT || 3001);
}
