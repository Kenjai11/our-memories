'use client';

import { useState } from 'react';

export default function PhotoUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setUploading(true);
    try {
      // TODO: Implement actual upload logic
      console.log('Uploading files:', selectedFiles);
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Files uploaded successfully!');
      setSelectedFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
    }}>
      <div style={{
        maxWidth: '40rem',
        width: '100%',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#6366f1',
        }}>Share Your Memories</h1>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '20rem',
            aspectRatio: '1',
            backgroundColor: '#f3f4f6',
            borderRadius: '1rem',
            border: '2px dashed #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer',
              }}
            />
            <div style={{
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '0.5rem',
              }}>+</div>
              <p style={{
                color: '#64748b',
                fontSize: '0.875rem',
                marginBottom: '0.25rem',
              }}>Drop your photos and videos here</p>
              <p style={{
                color: '#64748b',
                fontSize: '0.875rem',
              }}>or click to select files</p>
            </div>
            {selectedFiles.length > 0 && (
              <div style={{
                marginTop: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
              }}>
                {selectedFiles.map((file, index) => (
                  <div key={index} style={{
                    position: 'relative',
                  }}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{
                        width: '100%',
                        height: '6rem',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                    }}>
                      {file.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || uploading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6366f1',
              color: 'white',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: 500,
              transition: 'background-color 0.2s ease',
              opacity: selectedFiles.length === 0 || uploading ? 0.5 : 1,
              cursor: selectedFiles.length === 0 || uploading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {uploading ? (
              <>
                <svg style={{
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem',
                  height: '1rem',
                  width: '1rem',
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Uploading...
              </>
            ) : (
              `Upload ${selectedFiles.length} ${selectedFiles.length === 1 ? 'file' : 'files'}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
