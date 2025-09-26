import React from 'react'
import { Flame, Calendar, Target, Award } from 'lucide-react'
import { cn } from '../../utils/cn'

const StudyStreakCard = ({ 
  currentStreak = 0, 
  longestStreak = 0, 
  weeklyGoal = 7,
  completedDays = 0,
  loading = false 
}) => {
  const streakPercentage = Math.min((completedDays / weeklyGoal) * 100, 100)
  const isOnFire = currentStreak >= 7
  const isCloseToGoal = completedDays >= weeklyGoal * 0.8

  // Generate week view (last 7 days)
  const getWeekDays = () => {
    const days = []
    const today = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      
      days.push({
        date: date.getDate(),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isCompleted: i < completedDays, // Mock: completed days
        isToday: i === 0
      })
    }
    
    return days
  }

  const weekDays = getWeekDays()

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex space-x-2 mb-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Study Streak</h3>
        <div className={cn(
          'p-2 rounded-lg',
          isOnFire ? 'bg-orange-100' : 'bg-gray-100'
        )}>
          <Flame className={cn(
            'h-5 w-5',
            isOnFire ? 'text-orange-500' : 'text-gray-400'
          )} />
        </div>
      </div>

      {/* Current Streak */}
      <div className="mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">{currentStreak}</span>
          <span className="text-lg text-gray-600">days</span>
          {isOnFire && (
            <div className="flex items-center space-x-1 text-orange-500">
              <Flame className="h-4 w-4" />
              <span className="text-sm font-medium">On Fire!</span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">Current streak</p>
      </div>

      {/* Week View */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">This Week</span>
          <span className="text-sm text-gray-500">{completedDays}/{weeklyGoal} days</span>
        </div>
        
        <div className="flex space-x-1 mb-3">
          {weekDays.map((day, index) => (
            <div key={index} className="flex-1 text-center">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mx-auto mb-1',
                day.isCompleted 
                  ? 'bg-green-500 text-white' 
                  : day.isToday 
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                    : 'bg-gray-100 text-gray-400'
              )}>
                {day.isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  day.date
                )}
              </div>
              <span className="text-xs text-gray-500">{day.day}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={cn(
              'h-2 rounded-full transition-all duration-500',
              isCloseToGoal ? 'bg-green-500' : 'bg-primary-500'
            )}
            style={{ width: `${streakPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Award className="h-4 w-4 text-yellow-500" />
          </div>
          <p className="text-lg font-semibold text-gray-900">{longestStreak}</p>
          <p className="text-xs text-gray-500">Longest streak</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Target className="h-4 w-4 text-primary-500" />
          </div>
          <p className="text-lg font-semibold text-gray-900">{weeklyGoal}</p>
          <p className="text-xs text-gray-500">Weekly goal</p>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg">
        <p className="text-sm text-center">
          {currentStreak === 0 ? (
            <span className="text-gray-600">Start your streak today! 🚀</span>
          ) : currentStreak < 3 ? (
            <span className="text-primary-700">Great start! Keep it up! 💪</span>
          ) : currentStreak < 7 ? (
            <span className="text-primary-700">You're building momentum! 🌟</span>
          ) : (
            <span className="text-orange-700">Amazing streak! You're on fire! 🔥</span>
          )}
        </p>
      </div>
    </div>
  )
}

export default StudyStreakCard