import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import ProgressChart from './components/ProgressChart';
import LeaderboardCard from './components/LeaderboardCard';
import TimeFilter from './components/TimeFilter';
import AchievementBadges from './components/AchievementBadges';
import StudyStreakCard from './components/StudyStreakCard';

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [activeTimeFilter, setActiveTimeFilter] = useState('week');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const metricsData = [
    {
      title: "Questions Asked",
      value: "247",
      change: "+12%",
      changeType: "positive",
      icon: "MessageSquare",
      description: "This week"
    },
    {
      title: "Topics Covered",
      value: "18",
      change: "+3",
      changeType: "positive",
      icon: "BookOpen",
      description: "New topics mastered"
    },
    {
      title: "Files Uploaded",
      value: "34",
      change: "+5",
      changeType: "positive",
      icon: "Upload",
      description: "Study materials added"
    },
    {
      title: "Study Hours",
      value: "42.5",
      change: "-2%",
      changeType: "negative",
      icon: "Clock",
      description: "This week"
    }
  ];

  const questionsChartData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 19 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 25 },
    { name: 'Fri', value: 22 },
    { name: 'Sat', value: 18 },
    { name: 'Sun', value: 16 }
  ];

  const topicsChartData = [
    { name: 'Mathematics', value: 35 },
    { name: 'Physics', value: 28 },
    { name: 'Chemistry', value: 22 },
    { name: 'Biology', value: 15 }
  ];

  const progressLineData = [
    { name: 'Week 1', value: 65 },
    { name: 'Week 2', value: 72 },
    { name: 'Week 3', value: 68 },
    { name: 'Week 4', value: 85 },
    { name: 'Week 5', value: 92 }
  ];

  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      points: 2847,
      questionsAsked: 156,
      score: 98.5,
      change: 5,
      badge: "Study Streak",
      isOnline: true
    },
    {
      id: 2,
      rank: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      points: 2634,
      questionsAsked: 142,
      score: 95.2,
      change: 2,
      badge: "Knowledge Master",
      isOnline: false
    },
    {
      id: 3,
      rank: 3,
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      points: 2456,
      questionsAsked: 138,
      score: 92.8,
      change: -1,
      badge: "AI Explorer",
      isOnline: true
    },
    {
      id: 4,
      rank: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      points: 2234,
      questionsAsked: 124,
      score: 89.4,
      change: 3,
      badge: "Quick Learner",
      isOnline: false
    },
    {
      id: 5,
      rank: 5,
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      points: 2156,
      questionsAsked: 119,
      score: 87.6,
      change: 1,
      badge: "Consistent",
      isOnline: true
    }
  ];

  const achievementsData = [
    {
      id: 1,
      title: "First Century",
      description: "Asked 100 questions",
      type: "milestone",
      rarity: "rare",
      points: 100,
      earnedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Speed Learner",
      description: "Completed 5 topics in one day",
      type: "speed",
      rarity: "epic",
      points: 250,
      earnedDate: "1 week ago"
    },
    {
      id: 3,
      title: "Knowledge Seeker",
      description: "Uploaded 25 study materials",
      type: "mastery",
      rarity: "common",
      points: 50,
      earnedDate: "3 days ago"
    },
    {
      id: 4,
      title: "Study Warrior",
      description: "Maintained 7-day study streak",
      type: "streak",
      rarity: "legendary",
      points: 500,
      earnedDate: "Today"
    }
  ];

  const timeFilters = [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'This Semester', value: 'semester' },
    { label: 'All Time', value: 'all' }
  ];

  const weeklyActivity = [3, 2, 4, 1, 5, 2, 3]; // Activity levels for each day
  const currentStreak = 7;
  const longestStreak = 15;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('/dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
                className="md:hidden"
              >
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">Track your learning progress and achievements</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigation('/ai-q-a-interface')}
                iconName="MessageSquare"
                iconPosition="left"
                iconSize={16}
              >
                Ask AI
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleNavigation('/dashboard')}
                iconName="LayoutDashboard"
                iconPosition="left"
                iconSize={16}
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Learning Analytics</h2>
            <p className="text-sm text-muted-foreground">Monitor your study progress and performance</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <TimeFilter
              activeFilter={activeTimeFilter}
              onFilterChange={setActiveTimeFilter}
              filters={timeFilters}
            />
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData?.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              description={metric?.description}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2">
            <ProgressChart
              type="bar"
              data={questionsChartData}
              title="Questions Asked This Week"
              height={300}
            />
          </div>
          <div>
            <ProgressChart
              type="pie"
              data={topicsChartData}
              title="Topics Distribution"
              height={300}
            />
          </div>
        </div>

        {/* Progress Line Chart */}
        <div className="mb-8">
          <ProgressChart
            type="line"
            data={progressLineData}
            title="Learning Progress Over Time"
            height={250}
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Study Streak */}
          <div>
            <StudyStreakCard
              currentStreak={currentStreak}
              longestStreak={longestStreak}
              weeklyActivity={weeklyActivity}
            />
          </div>

          {/* Leaderboard */}
          <div>
            <LeaderboardCard
              users={leaderboardData}
              title="Top Performers"
            />
          </div>

          {/* Achievements */}
          <div>
            <AchievementBadges
              achievements={achievementsData}
              title="Recent Achievements"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => handleNavigation('/dashboard')}
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
              className="justify-start"
            >
              Upload Materials
            </Button>
            <Button
              variant="outline"
              onClick={() => handleNavigation('/ai-q-a-interface')}
              iconName="MessageSquare"
              iconPosition="left"
              iconSize={16}
              className="justify-start"
            >
              Ask Question
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              className="justify-start"
            >
              Export Report
            </Button>
            <Button
              variant="outline"
              onClick={() => handleNavigation('/dashboard')}
              iconName="Settings"
              iconPosition="left"
              iconSize={16}
              className="justify-start"
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Navigation Spacer */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default AnalyticsDashboard;