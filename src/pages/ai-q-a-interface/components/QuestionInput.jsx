import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuestionInput = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');
  const maxLength = 500;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (question?.trim() && !isLoading) {
      onSubmit(question?.trim());
      setQuestion('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about your uploaded materials..."
            className="w-full min-h-[120px] p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro"
            maxLength={maxLength}
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {question?.length}/{maxLength}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Lightbulb" size={16} />
            <span>Press Enter to submit, Shift+Enter for new line</span>
          </div>
          
          <Button
            type="submit"
            variant="default"
            disabled={!question?.trim() || isLoading}
            loading={isLoading}
            iconName="Send"
            iconPosition="right"
            iconSize={16}
          >
            Ask Question
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionInput;