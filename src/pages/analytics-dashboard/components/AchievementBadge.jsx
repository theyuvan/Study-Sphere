import React from 'react'
import { Trophy, Star, Target, Medal } from 'lucide-react'
import { cn } from '../../utils/cn'

const AchievementBadge = ({ 
  achievements = [], 
  recentAchievements = [],
  loading = false,
  showAll = false 
}) => {
  // Sample achievements data
  const sampleAchievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first study session',
      icon: '🎯',
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'common',
      points: 10
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Study for 7 consecutive days',
      icon: '⚔️',
      earned: true,
      earnedDate: '2024-01-22',
      rarity: 'uncommon',
      points: 50
    },
    {
      id: 3,
      title: 'Knowledge Seeker',
      description: 'Ask 100 questions to AI',
      icon: '🧠',
      earned: true,
      earnedDate: '2024-02-01',
      rarity: 'rare',
      points: 100
    },
    {
      id: 4,
      title: 'Speed Learner',
      description: 'Complete 10 sessions in one day',
      icon: '⚡',
      earned: false,
      earnedDate: null,
      rarity: 'epic',
      points: 200
    },
    {
      id: 5,
      title: 'Master Scholar',
      description: 'Reach 1000 study points',
      icon: '👑',
      earned: false,
      earnedDate: null,
      rarity: 'legendary',
      points: 500
    }
  ]

  const achievementData = achievements.length > 0 ? achievements : sampleAchievements
  const displayedAchievements = showAll ? achievementData : achievementData.slice(0, 6)
  const earnedCount = achievementData.filter(a => a.earned).length
  const totalPoints = achievementData.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0)

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 bg-gray-50'
      case 'uncommon':
        return 'border-green-300 bg-green-50'
      case 'rare':
        return 'border-blue-300 bg-blue-50'
      case 'epic':
        return 'border-purple-300 bg-purple-50'
      case 'legendary':
        return 'border-yellow-300 bg-yellow-50'
      default:
        return 'border-gray-300 bg-gray-50'
    }
  }

  const getRarityTextColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-600'
      case 'uncommon':
        return 'text-green-600'
      case 'rare':
        return 'text-blue-600'
      case 'epic':
        return 'text-purple-600'
      case 'legendary':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Achievements</h3>
          <p className="text-sm text-gray-600">{earnedCount} of {achievementData.length} earned</p>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">{totalPoints} pts</span>
        </div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Recently Earned</span>
          </div>
          <div className="space-y-2">
            {recentAchievements.slice(0, 2).map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-2">
                <span className="text-lg">{achievement.icon}</span>
                <span className="text-sm text-yellow-800 font-medium">{achievement.title}</span>
                <span className="text-xs text-yellow-600">+{achievement.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {displayedAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer',
              achievement.earned 
                ? `${getRarityColor(achievement.rarity)} hover:shadow-md` 
                : 'border-gray-200 bg-gray-50 opacity-60'
            )}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h4 className={cn(
                'text-sm font-medium mb-1',
                achievement.earned ? getRarityTextColor(achievement.rarity) : 'text-gray-400'
              )}>
                {achievement.title}
              </h4>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                {achievement.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full capitalize',
                  achievement.earned 
                    ? `${getRarityTextColor(achievement.rarity)} bg-white bg-opacity-50`
                    : 'text-gray-400 bg-gray-200'
                )}>
                  {achievement.rarity}
                </span>
                <span className="text-xs text-gray-600">
                  {achievement.points} pts
                </span>
              </div>
              {achievement.earned && achievement.earnedDate && (
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(achievement.earnedDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-gray-900">{earnedCount}</p>
            <p className="text-xs text-gray-500">Earned</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{totalPoints}</p>
            <p className="text-xs text-gray-500">Total Points</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {Math.round((earnedCount / achievementData.length) * 100)}%
            </p>
            <p className="text-xs text-gray-500">Complete</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AchievementBadge