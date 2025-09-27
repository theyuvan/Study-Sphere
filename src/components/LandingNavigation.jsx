import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Home, Upload, Search, Calendar, Trophy, Brain } from 'lucide-react';
import { cn } from '../utils/cn';
import Button from './ui/Button';

const navigationItems = [
  { name: 'Dashboard', href: '/app', icon: Home },
  { name: 'Library', href: '/app/library', icon: BookOpen },
  { name: 'Upload', href: '/app/upload', icon: Upload },
  { name: 'Search', href: '/app/search', icon: Search },
  { name: 'Quiz', href: '/app/quiz', icon: Brain },
  { name: 'Schedule', href: '/app/schedule', icon: Calendar },
  { name: 'Leaderboard', href: '/app/leaderboard', icon: Trophy },
];

const LandingNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white/40 backdrop-blur-md border-b-4 border-black sticky top-0 z-50 shadow-brutal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-black text-purple-600">
                StudySphere
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link 
                  key={item.name}
                  to={item.href} 
                  className={cn(
                    "flex items-center gap-2 text-sm font-black px-4 py-2 rounded-xl transition-colors",
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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black hover:text-purple-600 focus:outline-none focus:text-purple-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 bg-white border-t-4 border-black shadow-brutal">
              <nav className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link 
                      key={item.name}
                      to={item.href} 
                      className={cn(
                        "flex items-center gap-2 text-sm font-black px-3 py-2 rounded-xl transition-colors",
                        isActive 
                          ? "bg-black text-white shadow-brutal-sm" 
                          : "hover:bg-black/10 text-black bg-white/50"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavigation;