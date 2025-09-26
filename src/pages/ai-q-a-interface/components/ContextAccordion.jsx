import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ContextAccordion = ({ contexts }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(index)) {
      newExpanded?.delete(index);
    } else {
      newExpanded?.add(index);
    }
    setExpandedItems(newExpanded);
  };

  if (!contexts || contexts?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="BookOpen" size={18} className="text-primary" />
          <h3 className="font-semibold text-foreground">Context Snippets</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {contexts?.length} sources
          </span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {contexts?.map((context, index) => (
          <div key={index} className="transition-micro">
            <button
              onClick={() => toggleExpanded(index)}
              className="w-full p-4 text-left hover:bg-muted/50 transition-micro focus:outline-none focus:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{context?.source}</p>
                    <p className="text-sm text-muted-foreground">
                      Relevance: {Math.round(context?.relevance * 100)}%
                    </p>
                  </div>
                </div>
                <Icon
                  name="ChevronDown"
                  size={18}
                  className={`text-muted-foreground transition-transform duration-200 ${
                    expandedItems?.has(index) ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {expandedItems?.has(index) && (
              <div className="px-4 pb-4 animate-fade-in">
                <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-accent">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {context?.content}
                  </p>
                  
                  {context?.metadata && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {context?.metadata?.page && (
                          <span className="flex items-center space-x-1">
                            <Icon name="Hash" size={12} />
                            <span>Page {context?.metadata?.page}</span>
                          </span>
                        )}
                        {context?.metadata?.section && (
                          <span className="flex items-center space-x-1">
                            <Icon name="Bookmark" size={12} />
                            <span>{context?.metadata?.section}</span>
                          </span>
                        )}
                        <span className="flex items-center space-x-1">
                          <Icon name="Target" size={12} />
                          <span>{Math.round(context?.relevance * 100)}% match</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContextAccordion;