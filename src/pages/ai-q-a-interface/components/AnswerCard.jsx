import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AnswerCard = ({ answer, onCopy, onDownload }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy(answer?.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      {/* Question Header */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={16} color="white" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{answer?.question}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatTimestamp(answer?.timestamp)}
          </p>
        </div>
      </div>
      {/* AI Answer */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                {answer?.content}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              iconName={isCopied ? "Check" : "Copy"}
              iconPosition="left"
              iconSize={14}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDownload(answer)}
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Download
            </Button>
            
            <div className="flex items-center space-x-1 text-xs text-muted-foreground ml-auto">
              <Icon name="Clock" size={12} />
              <span>{formatTimestamp(answer?.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Source References */}
      {answer?.sources && answer?.sources?.length > 0 && (
        <div className="border-t border-border pt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileText" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Source Materials</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {answer?.sources?.map((source, index) => (
              <div
                key={index}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent rounded-md text-xs"
              >
                <Icon name="File" size={12} />
                <span>{source}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerCard;