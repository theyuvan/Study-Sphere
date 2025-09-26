import React, { useState } from 'react'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { ListView, ListViewHeader } from '@progress/kendo-react-listview'
import { Avatar } from '@progress/kendo-react-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { 
  Crown,
  Trophy,
  Medal,
  Star,
  Flame,
  Target,
  Users,
  Award,
  TrendingUp,
  Clock,
  Brain,
  BookOpen,
  Zap,
  ChevronUp,
  ChevronDown,
  Filter
} from 'lucide-react'

// Mock leaderboard data
const leaderboardData = [
  {
    id: 1,
    rank: 1,
    previousRank: 2,
    name: "Alex Chen",
    avatar: "/placeholder-user.jpg",
    points: 2847,
    studyHours: 127.5,
    quizAverage: 94,
    streak: 28,
    achievements: 12,
    level: 15,
    badges: ["Study Master", "Quiz Champion", "Streak Warrior"],
    joinedDate: "2023-09-15",
    department: "Computer Science",
    recentActivity: "Completed Advanced ML Quiz"
  },
  {
    id: 2,
    rank: 2,
    previousRank: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder-user.jpg",
    points: 2643,
    studyHours: 115.2,
    quizAverage: 91,
    streak: 22,
    achievements: 10,
    level: 14,
    badges: ["Quiz Expert", "Time Master"],
    joinedDate: "2023-08-22",
    department: "Data Science",
    recentActivity: "Achieved 3-week study streak"
  },
  {
    id: 3,
    rank: 3,
    previousRank: 3,
    name: "Mike Rodriguez",
    avatar: "/placeholder-user.jpg",
    points: 2156,
    studyHours: 98.7,
    quizAverage: 87,
    streak: 15,
    achievements: 8,
    level: 12,
    badges: ["Consistent Learner"],
    joinedDate: "2023-10-01",
    department: "Software Engineering",
    recentActivity: "Completed Database Design course"
  },
  {
    id: 4,
    rank: 4,
    previousRank: 5,
    name: "Emily Watson",
    avatar: "/placeholder-user.jpg",
    points: 1987,
    studyHours: 89.3,
    quizAverage: 89,
    streak: 12,
    achievements: 7,
    level: 11,
    badges: ["Rising Star"],
    joinedDate: "2023-11-10",
    department: "AI/ML",
    recentActivity: "Scored 95% on Algorithm Quiz"
  },
  {
    id: 5,
    rank: 5,
    previousRank: 4,
    name: "David Park",
    avatar: "/placeholder-user.jpg",
    points: 1834,
    studyHours: 82.1,
    quizAverage: 85,
    streak: 9,
    achievements: 6,
    level: 10,
    badges: ["Team Player"],
    joinedDate: "2023-09-28",
    department: "Web Development",
    recentActivity: "Joined React study group"
  },
  {
    id: 6,
    rank: 6,
    previousRank: 6,
    name: "Lisa Zhang",
    avatar: "/placeholder-user.jpg",
    points: 1672,
    studyHours: 76.4,
    quizAverage: 88,
    streak: 18,
    achievements: 9,
    level: 9,
    badges: ["Streak Master", "Knowledge Seeker"],
    joinedDate: "2023-10-15",
    department: "Cybersecurity",
    recentActivity: "Started Network Security course"
  }
]

const currentUser = {
  id: 'current',
  rank: 8,
  previousRank: 9,
  name: "You",
  points: 1456,
  studyHours: 68.2,
  quizAverage: 83,
  streak: 7,
  achievements: 5,
  level: 8,
  badges: ["Newcomer", "Dedicated"],
  department: "Computer Science"
}

const timeFrameOptions = [
  { text: 'This Week', value: 'week' },
  { text: 'This Month', value: 'month' },
  { text: 'All Time', value: 'all' },
  { text: 'This Quarter', value: 'quarter' }
]

const departmentOptions = [
  { text: 'All Departments', value: 'all' },
  { text: 'Computer Science', value: 'cs' },
  { text: 'Data Science', value: 'ds' },
  { text: 'AI/ML', value: 'aiml' },
  { text: 'Software Engineering', value: 'se' },
  { text: 'Web Development', value: 'web' },
  { text: 'Cybersecurity', value: 'cyber' }
]

const categoryOptions = [
  { text: 'Overall Points', value: 'points' },
  { text: 'Study Hours', value: 'hours' },
  { text: 'Quiz Average', value: 'quiz' },
  { text: 'Study Streak', value: 'streak' }
]

const LeaderboardPage = () => {
  const [timeFrame, setTimeFrame] = useState(timeFrameOptions[1])
  const [department, setDepartment] = useState(departmentOptions[0])
  const [category, setCategory] = useState(categoryOptions[0])
  const [showFilters, setShowFilters] = useState(false)

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />
      case 2: return <Medal className="h-6 w-6 text-gray-400" />
      case 3: return <Medal className="h-6 w-6 text-orange-600" />
      default: return <span className="text-lg font-black text-gray-600">#{rank}</span>
    }
  }

  const getRankChange = (current, previous) => {
    const change = previous - current
    if (change > 0) {
      return <ChevronUp className="h-4 w-4 text-green-500" />
    } else if (change < 0) {
      return <ChevronDown className="h-4 w-4 text-red-500" />
    }
    return <span className="text-gray-400">-</span>
  }

  const getBadgeColor = (badge) => {
    const colors = {
      "Study Master": "bg-purple-500",
      "Quiz Champion": "bg-blue-500", 
      "Streak Warrior": "bg-red-500",
      "Quiz Expert": "bg-indigo-500",
      "Time Master": "bg-green-500",
      "Consistent Learner": "bg-teal-500",
      "Rising Star": "bg-pink-500",
      "Team Player": "bg-orange-500",
      "Streak Master": "bg-yellow-500",
      "Knowledge Seeker": "bg-cyan-500",
      "Newcomer": "bg-gray-500",
      "Dedicated": "bg-emerald-500"
    }
    return colors[badge] || "bg-gray-500"
  }

  // Top 3 Leaderboard Item Template
  const TopLeaderItem = ({ user, showCurrent = false }) => (
    <Card className={`relative ${showCurrent ? 'ring-4 ring-blue-500 bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-white'}`}>
      {user.rank <= 3 && (
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-black rounded-full flex items-center justify-center">
          {user.rank === 1 ? <Crown className="h-4 w-4 text-white" /> : 
           user.rank === 2 ? <Medal className="h-4 w-4 text-white" /> :
           <Trophy className="h-4 w-4 text-white" />}
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Avatar 
              type="image"
              size="large"
              shape="circle"
              style={{ 
                width: '60px', 
                height: '60px',
                border: '3px solid #000000'
              }}
            >
              <img src={user.avatar || "/placeholder-user.jpg"} alt={user.name} className="w-full h-full object-cover" />
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user.level}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-black text-black">{user.name}</h3>
              {getRankChange(user.rank, user.previousRank)}
            </div>
            <p className="text-sm text-gray-600 font-medium">{user.department}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {user.badges.slice(0, 2).map((badge, index) => (
                <span 
                  key={index}
                  className={`px-2 py-1 text-xs font-bold text-white rounded-full ${getBadgeColor(badge)}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-black text-black">{user.points.toLocaleString()}</div>
            <p className="text-xs text-gray-600 font-medium">points</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t-2 border-gray-200">
          <div className="text-center">
            <div className="text-lg font-black text-black">{user.studyHours}h</div>
            <p className="text-xs text-gray-600">Study Time</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-black text-black">{user.quizAverage}%</div>
            <p className="text-xs text-gray-600">Quiz Avg</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-lg font-black text-black">{user.streak}</span>
            </div>
            <p className="text-xs text-gray-600">Streak</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-black mb-2">Leaderboard</h2>
          <p className="text-lg text-gray-600 font-medium">Compete with fellow learners and track your progress</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Time Period</label>
                <DropDownList
                  data={timeFrameOptions}
                  textField="text"
                  dataItemKey="value"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Department</label>
                <DropDownList
                  data={departmentOptions}
                  textField="text"
                  dataItemKey="value"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Category</label>
                <DropDownList
                  data={categoryOptions}
                  textField="text"
                  dataItemKey="value"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Your Rank Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-xl font-black">Your Position</CardTitle>
          <CardDescription>Your current standing in the leaderboard</CardDescription>
        </CardHeader>
        <CardContent>
          <TopLeaderItem user={currentUser} showCurrent={true} />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              You need <span className="font-bold text-black">{leaderboardData[4].points - currentUser.points}</span> more points to reach rank #{currentUser.rank - 1}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-black">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" 
                style={{ 
                  width: `${((currentUser.points - leaderboardData[5].points) / (leaderboardData[4].points - leaderboardData[5].points)) * 100}%` 
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Podium */}
      <div>
        <h3 className="text-2xl font-black text-black mb-6 text-center">🏆 Top Performers 🏆</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Second Place */}
          <div className="md:order-1">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 border-4 border-black rounded-full mb-2">
                <Medal className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-black text-gray-600">#2</h4>
            </div>
            <TopLeaderItem user={leaderboardData[1]} />
          </div>
          
          {/* First Place */}
          <div className="md:order-2">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-black rounded-full mb-2">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-black text-yellow-600">#1 CHAMPION</h4>
            </div>
            <TopLeaderItem user={leaderboardData[0]} />
          </div>
          
          {/* Third Place */}
          <div className="md:order-3">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 border-4 border-black rounded-full mb-2">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-black text-orange-600">#3</h4>
            </div>
            <TopLeaderItem user={leaderboardData[2]} />
          </div>
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-black">Full Rankings</CardTitle>
          <CardDescription>Complete leaderboard for {timeFrame.text}</CardDescription>
        </CardHeader>
        <CardContent>
          <Grid 
            data={leaderboardData} 
            style={{ height: '500px' }}
            sortable={true}
          >
            <GridColumn 
              field="rank" 
              title="Rank" 
              width="80px"
              cell={(props) => (
                <td className="text-center py-4">
                  <div className="flex items-center justify-center gap-2">
                    {getRankIcon(props.dataItem.rank)}
                    {getRankChange(props.dataItem.rank, props.dataItem.previousRank)}
                  </div>
                </td>
              )}
            />
            <GridColumn 
              field="name" 
              title="User" 
              width="250px"
              cell={(props) => (
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar 
                        type="image"
                        size="medium"
                        shape="circle"
                        style={{ 
                          width: '40px', 
                          height: '40px',
                          border: '2px solid #000000'
                        }}
                      >
                        <img src={props.dataItem.avatar} alt={props.dataItem.name} className="w-full h-full object-cover" />
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 border border-white rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {props.dataItem.level}
                      </div>
                    </div>
                    <div>
                      <div className="font-black text-black">{props.dataItem.name}</div>
                      <div className="text-sm text-gray-600">{props.dataItem.department}</div>
                    </div>
                  </div>
                </td>
              )}
            />
            <GridColumn 
              field="points" 
              title="Points" 
              width="120px"
              cell={(props) => (
                <td className="text-center py-4">
                  <div className="font-black text-lg text-black">
                    {props.dataItem.points.toLocaleString()}
                  </div>
                </td>
              )}
            />
            <GridColumn 
              field="studyHours" 
              title="Study Hours" 
              width="120px"
              cell={(props) => (
                <td className="text-center py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="font-bold">{props.dataItem.studyHours}h</span>
                  </div>
                </td>
              )}
            />
            <GridColumn 
              field="quizAverage" 
              title="Quiz Avg" 
              width="120px"
              cell={(props) => (
                <td className="text-center py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Brain className="h-4 w-4 text-green-500" />
                    <span className="font-bold">{props.dataItem.quizAverage}%</span>
                  </div>
                </td>
              )}
            />
            <GridColumn 
              field="streak" 
              title="Streak" 
              width="100px"
              cell={(props) => (
                <td className="text-center py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-bold">{props.dataItem.streak}</span>
                  </div>
                </td>
              )}
            />
            <GridColumn 
              field="badges" 
              title="Badges" 
              width="200px"
              cell={(props) => (
                <td className="py-4">
                  <div className="flex flex-wrap gap-1">
                    {props.dataItem.badges.slice(0, 2).map((badge, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 text-xs font-bold text-white rounded-full ${getBadgeColor(badge)}`}
                      >
                        {badge}
                      </span>
                    ))}
                    {props.dataItem.badges.length > 2 && (
                      <span className="px-2 py-1 text-xs font-bold text-gray-600 bg-gray-200 rounded-full">
                        +{props.dataItem.badges.length - 2}
                      </span>
                    )}
                  </div>
                </td>
              )}
            />
          </Grid>
        </CardContent>
      </Card>

      {/* Weekly Challenges */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
        <CardHeader>
          <CardTitle className="text-xl font-black">Weekly Challenges</CardTitle>
          <CardDescription>Complete challenges to earn bonus points and climb the ranks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl border-4 border-black shadow-brutal-sm">
              <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h4 className="font-black text-black mb-2">Study Marathon</h4>
              <p className="text-sm text-gray-600 mb-3">Study for 20+ hours this week</p>
              <div className="w-full bg-gray-200 rounded-full h-2 border border-black mb-2">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-xs font-bold text-blue-600">13/20 hours</span>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border-4 border-black shadow-brutal-sm">
              <Brain className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h4 className="font-black text-black mb-2">Quiz Master</h4>
              <p className="text-sm text-gray-600 mb-3">Complete 10 quizzes with 80%+ score</p>
              <div className="w-full bg-gray-200 rounded-full h-2 border border-black mb-2">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-xs font-bold text-green-600">7/10 quizzes</span>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border-4 border-black shadow-brutal-sm">
              <Flame className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h4 className="font-black text-black mb-2">Streak Keeper</h4>
              <p className="text-sm text-gray-600 mb-3">Maintain 7-day study streak</p>
              <div className="w-full bg-gray-200 rounded-full h-2 border border-black mb-2">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
              <span className="text-xs font-bold text-orange-600">7/7 days ✓</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LeaderboardPage