import React from 'react';
import Icon from '../../../components/AppIcon';

const StudyStreakCard = ({ currentStreak, longestStreak, weeklyActivity }) => {
  const getDayColor = (activity) => {
    if (activity >= 4) return 'bg-success';
    if (activity >= 2) return 'bg-warning';
    if (activity >= 1) return 'bg-primary/30';
    return 'bg-muted';
  };

  const getDayLabel = (index) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days?.[index];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Study Streak</h3>
        <Icon name="Flame" size={20} className="text-orange-500" />
      </div>
      <div className="space-y-6">
        {/* Current Streak */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Flame" size={32} className="text-orange-500" />
            <span className="text-3xl font-bold text-foreground">{currentStreak}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Current streak • Best: {longestStreak} days
          </p>
        </div>

        {/* Weekly Activity */}
        <div>
          <p className="text-sm font-medium text-foreground mb-3">This Week</p>
          <div className="flex justify-between space-x-1">
            {weeklyActivity?.map((activity, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div
                  className={`w-8 h-8 rounded-lg ${getDayColor(activity)} transition-colors duration-200`}
                  title={`${getDayLabel(index)}: ${activity} sessions`}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {getDayLabel(index)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Less</span>
            <span>More</span>
          </div>
        </div>

        {/* Streak Goals */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Weekly Goal</span>
            <span className="text-sm text-muted-foreground">5/7 days</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: '71%' }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            2 more days to reach your weekly goal!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyStreakCard;