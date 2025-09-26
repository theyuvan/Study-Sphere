import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ChatHistory = ({ conversations, onSelectConversation, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredConversations = conversations?.filter(conv =>
    conv?.question?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    conv?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="History" size={18} className="text-primary" />
            <h3 className="font-semibold text-foreground">Chat History</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {conversations?.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
            >
            </Button>
            
            {conversations?.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearHistory}
                iconName="Trash2"
                iconSize={16}
                className="text-destructive hover:text-destructive"
              >
              </Button>
            )}
          </div>
        </div>

        {isExpanded && (
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        )}
      </div>
      {/* Conversation List */}
      {isExpanded && (
        <div className="max-h-96 overflow-y-auto scrollbar-thin">
          {filteredConversations?.length === 0 ? (
            <div className="p-6 text-center">
              <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {searchTerm ? 'No conversations match your search' : 'No conversations yet'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredConversations?.map((conversation, index) => (
                <button
                  key={conversation?.id}
                  onClick={() => onSelectConversation(conversation)}
                  className="w-full p-4 text-left hover:bg-muted/50 transition-micro focus:outline-none focus:bg-muted/50"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageCircle" size={16} className="text-secondary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate mb-1">
                        {conversation?.question}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {conversation?.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(conversation?.timestamp)}
                        </span>
                        
                        {conversation?.sources && conversation?.sources?.length > 0 && (
                          <div className="flex items-center space-x-1 text-xs text-accent">
                            <Icon name="FileText" size={12} />
                            <span>{conversation?.sources?.length} sources</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;