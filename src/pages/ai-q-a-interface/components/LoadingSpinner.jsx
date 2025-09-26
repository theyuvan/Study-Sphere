import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ message = "Processing your question..." }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-muted-foreground">{message}</span>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground flex items-center space-x-2">
            <Icon name="Zap" size={12} />
            <span>AI is analyzing your materials...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 