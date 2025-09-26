import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isAuthenticated = false, user = null }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const publicNavItems = [
    { label: 'Home', path: '/landing-page', icon: 'Home' },
    { label: 'Sign In', path: '/authentication', icon: 'LogIn' }
  ];

  const authenticatedNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'AI Q&A', path: '/ai-q-a-interface', icon: 'MessageSquare' },
    { label: 'Analytics', path: '/analytics-dashboard', icon: 'BarChart3' }
  ];

  const currentNavItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef?.current && !profileMenuRef?.current?.contains(event?.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    router?.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    router?.push('/authentication');
  };

  const isActivePath = (path) => {
    return pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="GraduationCap" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">StudySphere</span>
    </div>
  );

  return (
    <header className="sticky top-0 z-200 bg-card border-b border-border">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-64">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {currentNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="px-3 py-2"
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Profile Menu (Authenticated) */}
            {isAuthenticated && user && (
              <div className="relative" ref={profileMenuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className={`transition-transform duration-150 ${
                      isProfileMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated animate-fade-in">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-foreground">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router?.push('/profile');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-micro flex items-center space-x-2"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          router?.push('/help');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-micro flex items-center space-x-2"
                      >
                        <Icon name="HelpCircle" size={16} />
                        <span>Help</span>
                      </button>
                      <div className="border-t border-border">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-micro flex items-center space-x-2"
                        >
                          <Icon name="LogOut" size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
              iconName="Menu"
              iconSize={20}
            >
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card animate-fade-in">
            <nav className="py-4 space-y-1">
              {currentNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-micro flex items-center space-x-3 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;