import React, { useState } from 'react'
import { BarChart3, TrendingUp, Users, Clock, BookOpen, Target } from 'lucide-react'
import Header from '../../components/ui/Header'
import Breadcrumb from '../../components/ui/Breadcrumb'
import MetricsCard from './components/MetricsCard'
import ProgressChart from './components/ProgressChart'
import LeaderboardComponent from './components/LeaderboardComponent'
import StudyStreakCard from './components/StudyStreakCard'
import AchievementBadge from './components/AchievementBadge'
import TimeFilter from './components/TimeFilter'

const AnalyticsDashboard = () => {
  const [filterOptions, setFilterOptions] = useState({
    period: 'week',
    subject: 'all',
    dateRange: null
  })

  const handleFilterChange = (newFilters) => {
    setFilterOptions(newFilters)
    // Here you would typically refetch data based on new filters
    console.log('Filters changed:', newFilters)
  }

  // Mock data - in real app, this would come from API based on filters
  const metricsData = [
    {
      title: 'Study Hours',
      value: '28.5',
      subtitle: 'This week',
      trend: 'up',
      trendValue: '+12%',
      icon: Clock,
      color: 'primary'
    },
    {
      title: 'Questions Asked',
      value: '156',
      subtitle: 'This week',
      trend: 'up',
      trendValue: '+8%',
      icon: BookOpen,
      color: 'success'
    },
    {
      title: 'Study Streak',
      value: '5',
      subtitle: 'Days in a row',
      trend: 'up',
      trendValue: '+2',
      icon: Target,
      color: 'warning'
    },
    {
      title: 'Rank',
      value: '#12',
      subtitle: 'Among peers',
      trend: 'up',
      trendValue: '+3',
      icon: Users,
      color: 'info'
    }
  ]

  const progressData = [
    { label: 'Mathematics', value: 85, color: '#3b82f6' },
    { label: 'Science', value: 78, color: '#10b981' },
    { label: 'English', value: 92, color: '#8b5cf6' },
    { label: 'History', value: 67, color: '#f59e0b' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[{ label: 'Analytics Dashboard' }]} />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your learning progress and achievements</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {metricsData.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric.title}
              value={metric.value}
              subtitle={metric.subtitle}
              trend={metric.trend}
              trendValue={metric.trendValue}
              icon={metric.icon}
              color={metric.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Chart */}
            <ProgressChart
              title="Subject Progress"
              data={progressData}
              type="bar"
            />

            {/* Study Streak */}
            <StudyStreakCard
              currentStreak={5}
              longestStreak={12}
              weeklyGoal={7}
              completedDays={5}
            />

            {/* Achievements */}
            <AchievementBadge
              recentAchievements={[
                { id: 2, title: 'Week Warrior', icon: '⚔️', points: 50 }
              ]}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Time Filter */}
            <TimeFilter
              selectedPeriod={filterOptions.period}
              selectedSubject={filterOptions.subject}
              onFilterChange={handleFilterChange}
            />

            {/* Leaderboard */}
            <LeaderboardComponent
              currentUserId={4} // Mock current user ID
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard