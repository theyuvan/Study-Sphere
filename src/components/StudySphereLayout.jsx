import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '../utils/cn'
import Button from './ui/Button'
import { 
  BookOpen, 
  Home, 
  Upload, 
  Search, 
  Calendar, 
  Trophy,
  Brain
} from 'lucide-react'

const navigationItems = [
  { name: 'Dashboard', href: '/app', icon: Home },
  { name: 'Library', href: '/app/library', icon: BookOpen },
  { name: 'Upload', href: '/app/upload', icon: Upload },
  { name: 'Search', href: '/app/search', icon: Search },
  { name: 'Quiz', href: '/app/quiz', icon: Brain },
  { name: 'Schedule', href: '/app/schedule', icon: Calendar },
  { name: 'Leaderboard', href: '/app/leaderboard', icon: Trophy },
]

const StudySphereLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden p-2">
      {/* Glassmorphic container - Full Screen */}
      <div className="h-full w-full backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-brutal flex flex-col">
        {/* Header with Navigation */}
        <header className="border-b-4 border-black p-4 sm:p-6 bg-white/40 backdrop-blur-md flex-shrink-0">
          <div className="flex justify-between items-center gap-4 mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-black">
                STUDYSPHERE
              </h1>
              <div className="hidden sm:block">
                <span className="text-sm font-medium text-gray-600 bg-white/50 px-3 py-1 rounded-full border-2 border-black">
                  Smart Learning Platform
                </span>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Desktop buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Button className="rounded-xl font-bold shadow-brutal">
                Quick Study
              </Button>
              <Button
                variant="outline"
                className="rounded-xl font-bold"
              >
                Profile
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 flex-wrap">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link 
                  key={item.name}
                  to={item.href} 
                  className={cn(
                    "flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl transition-colors",
                    isActive 
                      ? "bg-black text-white shadow-brutal-sm" 
                      : "hover:bg-black/10 text-black bg-white/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 border-t-2 border-black pt-4">
              <nav className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link 
                      key={item.name}
                      to={item.href} 
                      className={cn(
                        "flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-xl transition-colors",
                        isActive 
                          ? "bg-black text-white shadow-brutal-sm" 
                          : "hover:bg-black/10 text-black bg-white/50"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          )}
        </header>

        {/* Main content area - Full width, no sidebar */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full bg-white/20 overflow-auto">
            <div className="p-4 sm:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudySphereLayout