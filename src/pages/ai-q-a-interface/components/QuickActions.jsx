import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onQuickQuestion, recentTopics }) => {
  const suggestedQuestions = [
    "Summarize the key concepts from my notes",
    "What are the main topics I should focus on?",
    "Create practice questions from my materials",
    "Explain the most complex topics in simple terms"
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Sparkles" size={18} className="text-accent" />
        <h3 className="font-semibold text-foreground">Quick Actions</h3>
      </div>
      {/* Suggested Questions */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-muted-foreground">Suggested Questions</h4>
        <div className="grid gap-2">
          {suggestedQuestions?.map((question, index) => (
            <button
              key={index}
              onClick={() => onQuickQuestion(question)}
              className="text-left p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-micro border border-transparent hover:border-border"
            >
              <div className="flex items-start space-x-2">
                <Icon name="MessageSquare" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{question}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Topics */}
      {recentTopics && recentTopics?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Recent Topics</h4>
          <div className="flex flex-wrap gap-2">
            {recentTopics?.map((topic, index) => (
              <button
                key={index}
                onClick={() => onQuickQuestion(`Tell me more about ${topic}`)}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm transition-micro"
              >
                <Icon name="Tag" size={12} />
                <span>{topic}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuickQuestion("Create a study plan based on my materials")}
          iconName="Calendar"
          iconPosition="left"
          iconSize={14}
        >
          Study Plan
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuickQuestion("Generate flashcards from my notes")}
          iconName="Layers"
          iconPosition="left"
          iconSize={14}
        >
          Flashcards
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuickQuestion("What topics need more review?")}
          iconName="Target"
          iconPosition="left"
          iconSize={14}
        >
          Review
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;