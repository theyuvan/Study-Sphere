import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LeaderboardCard = ({ users, title = "Leaderboard" }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return { icon: 'Trophy', color: 'text-yellow-500' };
      case 2:
        return { icon: 'Medal', color: 'text-gray-400' };
      case 3:
        return { icon: 'Award', color: 'text-amber-600' };
      default:
        return { icon: 'User', color: 'text-muted-foreground' };
    }
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'Study Streak': 'bg-blue-100 text-blue-800',
      'Knowledge Master': 'bg-purple-100 text-purple-800',
      'AI Explorer': 'bg-green-100 text-green-800',
      'Quick Learner': 'bg-orange-100 text-orange-800',
      'Consistent': 'bg-indigo-100 text-indigo-800'
    };
    return colors?.[badge] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Icon name="Users" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {users?.map((user, index) => {
          const rankInfo = getRankIcon(user?.rank);
          return (
            <div
              key={user?.id}
              className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
                user?.rank <= 3 ? 'bg-muted/30' : ''
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8">
                {user?.rank <= 3 ? (
                  <Icon name={rankInfo?.icon} size={20} className={rankInfo?.color} />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    {user?.rank}
                  </span>
                )}
              </div>
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {user?.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                )}
              </div>
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.name}
                  </p>
                  {user?.badge && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(user?.badge)}`}>
                      {user?.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {user?.points} points • {user?.questionsAsked} questions
                </p>
              </div>
              {/* Score */}
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {user?.score}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.change > 0 ? '+' : ''}{user?.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          View Full Leaderboard
        </button>
      </div>
    </div>
  );
};

export default LeaderboardCard;