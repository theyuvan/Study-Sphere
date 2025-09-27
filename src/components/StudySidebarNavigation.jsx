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
  FileText
} from 'lucide-react'

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Library', href: '/library', icon: BookOpen },
  { name: 'Upload', href: '/upload', icon: Upload },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Quiz', href: '/quiz', icon: Brain },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
]

const StudySidebarNavigation = () => {
  const location = useLocation()

  return (
    <div className="h-full bg-white/40 backdrop-blur-md flex flex-col border-r-4 border-black">
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
            >
              <FileText className="h-5 w-5" /> Notes
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 rounded-xl font-bold"
            >
              <Brain className="h-5 w-5" /> Flashcards
            </Button>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="p-4 border-t-4 border-black flex-shrink-0">
        <div className="grid grid-cols-2 gap-2">
          <Button className="rounded-xl font-bold">
            Study Now
          </Button>
          <Button variant="outline" className="rounded-xl font-bold">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StudySidebarNavigation