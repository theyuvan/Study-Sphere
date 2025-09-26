import React from 'react'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartTitle, ChartLegend } from '@progress/kendo-react-charts'
import { Notification, NotificationGroup } from '@progress/kendo-react-notification'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Clock,
  TrendingUp,
  Calendar,
  Plus,
  Upload,
  Star,
  Target,
  Zap
} from 'lucide-react'

// Simple Badge component
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 border-gray-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    error: 'bg-red-100 text-red-800 border-red-300'
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border-2 ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

// Mock data for demonstration
const recentDocuments = [
  { id: 1, title: 'Computer Science Fundamentals', uploadDate: '2024-01-15', pages: 45, status: 'Processed' },
  { id: 2, title: 'Data Structures and Algorithms', uploadDate: '2024-01-14', pages: 32, status: 'Processing' },
  { id: 3, title: 'Machine Learning Basics', uploadDate: '2024-01-13', pages: 28, status: 'Processed' },
  { id: 4, title: 'React Development Guide', uploadDate: '2024-01-12', pages: 67, status: 'Processed' },
  { id: 5, title: 'Database Design Principles', uploadDate: '2024-01-11', pages: 41, status: 'Processed' },
]

const studyProgressData = [
  { week: 'Week 1', minutes: 45, quizzes: 3 },
  { week: 'Week 2', minutes: 78, quizzes: 5 },
  { week: 'Week 3', minutes: 92, quizzes: 4 },
  { week: 'Week 4', minutes: 67, quizzes: 6 },
  { week: 'Week 5', minutes: 103, quizzes: 8 },
  { week: 'Week 6', minutes: 89, quizzes: 7 },
]

const StudyDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-black text-black mb-2">Welcome back, Student!</h2>
        <p className="text-lg text-gray-600 font-medium">Ready to continue your learning journey?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-100 to-blue-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Total Documents</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-black">24</div>
            <p className="text-xs text-gray-600 font-medium">+3 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-green-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Study Minutes</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-black">1,247</div>
            <p className="text-xs text-gray-600 font-medium">+89 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-100 to-purple-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Quizzes Taken</CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-black">47</div>
            <p className="text-xs text-gray-600 font-medium">+7 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-100 to-orange-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Streak</CardTitle>
            <Trophy className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-black">12 days</div>
            <p className="text-xs text-gray-600 font-medium">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
          <CardDescription>Get started with your study session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2 rounded-xl font-bold">
              <Upload className="h-6 w-6" />
              Upload Document
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 rounded-xl font-bold">
              <Brain className="h-6 w-6" />
              Take Quiz
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 rounded-xl font-bold">
              <Calendar className="h-6 w-6" />
              Schedule Study
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 rounded-xl font-bold">
              <TrendingUp className="h-6 w-6" />
              View Progress
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Data Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Study Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-black">Study Progress</CardTitle>
            <CardDescription>Your study time and quiz performance over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <Chart style={{ height: '100%' }}>
              <ChartTitle text="Weekly Study Progress" />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={studyProgressData.map(item => item.week)} />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem 
                  type="column" 
                  data={studyProgressData.map(item => item.minutes)} 
                  name="Study Minutes"
                  color="#3b82f6"
                />
                <ChartSeriesItem 
                  type="line" 
                  data={studyProgressData.map(item => item.quizzes)} 
                  name="Quizzes Completed"
                  color="#ef4444"
                />
              </ChartSeries>
            </Chart>
          </CardContent>
        </Card>

        {/* Recent Documents Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-black">Recent Documents</CardTitle>
            <CardDescription>Your recently uploaded study materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px' }}>
              <Grid data={recentDocuments} style={{ height: '100%' }}>
                <GridColumn field="title" title="Document" width="200px" />
                <GridColumn field="pages" title="Pages" width="80px" />
                <GridColumn field="status" title="Status" width="100px" />
                <GridColumn field="uploadDate" title="Uploaded" width="120px" />
              </Grid>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Study Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-black">Today's Schedule</CardTitle>
          <CardDescription>Your planned study sessions for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border-2 border-black">
              <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <h4 className="font-bold text-black">Machine Learning Review</h4>
                <p className="text-sm text-gray-600">2:00 PM - 3:30 PM</p>
              </div>
              <Button variant="outline" size="sm" className="font-bold">Join</Button>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border-2 border-black">
              <div className="w-2 h-12 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <h4 className="font-bold text-black">React Components Quiz</h4>
                <p className="text-sm text-gray-600">4:00 PM - 4:45 PM</p>
              </div>
              <Button variant="outline" size="sm" className="font-bold">Start</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudyDashboard