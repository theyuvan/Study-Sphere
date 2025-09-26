import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and quick actions'
    },
    {
      label: 'AI Q&A',
      path: '/ai-q-a-interface',
      icon: 'MessageSquare',
      description: 'Ask questions and get AI assistance'
    },
    {
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      description: 'Track your learning progress'
    }
  ];

  const secondaryItems = [
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      description: 'Manage your preferences'
    },
    {
      label: 'Help',
      path: '/help',
      icon: 'HelpCircle',
      description: 'Get support and documentation'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    router?.push(path);
    setIsMobileOpen(false);
  };

  const isActivePath = (path) => {
    return pathname === path;
  };

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center px-2' : 'px-6'} py-4 border-b border-border`}>
        {isCollapsed && !isMobile ? (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} color="white" />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">StudySphere</span>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin">
        <div className="space-y-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`w-full flex items-center ${
                isCollapsed && !isMobile ? 'justify-center px-2' : 'px-3'
              } py-2 text-sm font-medium rounded-lg transition-micro group ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={isCollapsed && !isMobile ? item?.label : ''}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                className={`flex-shrink-0 ${
                  isCollapsed && !isMobile ? '' : 'mr-3'
                }`}
              />
              {(!isCollapsed || isMobile) && (
                <div className="flex-1 text-left">
                  <div className="font-medium">{item?.label}</div>
                  {!isCollapsed && (
                    <div className="text-xs opacity-75 mt-0.5">
                      {item?.description}
                    </div>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border my-4"></div>

        {/* Secondary Items */}
        <div className="space-y-1">
          {secondaryItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`w-full flex items-center ${
                isCollapsed && !isMobile ? 'justify-center px-2' : 'px-3'
              } py-2 text-sm font-medium rounded-lg transition-micro ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={isCollapsed && !isMobile ? item?.label : ''}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                className={`flex-shrink-0 ${
                  isCollapsed && !isMobile ? '' : 'mr-3'
                }`}
              />
              {(!isCollapsed || isMobile) && (
                <span className="flex-1 text-left">{item?.label}</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Collapse Toggle (Desktop Only) */}
      {!isMobile && (
        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className={`w-full ${
              isCollapsed ? 'justify-center px-2' : 'justify-start px-3'
            }`}
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            iconPosition="left"
            iconSize={16}
          >
            {!isCollapsed && 'Collapse'}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:z-100 bg-card border-r border-border transition-all duration-300 ${
          isCollapsed ? 'md:w-48' : 'md:w-240'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-200 bg-black bg-opacity-50 animate-fade-in">
          <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border animate-slide-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">StudySphere</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(false)}
                iconName="X"
                iconSize={18}
              >
              </Button>
            </div>
            <SidebarContent isMobile={true} />
          </aside>
        </div>
      )}

      {/* Mobile Sidebar Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-150"
        iconName="Menu"
        iconSize={20}
      >
      </Button>
    </>
  );
};

export default Sidebar;