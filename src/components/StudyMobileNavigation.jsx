import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../utils/cn'
import Button from './ui/Button'
import { 
  BookOpen, 
  Home, 
  Upload, 
  Search, 
  Calendar, 
  BarChart3, 
  Trophy,
  Settings,
  Brain,
  FileText,
  X
} from 'lucide-react'

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Library', href: '/library', icon: BookOpen },
  { name: 'Upload', href: '/upload', icon: Upload },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Quiz', href: '/quiz', icon: Brain },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Progress', href: '/progress', icon: BarChart3 },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
]

const StudyMobileNavigation = ({ isOpen, onClose }) => {
  const location = useLocation()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white/90 backdrop-blur-md border-l-4 border-black flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-black flex-shrink-0">
          <div>
            <h2 className="text-2xl font-black text-black">STUDYSPHERE</h2>
            <p className="text-sm font-medium text-gray-600 mt-1">Smart Learning Platform</p>
          </div>
          <Button
            variant="outline"
            className="rounded-xl p-2"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation - Scrollable area */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2 mb-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link 
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 text-lg font-bold p-3 rounded-xl transition-colors",
                    isActive 
                      ? "bg-black text-white shadow-brutal-sm" 
                      : "hover:bg-black/10 text-black"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Study Tools Section */}
          <div>
            <h3 className="text-xl font-black mb-4 text-black">STUDY TOOLS</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 rounded-xl font-bold"
                onClick={onClose}
              >
                <FileText className="h-5 w-5" /> Notes
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 rounded-xl font-bold"
                onClick={onClose}
              >
                <Brain className="h-5 w-5" /> Flashcards
              </Button>
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-4 border-t-4 border-black flex-shrink-0">
          <div className="grid grid-cols-1 gap-2">
            <Button className="rounded-xl font-bold" onClick={onClose}>
              Study Now
            </Button>
            <Button variant="outline" className="rounded-xl font-bold" onClick={onClose}>
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyMobileNavigation