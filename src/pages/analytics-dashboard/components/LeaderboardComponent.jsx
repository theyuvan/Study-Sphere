import React from 'react'
import { Trophy, Medal, Award, Crown } from 'lucide-react'
import { cn } from '../../utils/cn'

const LeaderboardComponent = ({ 
  users = [], 
  currentUserId = null, 
  loading = false,
  title = "Leaderboard"
}) => {
  // Sample data for demonstration
  const sampleUsers = [
    { id: 1, name: 'Alex Johnson', score: 2450, avatar: null, rank: 1, change: 'up' },
    { id: 2, name: 'Sarah Chen', score: 2380, avatar: null, rank: 2, change: 'up' },
    { id: 3, name: 'Mike Rodriguez', score: 2290, avatar: null, rank: 3, change: 'down' },
    { id: 4, name: 'Emma Wilson', score: 2150, avatar: null, rank: 4, change: 'same' },
    { id: 5, name: 'David Kim', score: 2080, avatar: null, rank: 5, change: 'up' },
    { id: 6, name: 'Lisa Parker', score: 1980, avatar: null, rank: 6, change: 'down' },
    { id: 7, name: 'James Brown', score: 1920, avatar: null, rank: 7, change: 'up' },
    { id: 8, name: 'Anna Davis', score: 1850, avatar: null, rank: 8, change: 'same' },
  ]

  const leaderboardData = users.length > 0 ? users : sampleUsers

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <Award className="h-5 w-5 text-gray-300" />
    }
  }

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getChangeIndicator = (change) => {
    switch (change) {
      case 'up':
        return <span className="text-green-500 text-xs">↗</span>
      case 'down':
        return <span className="text-red-500 text-xs">↘</span>
      default:
        return <span className="text-gray-400 text-xs">—</span>
    }
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <Trophy className="h-5 w-5 text-primary-600" />
      </div>

      <div className="space-y-3">
        {leaderboardData.map((user, index) => (
          <div
            key={user.id}
            className={cn(
              'flex items-center space-x-3 p-3 rounded-lg transition-colors',
              user.id === currentUserId 
                ? 'bg-primary-50 border border-primary-200' 
                : 'hover:bg-gray-50'
            )}
          >
            {/* Rank Badge */}
            <div className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
              getRankBadgeColor(user.rank)
            )}>
              {user.rank <= 3 ? getRankIcon(user.rank) : user.rank}
            </div>

            {/* Avatar */}
            <div className="flex-shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {getInitials(user.name)}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className={cn(
                  'text-sm font-medium truncate',
                  user.id === currentUserId ? 'text-primary-900' : 'text-gray-900'
                )}>
                  {user.name}
                  {user.id === currentUserId && (
                    <span className="ml-2 text-xs text-primary-600 font-normal">(You)</span>
                  )}
                </p>
                {getChangeIndicator(user.change)}
              </div>
            </div>

            {/* Score */}
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {user.score.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">points</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Rankings updated every hour • Based on study points earned
        </p>
      </div>
    </div>
  )
}

export default LeaderboardComponent