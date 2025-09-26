import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCards = ({ stats }) => {
  const statCards = [
    {
      id: 'files',
      title: 'Files Uploaded',
      value: stats?.filesUploaded,
      change: '+12%',
      changeType: 'positive',
      icon: 'Upload',
      color: 'bg-blue-500'
    },
    {
      id: 'questions',
      title: 'Questions Asked',
      value: stats?.questionsAsked,
      change: '+8%',
      changeType: 'positive',
      icon: 'MessageSquare',
      color: 'bg-green-500'
    },
    {
      id: 'topics',
      title: 'Topics Covered',
      value: stats?.topicsCovered,
      change: '+15%',
      changeType: 'positive',
      icon: 'BookOpen',
      color: 'bg-purple-500'
    },
    {
      id: 'streak',
      title: 'Study Streak',
      value: `${stats?.studyStreak} days`,
      change: 'Active',
      changeType: 'neutral',
      icon: 'Flame',
      color: 'bg-orange-500'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((card) => (
        <div
          key={card?.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-micro"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {card?.title}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {card?.value}
              </p>
              <div className="flex items-center mt-2">
                <span className={`text-xs font-medium ${getChangeColor(card?.changeType)}`}>
                  {card?.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last week
                </span>
              </div>
            </div>
            <div className={`w-12 h-12 ${card?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} color="white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsCards;