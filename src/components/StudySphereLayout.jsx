import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Button from './ui/Button'
import StudySidebarNavigation from './StudySidebarNavigation'
import StudyMobileNavigation from './StudyMobileNavigation'
import { Sheet, SheetContent, SheetTrigger } from './ui/Sheet'

const StudySphereLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-2 sm:p-4 md:p-8">
      {/* Glassmorphic container */}
      <div className="w-full max-w-7xl mx-auto backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-brutal overflow-hidden">
        {/* Header */}
        <header className="border-b-4 border-black p-4 sm:p-6 bg-white/40 backdrop-blur-md">
          <div className="flex justify-between items-center gap-4">
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
              {mobileMenuOpen ? (
                <div className="fixed inset-0 z-50 flex">
                  <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <div className="relative z-10 h-full w-80 ml-auto bg-white border-l-4 border-black shadow-brutal-lg">
                    <StudyMobileNavigation />
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-xl"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
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
        </header>

        <div className="grid md:grid-cols-[280px_1fr] h-[calc(100vh-6rem)]">
          {/* Sidebar - Desktop only */}
          <div className="hidden md:block">
            <StudySidebarNavigation />
          </div>

          {/* Main content */}
          <div className="overflow-auto p-4 sm:p-6 bg-white/20">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudySphereLayout