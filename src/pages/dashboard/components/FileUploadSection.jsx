import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadSection = ({ onFileUpload, uploadProgress, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files?.filter(file => {
      const isValidType = file?.type === 'application/pdf' || file?.type === 'text/plain';
      const isValidSize = file?.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });

    if (validFiles?.length > 0) {
      onFileUpload(validFiles);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Upload Study Materials</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="FileText" size={16} />
          <span>PDF, TXT files only</span>
        </div>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
        } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">Uploading files...</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">
                Drag and drop your files here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse your computer
              </p>
            </div>
            <Button
              variant="outline"
              onClick={openFileDialog}
              iconName="FolderOpen"
              iconPosition="left"
              iconSize={16}
            >
              Choose Files
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="CheckCircle" size={12} className="text-success" />
          <span>PDF files supported</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="CheckCircle" size={12} className="text-success" />
          <span>Text files supported</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="AlertCircle" size={12} className="text-warning" />
          <span>Max 10MB per file</span>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;