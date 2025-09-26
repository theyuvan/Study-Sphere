import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInterface = ({ messages, onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (inputValue?.trim() && !isLoading) {
      onSendMessage(inputValue?.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg flex flex-col h-96">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MessageSquare" size={16} className="text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">AI Study Assistant</h3>
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>Online</span>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center mb-3">
              <Icon name="Bot" size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Start a conversation by asking questions about your uploaded materials
            </p>
          </div>
        ) : (
          messages?.map((message) => (
            <div
              key={message?.id}
              className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message?.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{message?.content}</p>
                {message?.context && (
                  <div className="mt-2 pt-2 border-t border-border/20">
                    <details className="text-xs opacity-80">
                      <summary className="cursor-pointer hover:opacity-100">
                        View context
                      </summary>
                      <div className="mt-1 p-2 bg-black/10 rounded text-xs">
                        {message?.context}
                      </div>
                    </details>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-60">
                    {new Date(message.timestamp)?.toLocaleTimeString()}
                  </span>
                  {message?.sender === 'ai' && (
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => navigator.clipboard?.writeText(message?.content)}
                      iconName="Copy"
                      iconSize={12}
                      className="opacity-60 hover:opacity-100"
                    >
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask a question about your study materials..."
              value={inputValue}
              onChange={(e) => setInputValue(e?.target?.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="border-0 bg-muted focus:bg-background"
            />
          </div>
          <Button
            type="submit"
            disabled={!inputValue?.trim() || isLoading}
            iconName="Send"
            iconSize={16}
            className="px-3"
          >
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;