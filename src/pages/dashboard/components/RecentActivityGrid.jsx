import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityGrid = ({ uploadedFiles, recentQuestions }) => {
  const [activeTab, setActiveTab] = useState('files');

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'FileText';
      case 'txt':
        return 'File';
      default:
        return 'File';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'processing':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'processing':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header with Tabs */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreHorizontal"
            iconSize={16}
          >
          </Button>
        </div>
        
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('files')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-micro ${
              activeTab === 'files' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Upload" size={14} />
              <span>Files ({uploadedFiles?.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-micro ${
              activeTab === 'questions' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="MessageSquare" size={14} />
              <span>Questions ({recentQuestions?.length})</span>
            </div>
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {activeTab === 'files' ? (
          <div className="space-y-3">
            {uploadedFiles?.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center mb-3">
                  <Icon name="Upload" size={24} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No files uploaded yet</p>
              </div>
            ) : (
              uploadedFiles?.map((file) => (
                <div
                  key={file?.id}
                  className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-micro"
                >
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Icon name={getFileIcon(file?.name)} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file?.name}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(file?.size)}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(file?.uploadedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon
                      name={getStatusIcon(file?.status)}
                      size={16}
                      className={getStatusColor(file?.status)}
                    />
                    <span className={`text-xs font-medium ${getStatusColor(file?.status)}`}>
                      {file?.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {recentQuestions?.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center mb-3">
                  <Icon name="MessageSquare" size={24} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No questions asked yet</p>
              </div>
            ) : (
              recentQuestions?.map((question) => (
                <div
                  key={question?.id}
                  className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-micro"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="HelpCircle" size={14} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground line-clamp-2">
                        {question?.question}
                      </p>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                        <span>{question?.topic}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(question?.timestamp)}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="ExternalLink"
                      iconSize={12}
                      className="opacity-60 hover:opacity-100"
                    >
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityGrid;