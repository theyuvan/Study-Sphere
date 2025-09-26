import React, { useState } from 'react'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { Button as KendoButton } from '@progress/kendo-react-buttons'
import { Notification, NotificationGroup } from '@progress/kendo-react-notification'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { RadioGroup } from '@progress/kendo-react-inputs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { 
  Brain, 
  Play,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  BookOpen,
  Target,
  Zap
} from 'lucide-react'

// Mock quiz data
const mockQuizzes = [
  {
    id: 1,
    title: "Machine Learning Fundamentals",
    document: "ML_Basics_2024.pdf",
    questions: 10,
    duration: 15,
    difficulty: "Intermediate",
    lastScore: 85,
    attempts: 3,
    created: "2024-01-15"
  },
  {
    id: 2,
    title: "Neural Networks Deep Dive",
    document: "Deep_Learning_Guide.pdf", 
    questions: 15,
    duration: 20,
    difficulty: "Advanced",
    lastScore: 92,
    attempts: 1,
    created: "2024-01-14"
  },
  {
    id: 3,
    title: "Data Preprocessing Quiz",
    document: "Data_Science_Handbook.pdf",
    questions: 8,
    duration: 10,
    difficulty: "Beginner",
    lastScore: 78,
    attempts: 2,
    created: "2024-01-13"
  }
]

const sampleQuiz = {
  id: 1,
  title: "Machine Learning Fundamentals",
  questions: [
    {
      id: 1,
      question: "What is the primary goal of supervised learning?",
      options: [
        "To find hidden patterns in data without labels",
        "To learn from labeled training data to make predictions",
        "To reduce the dimensionality of data",
        "To cluster similar data points together"
      ],
      correctAnswer: 1,
      explanation: "Supervised learning uses labeled training data to learn patterns and make predictions on new, unseen data."
    },
    {
      id: 2,
      question: "Which of the following is NOT a type of machine learning?",
      options: [
        "Supervised Learning",
        "Unsupervised Learning", 
        "Reinforcement Learning",
        "Deterministic Learning"
      ],
      correctAnswer: 3,
      explanation: "Deterministic Learning is not a recognized type of machine learning. The three main types are supervised, unsupervised, and reinforcement learning."
    },
    {
      id: 3,
      question: "What is overfitting in machine learning?",
      options: [
        "When a model performs poorly on both training and test data",
        "When a model learns the training data too well and fails to generalize",
        "When a model is too simple to capture the underlying pattern",
        "When a model takes too long to train"
      ],
      correctAnswer: 1,
      explanation: "Overfitting occurs when a model learns the training data so well that it fails to generalize to new, unseen data."
    }
  ]
}

const QuizPage = () => {
  const [quizzes] = useState(mockQuizzes)
  const [showQuizDialog, setShowQuizDialog] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [notifications, setNotifications] = useState([])

  const showNotification = (message, type = 'success') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      show: true
    }
    setNotifications(prev => [...prev, newNotification])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id))
    }, 5000)
  }

  const startQuiz = (quiz) => {
    setCurrentQuiz({ ...quiz, ...sampleQuiz })
    setShowQuizDialog(true)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResults(false)
    setQuizStarted(false)
    setTimeLeft(quiz.duration * 60)
  }

  const beginQuiz = () => {
    setQuizStarted(true)
    // Start timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          submitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const selectAnswer = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const submitQuiz = () => {
    const correctAnswers = currentQuiz.questions.filter(
      (q, index) => selectedAnswers[q.id] === q.correctAnswer
    ).length
    
    const score = Math.round((correctAnswers / currentQuiz.questions.length) * 100)
    setShowResults(true)
    
    showNotification(`Quiz completed! You scored ${score}%`, score >= 80 ? 'success' : 'info')
  }

  const resetQuiz = () => {
    setShowQuizDialog(false)
    setCurrentQuiz(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResults(false)
    setQuizStarted(false)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-300'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'advanced': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const ActionCell = (props) => {
    const { dataItem } = props
    
    return (
      <td>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => startQuiz(dataItem)}>
            <Play className="h-4 w-4 mr-1" />
            Start
          </Button>
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4" />
          </Button>
        </div>
      </td>
    )
  }

  const currentQuestion = currentQuiz?.questions[currentQuestionIndex]

  return (
    <div className="space-y-8">
      {/* Notifications */}
      <NotificationGroup style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
        {notifications.map(notification => (
          <Notification 
            key={notification.id}
            type={{ style: notification.type }}
            closable={true}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          >
            {notification.message}
          </Notification>
        ))}
      </NotificationGroup>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-black mb-2">Quiz Center</h2>
        <p className="text-lg text-gray-600 font-medium">Test your knowledge with AI-generated quizzes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Total Quizzes</CardTitle>
            <Brain className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">{quizzes.length}</div>
            <p className="text-xs text-gray-600 font-medium">Available to take</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Average Score</CardTitle>
            <Trophy className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">85%</div>
            <p className="text-xs text-gray-600 font-medium">+5% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-700">Study Streak</CardTitle>
            <Zap className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-black">7 days</div>
            <p className="text-xs text-gray-600 font-medium">Keep it going!</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Target className="h-6 w-6 text-orange-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button className="h-16 flex-col gap-2 rounded-xl font-bold">
              <Brain className="h-6 w-6" />
              Generate New Quiz
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 rounded-xl font-bold">
              <RotateCcw className="h-6 w-6" />
              Retake Failed
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 rounded-xl font-bold">
              <Trophy className="h-6 w-6" />
              View Rankings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quizzes Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-black">Available Quizzes</CardTitle>
          <CardDescription>Choose a quiz to test your knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: '400px' }}>
            <Grid 
              data={quizzes} 
              style={{ height: '100%' }}
              sortable={true}
            >
              <GridColumn field="title" title="Quiz Title" width="250px" />
              <GridColumn field="document" title="Source Document" width="200px" />
              <GridColumn field="questions" title="Questions" width="100px" />
              <GridColumn field="duration" title="Duration (min)" width="120px" />
              <GridColumn 
                field="difficulty" 
                title="Difficulty" 
                width="120px"
                cell={(props) => (
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border-2 ${getDifficultyColor(props.dataItem.difficulty)}`}>
                      {props.dataItem.difficulty}
                    </span>
                  </td>
                )}
              />
              <GridColumn field="lastScore" title="Last Score" width="100px" 
                cell={(props) => <td>{props.dataItem.lastScore}%</td>}
              />
              <GridColumn title="Actions" width="150px" cell={ActionCell} />
            </Grid>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Dialog */}
      {showQuizDialog && currentQuiz && (
        <Dialog
          title={quizStarted ? `${currentQuiz.title} - Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}` : currentQuiz.title}
          onClose={resetQuiz}
          width={800}
          height={600}
        >
          <div className="p-6 h-full flex flex-col">
            {!quizStarted ? (
              // Quiz Start Screen
              <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
                <div className="space-y-4">
                  <Brain className="h-16 w-16 text-blue-600 mx-auto" />
                  <h2 className="text-2xl font-black text-black">{currentQuiz.title}</h2>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                      <div className="text-2xl font-black text-black">{currentQuiz.questions.length}</div>
                      <div className="text-sm text-gray-600">Questions</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                      <div className="text-2xl font-black text-black">{currentQuiz.duration}</div>
                      <div className="text-sm text-gray-600">Minutes</div>
                    </div>
                  </div>
                </div>
                <Button onClick={beginQuiz} className="mx-auto px-8 py-3 text-lg font-bold">
                  <Play className="h-5 w-5 mr-2" />
                  Begin Quiz
                </Button>
              </div>
            ) : showResults ? (
              // Results Screen
              <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
                <Trophy className="h-16 w-16 text-yellow-600 mx-auto" />
                <h2 className="text-2xl font-black text-black">Quiz Complete!</h2>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                    <div className="text-2xl font-black text-green-600">
                      {Object.values(selectedAnswers).filter((answer, index) => 
                        answer === currentQuiz.questions[index]?.correctAnswer
                      ).length}
                    </div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200">
                    <div className="text-2xl font-black text-red-600">
                      {currentQuiz.questions.length - Object.values(selectedAnswers).filter((answer, index) => 
                        answer === currentQuiz.questions[index]?.correctAnswer
                      ).length}
                    </div>
                    <div className="text-sm text-gray-600">Wrong</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                    <div className="text-2xl font-black text-blue-600">
                      {Math.round((Object.values(selectedAnswers).filter((answer, index) => 
                        answer === currentQuiz.questions[index]?.correctAnswer
                      ).length / currentQuiz.questions.length) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                </div>
              </div>
            ) : (
              // Quiz Questions
              <div className="flex flex-col h-full">
                {/* Timer */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <span className="font-bold text-gray-700">Time Left: {formatTime(timeLeft)}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                  </div>
                </div>

                {/* Question */}
                <div className="flex-1">
                  <h3 className="text-xl font-black text-black mb-6">{currentQuestion?.question}</h3>
                  
                  <div className="space-y-3">
                    <RadioGroup
                      data={currentQuestion?.options.map((option, index) => ({ 
                        label: option, 
                        value: index 
                      }))}
                      value={selectedAnswers[currentQuestion.id]}
                      onChange={(e) => selectAnswer(currentQuestion.id, e.target.value)}
                      layout="vertical"
                      className="space-y-3"
                      itemRender={(element, item) => (
                        <div className="flex items-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
                          {element}
                          <span className="ml-3 font-medium">{item.label}</span>
                        </div>
                      )}
                    />
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <div className="flex gap-3">
                    {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
                      <Button onClick={submitQuiz}>Submit Quiz</Button>
                    ) : (
                      <Button onClick={nextQuestion}>Next Question</Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogActionsBar>
            <KendoButton onClick={resetQuiz}>
              {showResults ? 'Close' : 'Cancel'}
            </KendoButton>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  )
}

export default QuizPage