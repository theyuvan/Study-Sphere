import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/authentication');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Features', action: () => scrollToSection('features') },
    { label: 'How It Works', action: () => scrollToSection('how-it-works') },
    { label: 'Testimonials', action: () => scrollToSection('testimonials') }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/95 backdrop-blur-md border-b border-border shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={24} color="white" />
            </div>
            <span className="text-2xl font-bold text-foreground">StudySphere</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems?.map((item, index) => (
              <button
                key={index}
                onClick={item?.action}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                {item?.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleLogin}
              className="font-medium"
            >
              Sign In
            </Button>
            <Button
              variant="default"
              onClick={handleLogin}
              iconName="ArrowRight"
              iconPosition="right"
              className="font-medium"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            iconSize={20}
          />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-md animate-fade-in">
            <div className="py-4 space-y-2">
              {navItems?.map((item, index) => (
                <button
                  key={index}
                  onClick={item?.action}
                  className="w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 font-medium rounded-lg"
                >
                  {item?.label}
                </button>
              ))}
              
              <div className="border-t border-border pt-4 mt-4 space-y-2">
                <Button
                  variant="ghost"
                  onClick={handleLogin}
                  fullWidth
                  className="justify-start font-medium"
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  onClick={handleLogin}
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="justify-center font-medium"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;