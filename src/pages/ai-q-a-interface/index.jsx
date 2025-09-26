import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QuestionInput from './components/QuestionInput';
import AnswerCard from './components/AnswerCard';
import ContextAccordion from './components/ContextAccordion';
import ChatHistory from './components/ChatHistory';
import LoadingSpinner from './components/LoadingSpinner';
import QuickActions from './components/QuickActions';

const AIQAInterface = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentContexts, setCurrentContexts] = useState([]);
  const [recentTopics, setRecentTopics] = useState([]);
  const conversationEndRef = useRef(null);

  // Mock data for demonstration
  const mockContexts = [
    {
      source: "Introduction to Machine Learning.pdf",
      content: `Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every task.\n\nThe three main types of machine learning are:\n1. Supervised Learning - Learning with labeled examples\n2. Unsupervised Learning - Finding patterns in unlabeled data\n3. Reinforcement Learning - Learning through trial and error`,
      relevance: 0.95,
      metadata: {
        page: 12,
        section: "Chapter 2: Fundamentals"
      }
    },
    {
      source: "Data Science Fundamentals.pdf",
      content: `Data preprocessing is a crucial step in machine learning that involves cleaning, transforming, and organizing raw data into a format suitable for analysis.\n\nKey preprocessing steps include:\n- Handling missing values\n- Removing duplicates\n- Feature scaling and normalization\n- Encoding categorical variables`,
      relevance: 0.87,
      metadata: {
        page: 45,
        section: "Chapter 5: Data Preparation"
      }
    },
    {
      source: "Statistics for Data Science.pdf",
      content: `Statistical significance helps determine whether observed differences in data are meaningful or due to random chance.\n\nP-values and confidence intervals are commonly used metrics:\n- P-value < 0.05 typically indicates statistical significance\n- 95% confidence intervals provide a range of plausible values`,
      relevance: 0.72,
      metadata: {
        page: 78,
        section: "Chapter 8: Hypothesis Testing"
      }
    }
  ];

  const mockTopics = [
    "Machine Learning", "Data Preprocessing", "Statistical Analysis", 
    "Neural Networks", "Feature Engineering", "Model Validation"
  ];

  useEffect(() => {
    setRecentTopics(mockTopics);
    
    // Load existing conversations from localStorage
    const savedConversations = localStorage.getItem('ai-qa-conversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new conversation is added
    if (conversationEndRef?.current) {
      conversationEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations]);

  const handleSubmitQuestion = async (question) => {
    setIsLoading(true);
    setCurrentContexts(mockContexts);

    // Simulate AI processing delay
    setTimeout(() => {
      const newConversation = {
        id: Date.now(),
        question: question,
        content: `Based on your uploaded materials, here's a comprehensive answer to your question:\n\n${generateMockAnswer(question)}\n\nThis information is derived from your study materials and provides actionable insights for your learning journey.`,
        timestamp: new Date(),
        sources: ["Introduction to Machine Learning.pdf", "Data Science Fundamentals.pdf", "Statistics for Data Science.pdf"]
      };

      const updatedConversations = [...conversations, newConversation];
      setConversations(updatedConversations);
      
      // Save to localStorage
      localStorage.setItem('ai-qa-conversations', JSON.stringify(updatedConversations));
      
      setIsLoading(false);
    }, 2000);
  };

  const generateMockAnswer = (question) => {
    const lowerQuestion = question?.toLowerCase();
    
    if (lowerQuestion?.includes('machine learning') || lowerQuestion?.includes('ml')) {
      return `Machine learning is a powerful approach to artificial intelligence that allows systems to automatically learn and improve from experience. The key concepts include:\n\n1. **Supervised Learning**: Uses labeled training data to learn patterns and make predictions\n2. **Unsupervised Learning**: Discovers hidden patterns in data without labeled examples\n3. **Reinforcement Learning**: Learns optimal actions through trial and error\n\nFor your studies, focus on understanding these fundamental concepts before diving into specific algorithms and implementations.`;
    }
    
    if (lowerQuestion?.includes('study plan') || lowerQuestion?.includes('plan')) {
      return `Based on your uploaded materials, here's a recommended study plan:\n\n**Week 1-2**: Foundation Concepts\n- Review basic statistics and probability\n- Understand data types and structures\n\n**Week 3-4**: Core Machine Learning\n- Supervised learning algorithms\n- Model evaluation techniques\n\n**Week 5-6**: Advanced Topics\n- Unsupervised learning methods\n- Feature engineering techniques\n\n**Week 7-8**: Practical Application\n- Hands-on projects\n- Model deployment concepts`;
    }
    
    if (lowerQuestion?.includes('flashcard') || lowerQuestion?.includes('cards')) {
      return `Here are key flashcard topics from your materials:\n\n**Front**: What is overfitting?\n**Back**: When a model learns training data too well, performing poorly on new data\n\n**Front**: Define cross-validation\n**Back**: A technique to assess model performance by splitting data into multiple train/test sets\n\n**Front**: What is feature scaling?\n**Back**: Normalizing features to similar ranges to improve algorithm performance\n\nI recommend creating 20-30 cards covering the most important concepts from each chapter.`;
    }
    
    return `Thank you for your question about "${question}". Based on your study materials, this topic involves several key concepts that are fundamental to understanding the subject matter.\n\nThe materials suggest focusing on practical applications while building a strong theoretical foundation. Consider reviewing the related sections in your uploaded documents for more detailed explanations.\n\nWould you like me to elaborate on any specific aspect of this topic?`;
  };

  const handleCopyAnswer = async (content) => {
    try {
      await navigator.clipboard?.writeText(content);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadAnswer = (answer) => {
    const content = `Question: ${answer?.question}\n\nAnswer: ${answer?.content}\n\nTimestamp: ${answer?.timestamp}\n\nSources: ${answer?.sources?.join(', ') || 'N/A'}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-answer-${Date.now()}.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSelectConversation = (conversation) => {
    // Scroll to the conversation in the list
    const element = document.getElementById(`conversation-${conversation?.id}`);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleClearHistory = () => {
    setConversations([]);
    localStorage.removeItem('ai-qa-conversations');
    setCurrentContexts([]);
  };

  const handleQuickQuestion = (question) => {
    handleSubmitQuestion(question);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back to Dashboard
              </Button>
              
              <div className="h-6 w-px bg-border"></div>
              
              <div className="flex items-center space-x-2">
                <Icon name="MessageSquare" size={20} className="text-primary" />
                <h1 className="text-xl font-semibold text-foreground">AI Q&A Interface</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/analytics-dashboard')}
                iconName="BarChart3"
                iconPosition="left"
                iconSize={16}
              >
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Quick Actions & History */}
          <div className="lg:col-span-1 space-y-6">
            <QuickActions 
              onQuickQuestion={handleQuickQuestion}
              recentTopics={recentTopics}
            />
            
            <ChatHistory
              conversations={conversations}
              onSelectConversation={handleSelectConversation}
              onClearHistory={handleClearHistory}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Input */}
            <QuestionInput 
              onSubmit={handleSubmitQuestion}
              isLoading={isLoading}
            />

            {/* Context Accordion */}
            {currentContexts?.length > 0 && (
              <ContextAccordion contexts={currentContexts} />
            )}

            {/* Conversation History */}
            <div className="space-y-6">
              {conversations?.length === 0 && !isLoading && (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Icon name="MessageCircle" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Start Your AI Conversation
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Ask questions about your uploaded study materials and get intelligent, 
                    context-aware answers to enhance your learning experience.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion("What are the main topics in my materials?")}
                    >
                      Explore Topics
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion("Create a summary of key concepts")}
                    >
                      Get Summary
                    </Button>
                  </div>
                </div>
              )}

              {conversations?.map((conversation) => (
                <div key={conversation?.id} id={`conversation-${conversation?.id}`}>
                  <AnswerCard
                    answer={conversation}
                    onCopy={handleCopyAnswer}
                    onDownload={handleDownloadAnswer}
                  />
                </div>
              ))}

              {isLoading && <LoadingSpinner />}
              
              <div ref={conversationEndRef} />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Spacing */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default AIQAInterface;