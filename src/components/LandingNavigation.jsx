import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import Button from './ui/Button';

const LandingNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-black hover:text-purple-600 font-black transition-colors">
              Features
            </Link>
            <Link to="#benefits" className="text-black hover:text-purple-600 font-black transition-colors">
              Benefits
            </Link>
            <Link to="#testimonials" className="text-black hover:text-purple-600 font-black transition-colors">
              Reviews
            </Link>
            <Link to="#pricing" className="text-black hover:text-purple-600 font-black transition-colors">
              Pricing
            </Link>
            <Link to="/app">
              <Button className="bg-white text-purple-600 border-4 border-purple-600 hover:bg-purple-600 hover:text-white font-black shadow-brutal">
                Login
              </Button>
            </Link>
            <Link to="/app">
              <Button className="bg-purple-600 text-white font-black hover:bg-purple-700 border-4 border-black shadow-brutal">
                Sign Up Free
              </Button>
            </Link>
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t-4 border-black shadow-brutal">
              <Link
                to="#features"
                className="block px-3 py-2 text-black hover:text-purple-600 font-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="#benefits"
                className="block px-3 py-2 text-black hover:text-purple-600 font-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefits
              </Link>
              <Link
                to="#testimonials"
                className="block px-3 py-2 text-black hover:text-purple-600 font-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                to="#pricing"
                className="block px-3 py-2 text-black hover:text-purple-600 font-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link to="/app" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-white text-purple-600 border-4 border-purple-600 hover:bg-purple-600 hover:text-white font-black shadow-brutal">
                    Login
                  </Button>
                </Link>
                <Link to="/app" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-purple-600 text-white font-black hover:bg-purple-700 border-4 border-black shadow-brutal">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavigation;