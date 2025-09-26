import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import FileUploadSection from './components/FileUploadSection';
import ChatInterface from './components/ChatInterface';
import RecentActivityGrid from './components/RecentActivityGrid';
import QuickStatsCards from './components/QuickStatsCards';

const Dashboard = () => {
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Mock data for dashboard
  const [stats] = useState({
    filesUploaded: 24,
    questionsAsked: 156,
    topicsCovered: 12,
    studyStreak: 7
  });

  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "Advanced Calculus Notes.pdf",
      size: 2048576,
      status: "completed",
      uploadedAt: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 2,
      name: "Physics Chapter 5.txt",
      size: 512000,
      status: "processing",
      uploadedAt: new Date(Date.now() - 900000) // 15 minutes ago
    },
    {
      id: 3,
      name: "Chemistry Lab Report.pdf",
      size: 1536000,
      status: "completed",
      uploadedAt: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 4,
      name: "History Essay Draft.txt",
      size: 256000,
      status: "failed",
      uploadedAt: new Date(Date.now() - 7200000) // 2 hours ago
    }
  ]);

  const [recentQuestions] = useState([
    {
      id: 1,
      question: "What are the key principles of integration by parts?",
      topic: "Calculus",
      timestamp: new Date(Date.now() - 1200000) // 20 minutes ago
    },
    {
      id: 2,
      question: "Explain the concept of electromagnetic induction",
      topic: "Physics",
      timestamp: new Date(Date.now() - 2400000) // 40 minutes ago
    },
    {
      id: 3,
      question: "What were the main causes of World War I?",
      topic: "History",
      timestamp: new Date(Date.now() - 4800000) // 80 minutes ago
    },
    {
      id: 4,
      question: "How do you balance chemical equations?",
      topic: "Chemistry",
      timestamp: new Date(Date.now() - 6000000) // 100 minutes ago
    }
  ]);

  // Initialize with welcome message
  useEffect(() => {
    setChatMessages([
      {
        id: 1,
        sender: 'ai',
        content: `Welcome to StudySphere! I'm your AI study assistant. Upload your study materials and I'll help you understand them better. You can ask me questions about any content you've uploaded.`,
        timestamp: new Date(),
        context: null
      }
    ]);
  }, []);

  const handleFileUpload = async (files) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          
          // Add uploaded files to the list
          const newFiles = files?.map((file, index) => ({
            id: Date.now() + index,
            name: file?.name,
            size: file?.size,
            status: 'processing',
            uploadedAt: new Date()
          }));
          
          setUploadedFiles(prev => [...newFiles, ...prev]);
          
          // Simulate processing completion after 3 seconds
          setTimeout(() => {
            setUploadedFiles(prev => 
              prev?.map(file => 
                newFiles?.some(newFile => newFile?.id === file?.id)
                  ? { ...file, status: 'completed' }
                  : file
              )
            );
          }, 3000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSendMessage = async (message) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setIsChatLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        {
          content: `Based on your uploaded materials, I can help explain that concept. The key points to understand are the fundamental principles and their practical applications.`,
          context: `Retrieved from: Advanced Calculus Notes.pdf - Page 15\n"Integration by parts is a technique that follows from the product rule of differentiation..."`
        },
        {
          content: `Great question! From your study materials, I can see this topic is covered in detail. Let me break it down into simpler terms for better understanding.`,
          context: `Retrieved from: Physics Chapter 5.txt - Section 3.2\n"Electromagnetic induction occurs when a conductor moves through a magnetic field..."`
        },
        {
          content: `I found relevant information in your uploaded files. This concept is fundamental to understanding the broader topic we're discussing.`,
          context: `Retrieved from: Chemistry Lab Report.pdf - Introduction\n"Chemical equilibrium is achieved when the rate of forward reaction equals..."`
        }
      ];

      const randomResponse = aiResponses?.[Math.floor(Math.random() * aiResponses?.length)];
      
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: randomResponse?.content,
        timestamp: new Date(),
        context: randomResponse?.context
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsChatLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your study materials and get AI-powered assistance
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/ai-q-a-interface')}
                iconName="MessageSquare"
                iconPosition="left"
                iconSize={16}
              >
                AI Q&A
              </Button>
              <Button
                variant="default"
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
        {/* Quick Stats */}
        <QuickStatsCards stats={stats} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* File Upload Section */}
            <FileUploadSection
              onFileUpload={handleFileUpload}
              uploadProgress={uploadProgress}
              isUploading={isUploading}
            />

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/ai-q-a-interface')}
                  iconName="MessageSquare"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Ask AI
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/analytics-dashboard')}
                  iconName="TrendingUp"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  View Progress
                </Button>
                <Button
                  variant="outline"
                  iconName="BookOpen"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Study Guide
                </Button>
                <Button
                  variant="outline"
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Schedule
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Chat Interface */}
            <ChatInterface
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              isLoading={isChatLoading}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <RecentActivityGrid
            uploadedFiles={uploadedFiles}
            recentQuestions={recentQuestions}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;