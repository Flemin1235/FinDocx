import React, { useRef } from 'react';
import type { UploadState } from '../types';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  uploadState: UploadState;
  setUploadState: (state: UploadState) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUpload,
  uploadState,
  setUploadState,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (uploadState === 'idle') {
      setUploadState('dragging');
    }
  };

  const handleDragLeave = () => {
    setUploadState('idle');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadState('idle');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        onUpload(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        onUpload(file);
      }
    }
  };

  const getUploadText = () => {
    switch (uploadState) {
      case 'dragging':
        return 'Drop PDF file here';
      case 'uploading':
        return 'Uploading PDF...';
      case 'success':
        return 'PDF uploaded successfully!';
      case 'error':
        return 'Upload failed. Try again';
      default:
        return 'Upload Financial Document';
    }
  };

  const getUploadHint = () => {
    switch (uploadState) {
      case 'dragging':
        return 'Release to upload';
      case 'uploading':
        return 'Please wait while processing';
      case 'success':
        return 'Click to upload another file';
      case 'error':
        return 'Supported format: PDF only';
      default:
        return 'Drag and drop or click to browse (PDF only, max 10MB)';
    }
  };

  return (
    <div
      className="upload-section"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="upload-placeholder">
        <svg
          className="upload-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="upload-text">{getUploadText()}</p>
        <p className="upload-hint">{getUploadHint()}</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,application/pdf"
        onChange={handleFileSelect}
      />
    </div>
  );
};
