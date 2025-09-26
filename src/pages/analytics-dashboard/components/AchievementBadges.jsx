import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements, title = "Recent Achievements" }) => {
  const getBadgeIcon = (type) => {
    const icons = {
      'streak': 'Flame',
      'milestone': 'Target',
      'mastery': 'BookOpen',
      'social': 'Users',
      'speed': 'Zap'
    };
    return icons?.[type] || 'Award';
  };

  const getBadgeColor = (rarity) => {
    const colors = {
      'common': 'bg-gray-100 text-gray-800 border-gray-200',
      'rare': 'bg-blue-100 text-blue-800 border-blue-200',
      'epic': 'bg-purple-100 text-purple-800 border-purple-200',
      'legendary': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors?.[rarity] || colors?.common;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Icon name="Award" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`border-2 rounded-lg p-4 transition-all duration-200 hover:shadow-soft ${getBadgeColor(achievement?.rarity)}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center">
                <Icon 
                  name={getBadgeIcon(achievement?.type)} 
                  size={24} 
                  className="text-current"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-current truncate">
                  {achievement?.title}
                </h4>
                <p className="text-xs opacity-80 mt-1">
                  {achievement?.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs font-medium opacity-90">
                    +{achievement?.points} points
                  </span>
                  <span className="text-xs opacity-70">
                    {achievement?.earnedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {achievements?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Award" size={48} className="text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            No achievements yet. Keep studying to earn your first badge!
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;