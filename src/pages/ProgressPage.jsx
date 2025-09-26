import React, { useState } from 'react'
import { 
  Chart, 
  ChartTitle, 
  ChartSeries, 
  ChartSeriesItem, 
  ChartCategoryAxis, 
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartLegend
} from '@progress/kendo-react-charts'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { DateRangePicker } from '@progress/kendo-react-dateinputs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { 
  TrendingUp,
  Award,
  Clock,
  Brain,
  Target,
  BookOpen,
  Calendar,
  BarChart3,
  Users,
  Flame,
  Star,
  Trophy
} from 'lucide-react'

// Mock study progress data
const studyHoursData = [
  { month: 'Jan', hours: 45, goal: 60 },
  { month: 'Feb', hours: 52, goal: 60 },
  { month: 'Mar', hours: 38, goal: 60 },
  { month: 'Apr', hours: 67, goal: 60 },
  { month: 'May', hours: 71, goal: 60 },
  { month: 'Jun', hours: 58, goal: 60 }
]

const subjectProgressData = [
  { subject: 'Machine Learning', completed: 85, total: 100, color: '#6366f1' },
  { subject: 'Web Development', completed: 72, total: 100, color: '#8b5cf6' },
  { subject: 'Data Structures', completed: 93, total: 100, color: '#06b6d4' },
  { subject: 'Algorithms', completed: 67, total: 100, color: '#10b981' },
  { subject: 'Database Systems', completed: 54, total: 100, color: '#f59e0b' }
]

const quizPerformanceData = [
  { date: '2024-01-15', subject: 'ML', score: 85, maxScore: 100 },
  { date: '2024-01-16', subject: 'Web Dev', score: 92, maxScore: 100 },
  { date: '2024-01-17', subject: 'DS', score: 78, maxScore: 100 },
  { date: '2024-01-18', subject: 'Algo', score: 88, maxScore: 100 },
  { date: '2024-01-19', subject: 'DB', score: 76, maxScore: 100 },
  { date: '2024-01-20', subject: 'ML', score: 91, maxScore: 100 }
]

const weeklyActivityData = [
  { day: 'Mon', sessions: 3, hours: 4.5 },
  { day: 'Tue', sessions: 2, hours: 3.2 },
  { day: 'Wed', sessions: 4, hours: 5.8 },
  { day: 'Thu', sessions: 3, hours: 4.1 },
  { day: 'Fri', sessions: 5, hours: 7.2 },
  { day: 'Sat', sessions: 2, hours: 2.8 },
  { day: 'Sun', sessions: 1, hours: 1.5 }
]

const achievementsData = [
  {
    id: 1,
    title: "Study Streak Master",
    description: "Study for 7 consecutive days",
    icon: <Flame className="h-6 w-6" />,
    earned: true,
    earnedDate: "2024-01-15",
    color: "bg-orange-500"
  },
  {
    id: 2,
    title: "Quiz Champion",
    description: "Score 90+ on 5 quizzes",
    icon: <Trophy className="h-6 w-6" />,
    earned: true,
    earnedDate: "2024-01-18",
    color: "bg-yellow-500"
  },
  {
    id: 3,
    title: "Knowledge Explorer",
    description: "Complete 10 different topics",
    icon: <Star className="h-6 w-6" />,
    earned: false,
    progress: 7,
    total: 10,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Time Master",
    description: "Study for 50+ hours in a month",
    icon: <Clock className="h-6 w-6" />,
    earned: false,
    progress: 42,
    total: 50,
    color: "bg-blue-500"
  }
]

const timeFrameOptions = [
  { text: 'Last 7 days', value: '7d' },
  { text: 'Last 30 days', value: '30d' },
  { text: 'Last 3 months', value: '3m' },
  { text: 'Last 6 months', value: '6m' },
  { text: 'This year', value: '1y' }
]

const ProgressPage = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrameOptions[1])
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date()
  })

  const totalStudyHours = studyHoursData.reduce((sum, item) => sum + item.hours, 0)
  const totalGoalHours = studyHoursData.reduce((sum, item) => sum + item.goal, 0)
  const averageQuizScore = Math.round(quizPerformanceData.reduce((sum, item) => sum + item.score, 0) / quizPerformanceData.length)
  const completedAchievements = achievementsData.filter(a => a.earned).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-black mb-2">Progress Dashboard</h2>
          <p className="text-lg text-gray-600 font-medium">Track your learning journey and achievements</p>
        </div>
        <div className="flex gap-4">
          <DropDownList
            data={timeFrameOptions}
            textField="text"
            dataItemKey="value"
            value={selectedTimeFrame}
            onChange={(e) => setSelectedTimeFrame(e.target.value)}
            style={{ width: '150px' }}
          />
          <DateRangePicker
            start={dateRange.start}
            end={dateRange.end}
            onChange={(e) => setDateRange({ start: e.start, end: e.end })}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Study Hours</CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">{totalStudyHours}h</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${Math.min(100, (totalStudyHours / totalGoalHours) * 100)}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">{Math.round((totalStudyHours / totalGoalHours) * 100)}%</span>
            </div>
            <p className="text-xs text-gray-600 font-medium mt-1">of {totalGoalHours}h goal</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Quiz Average</CardTitle>
            <Brain className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">{averageQuizScore}%</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600 font-medium">+5% from last month</span>
            </div>
            <p className="text-xs text-gray-600 font-medium">Across {quizPerformanceData.length} quizzes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Current Streak</CardTitle>
            <Flame className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">12</div>
            <div className="flex items-center gap-1 mt-2">
              <Target className="h-3 w-3 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">Best: 18 days</span>
            </div>
            <p className="text-xs text-gray-600 font-medium">Days active</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Achievements</CardTitle>
            <Award className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">{completedAchievements}</div>
            <div className="flex items-center gap-1 mt-2">
              <Trophy className="h-3 w-3 text-orange-600" />
              <span className="text-xs text-orange-600 font-medium">2 new this week</span>
            </div>
            <p className="text-xs text-gray-600 font-medium">of {achievementsData.length} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Hours Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-black">Study Hours Trend</CardTitle>
            <CardDescription>Monthly study hours vs goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px' }}>
              <Chart>
                <ChartTitle text="Study Progress" />
                <ChartCategoryAxis>
                  <ChartCategoryAxisItem categories={studyHoursData.map(item => item.month)} />
                </ChartCategoryAxis>
                <ChartValueAxis>
                  <ChartValueAxisItem />
                </ChartValueAxis>
                <ChartSeries>
                  <ChartSeriesItem 
                    type="column" 
                    data={studyHoursData.map(item => item.hours)} 
                    name="Actual Hours"
                    color="#6366f1"
                  />
                  <ChartSeriesItem 
                    type="line" 
                    data={studyHoursData.map(item => item.goal)} 
                    name="Goal"
                    color="#ef4444"
                    markers={{ visible: true }}
                  />
                </ChartSeries>
                <ChartLegend position="bottom" />
              </Chart>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-black">Weekly Activity</CardTitle>
            <CardDescription>Sessions and hours this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px' }}>
              <Chart>
                <ChartTitle text="This Week's Activity" />
                <ChartCategoryAxis>
                  <ChartCategoryAxisItem categories={weeklyActivityData.map(item => item.day)} />
                </ChartCategoryAxis>
                <ChartValueAxis>
                  <ChartValueAxisItem />
                </ChartValueAxis>
                <ChartSeries>
                  <ChartSeriesItem 
                    type="column" 
                    data={weeklyActivityData.map(item => item.sessions)} 
                    name="Sessions"
                    color="#10b981"
                  />
                  <ChartSeriesItem 
                    type="line" 
                    data={weeklyActivityData.map(item => item.hours)} 
                    name="Hours"
                    color="#f59e0b"
                    axis="hours"
                    markers={{ visible: true }}
                  />
                </ChartSeries>
                <ChartLegend position="bottom" />
              </Chart>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-black">Subject Progress</CardTitle>
          <CardDescription>Your progress across different subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjectProgressData.map((subject, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 font-bold text-sm text-black">{subject.subject}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">
                      {subject.completed} of {subject.total} completed
                    </span>
                    <span className="text-sm font-bold text-black">
                      {Math.round((subject.completed / subject.total) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-black">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${(subject.completed / subject.total) * 100}%`,
                        backgroundColor: subject.color
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quiz Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-black">Recent Quiz Performance</CardTitle>
          <CardDescription>Your latest quiz scores and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Grid data={quizPerformanceData} style={{ height: '300px' }}>
            <GridColumn field="date" title="Date" width="140px" />
            <GridColumn field="subject" title="Subject" width="120px" />
            <GridColumn 
              field="score" 
              title="Score" 
              width="100px"
              cell={(props) => (
                <td className={`font-bold ${props.dataItem.score >= 80 ? 'text-green-600' : props.dataItem.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {props.dataItem.score}%
                </td>
              )}
            />
            <GridColumn 
              field="performance" 
              title="Performance" 
              width="200px"
              cell={(props) => {
                const percentage = (props.dataItem.score / props.dataItem.maxScore) * 100
                return (
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${percentage >= 80 ? 'bg-green-500' : percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{Math.round(percentage)}%</span>
                    </div>
                  </td>
                )
              }}
            />
          </Grid>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-black">Achievements</CardTitle>
          <CardDescription>Your learning milestones and badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievementsData.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`relative p-6 rounded-xl border-4 border-black shadow-brutal-sm ${
                  achievement.earned ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : 'bg-gray-50'
                } ${achievement.earned ? 'opacity-100' : 'opacity-60'}`}
              >
                {achievement.earned && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 border-2 border-black rounded-full flex items-center justify-center">
                    <Trophy className="h-3 w-3 text-white" />
                  </div>
                )}
                
                <div className={`w-12 h-12 ${achievement.color} rounded-xl border-2 border-black flex items-center justify-center text-white mb-4`}>
                  {achievement.icon}
                </div>
                
                <h3 className="font-black text-black mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                
                {achievement.earned ? (
                  <div className="text-xs text-green-600 font-bold">
                    Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span className="font-bold">{achievement.progress}/{achievement.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 border border-black">
                      <div 
                        className={`${achievement.color} h-full rounded-full`}
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="text-lg font-black">Set Goals</CardTitle>
            <CardDescription>Plan your study targets</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Target className="h-4 w-4 mr-2" />
              Update Goals
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader>
            <CardTitle className="text-lg font-black">Export Report</CardTitle>
            <CardDescription>Download your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader>
            <CardTitle className="text-lg font-black">Share Progress</CardTitle>
            <CardDescription>Show your achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Share Stats
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProgressPage