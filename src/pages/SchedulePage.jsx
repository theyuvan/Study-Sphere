import React, { useState } from 'react'
import { Scheduler, SchedulerItem } from '@progress/kendo-react-scheduler'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { Button as KendoButton } from '@progress/kendo-react-buttons'
import { DatePicker, TimePicker } from '@progress/kendo-react-dateinputs'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { 
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Book,
  Brain,
  Target,
  Users,
  Video,
  Bell
} from 'lucide-react'

// Mock study sessions data
const mockSessions = [
  {
    id: 1,
    title: "Machine Learning Review",
    start: new Date(2024, 0, 20, 14, 0), // 2:00 PM
    end: new Date(2024, 0, 20, 15, 30),   // 3:30 PM
    description: "Review neural networks and deep learning concepts",
    subject: "AI/ML",
    type: "Study Session",
    priority: "High"
  },
  {
    id: 2,
    title: "React Components Quiz",
    start: new Date(2024, 0, 20, 16, 0), // 4:00 PM
    end: new Date(2024, 0, 20, 16, 45),   // 4:45 PM
    description: "Take quiz on React hooks and state management",
    subject: "Web Development",
    type: "Quiz",
    priority: "Medium"
  },
  {
    id: 3,
    title: "Database Design Study Group",
    start: new Date(2024, 0, 21, 10, 0), // Tomorrow 10:00 AM
    end: new Date(2024, 0, 21, 12, 0),   // 12:00 PM
    description: "Group study session on database normalization",
    subject: "Database",
    type: "Group Study",
    priority: "Medium"
  },
  {
    id: 4,
    title: "Python Data Structures",
    start: new Date(2024, 0, 22, 9, 0),  // Day after tomorrow 9:00 AM
    end: new Date(2024, 0, 22, 10, 30),  // 10:30 AM
    description: "Practice implementing linked lists and trees",
    subject: "Programming",
    type: "Practice",
    priority: "Low"
  }
]

const sessionTypes = [
  { text: 'Study Session', value: 'Study Session' },
  { text: 'Quiz', value: 'Quiz' },
  { text: 'Group Study', value: 'Group Study' },
  { text: 'Practice', value: 'Practice' },
  { text: 'Review', value: 'Review' },
]

const subjects = [
  { text: 'Computer Science', value: 'Computer Science' },
  { text: 'AI/ML', value: 'AI/ML' },
  { text: 'Web Development', value: 'Web Development' },
  { text: 'Database', value: 'Database' },
  { text: 'Programming', value: 'Programming' },
  { text: 'Mathematics', value: 'Mathematics' },
]

const priorities = [
  { text: 'High', value: 'High' },
  { text: 'Medium', value: 'Medium' },
  { text: 'Low', value: 'Low' },
]

const SchedulePage = () => {
  const [sessions, setSessions] = useState(mockSessions)
  const [showDialog, setShowDialog] = useState(false)
  const [editingSession, setEditingSession] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    start: new Date(),
    end: new Date(Date.now() + 3600000), // 1 hour later
    description: '',
    subject: subjects[0],
    type: sessionTypes[0],
    priority: priorities[1]
  })

  const handleAddSession = () => {
    setEditingSession(null)
    setFormData({
      title: '',
      start: new Date(),
      end: new Date(Date.now() + 3600000),
      description: '',
      subject: subjects[0],
      type: sessionTypes[0],
      priority: priorities[1]
    })
    setShowDialog(true)
  }

  const handleEditSession = (session) => {
    setEditingSession(session)
    setFormData({
      title: session.title,
      start: session.start,
      end: session.end,
      description: session.description,
      subject: subjects.find(s => s.value === session.subject) || subjects[0],
      type: sessionTypes.find(t => t.value === session.type) || sessionTypes[0],
      priority: priorities.find(p => p.value === session.priority) || priorities[1]
    })
    setShowDialog(true)
  }

  const handleSaveSession = () => {
    const sessionData = {
      id: editingSession ? editingSession.id : Date.now(),
      title: formData.title,
      start: formData.start,
      end: formData.end,
      description: formData.description,
      subject: formData.subject.value,
      type: formData.type.value,
      priority: formData.priority.value
    }

    if (editingSession) {
      setSessions(prev => prev.map(s => s.id === editingSession.id ? sessionData : s))
    } else {
      setSessions(prev => [...prev, sessionData])
    }

    setShowDialog(false)
  }

  const handleDeleteSession = (sessionId) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId))
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Quiz': return <Brain className="h-4 w-4" />
      case 'Group Study': return <Users className="h-4 w-4" />
      case 'Practice': return <Target className="h-4 w-4" />
      case 'Review': return <Book className="h-4 w-4" />
      default: return <Book className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Low': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  // Custom Scheduler Item component
  const CustomSchedulerItem = (props) => {
    const { item } = props
    return (
      <SchedulerItem
        {...props}
        style={{
          backgroundColor: item.priority === 'High' ? '#fef2f2' : 
                          item.priority === 'Medium' ? '#fffbeb' : '#f0fdf4',
          borderLeft: `4px solid ${item.priority === 'High' ? '#ef4444' : 
                                   item.priority === 'Medium' ? '#f59e0b' : '#10b981'}`,
          borderRadius: '8px',
          border: '2px solid #000000',
          fontWeight: 'bold'
        }}
      />
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-black mb-2">Study Scheduler</h2>
        <p className="text-lg text-gray-600 font-medium">Plan and organize your study sessions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Today's Sessions</CardTitle>
            <CalendarIcon className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">
              {sessions.filter(s => 
                s.start.toDateString() === new Date().toDateString()
              ).length}
            </div>
            <p className="text-xs text-gray-600 font-medium">Scheduled</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">This Week</CardTitle>
            <Clock className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">
              {Math.round(sessions.reduce((total, session) => {
                const duration = (session.end - session.start) / (1000 * 60) // minutes
                return total + duration
              }, 0) / 60)}h
            </div>
            <p className="text-xs text-gray-600 font-medium">Study time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">High Priority</CardTitle>
            <Target className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">
              {sessions.filter(s => s.priority === 'High').length}
            </div>
            <p className="text-xs text-gray-600 font-medium">Sessions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Streak</CardTitle>
            <Bell className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">5</div>
            <p className="text-xs text-gray-600 font-medium">Days active</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            <Button onClick={handleAddSession}>
              <Plus className="h-4 w-4 mr-2" />
              New Session
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2 rounded-xl font-bold">
              <Brain className="h-6 w-6" />
              Quick Quiz
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 rounded-xl font-bold">
              <Users className="h-6 w-6" />
              Group Study
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 rounded-xl font-bold">
              <Video className="h-6 w-6" />
              Video Call
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 rounded-xl font-bold">
              <Bell className="h-6 w-6" />
              Set Reminder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-black">Today's Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions
              .filter(session => session.start.toDateString() === new Date().toDateString())
              .sort((a, b) => a.start - b.start)
              .map(session => (
                <div key={session.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border-4 border-black shadow-brutal-sm">
                  <div className="w-2 h-16 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getTypeIcon(session.type)}
                      <h4 className="font-black text-lg text-black">{session.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold border-2 ${getPriorityColor(session.priority)}`}>
                        {session.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{session.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{session.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {session.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      <span>•</span>
                      <span>{session.subject}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditSession(session)}>
                      Edit
                    </Button>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
              ))
            }
            {sessions.filter(session => session.start.toDateString() === new Date().toDateString()).length === 0 && (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-600">No sessions scheduled for today</h3>
                <p className="text-gray-500 mb-4">Plan your study time to stay on track</p>
                <Button onClick={handleAddSession}>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Scheduler */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-black">Study Calendar</CardTitle>
          <CardDescription>View and manage your study schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: '600px' }}>
            <Scheduler
              data={sessions}
              defaultDate={new Date()}
              defaultView="week"
              item={CustomSchedulerItem}
              onDoubleClick={(e) => handleEditSession(e.event)}
              editable={{
                add: false,
                remove: false,
                edit: false
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Session Form Dialog */}
      {showDialog && (
        <Dialog
          title={editingSession ? "Edit Study Session" : "New Study Session"}
          onClose={() => setShowDialog(false)}
          width={600}
          height={700}
        >
          <div className="p-6 space-y-6">
            <Input
              label="Session Title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
              placeholder="e.g., Machine Learning Review"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Session Type</label>
                <DropDownList
                  data={sessionTypes}
                  textField="text"
                  dataItemKey="value"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({...prev, type: e.target.value}))}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Subject</label>
                <DropDownList
                  data={subjects}
                  textField="text"
                  dataItemKey="value"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Start Date</label>
                <DatePicker
                  value={formData.start}
                  onChange={(e) => setFormData(prev => ({...prev, start: e.target.value}))}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">End Date</label>
                <DatePicker
                  value={formData.end}
                  onChange={(e) => setFormData(prev => ({...prev, end: e.target.value}))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Start Time</label>
                <TimePicker
                  value={formData.start}
                  onChange={(e) => {
                    const newStart = new Date(formData.start)
                    newStart.setHours(e.target.value.getHours(), e.target.value.getMinutes())
                    setFormData(prev => ({...prev, start: newStart}))
                  }}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">End Time</label>
                <TimePicker
                  value={formData.end}
                  onChange={(e) => {
                    const newEnd = new Date(formData.end)
                    newEnd.setHours(e.target.value.getHours(), e.target.value.getMinutes())
                    setFormData(prev => ({...prev, end: newEnd}))
                  }}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Priority</label>
              <DropDownList
                data={priorities}
                textField="text"
                dataItemKey="value"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({...prev, priority: e.target.value}))}
                style={{ width: '100%' }}
              />
            </div>

            <Input
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              placeholder="Add notes or details about this session"
            />
          </div>

          <DialogActionsBar>
            <div className="flex gap-3">
              <KendoButton onClick={() => setShowDialog(false)}>
                Cancel
              </KendoButton>
              {editingSession && (
                <KendoButton 
                  onClick={() => {
                    handleDeleteSession(editingSession.id)
                    setShowDialog(false)
                  }}
                  style={{ backgroundColor: '#ef4444', color: 'white' }}
                >
                  Delete
                </KendoButton>
              )}
              <KendoButton 
                onClick={handleSaveSession}
                style={{ backgroundColor: '#000000', color: 'white' }}
              >
                {editingSession ? 'Update' : 'Create'} Session
              </KendoButton>
            </div>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  )
}

export default SchedulePage