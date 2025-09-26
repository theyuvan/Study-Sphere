import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Button from './ui/Button'
import StudySidebarNavigation from './StudySidebarNavigation'
import StudyMobileNavigation from './StudyMobileNavigation'

const StudySphereLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden p-2">
      {/* Glassmorphic container - Full Screen */}
      <div className="h-full w-full backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-brutal flex flex-col">
        {/* Header */}
        <header className="border-b-4 border-black p-4 sm:p-6 bg-white/40 backdrop-blur-md flex-shrink-0">
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

        {/* Main content area - Full height remaining */}
        <div className="flex-1 grid md:grid-cols-[280px_1fr] overflow-hidden">
          {/* Sidebar - Desktop only */}
          <div className="hidden md:block h-full overflow-hidden">
            <StudySidebarNavigation />
          </div>

          {/* Main content - Full height with own scroll */}
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