import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Icon from '../AppIcon';

const MobileBottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'AI Q&A',
      path: '/ai-q-a-interface',
      icon: 'MessageSquare'
    }
  ];

  const handleNavigation = (path) => {
    router?.push(path);
  };

  const isActivePath = (path) => {
    return pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-150 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around px-4 py-2">
        {navigationItems?.map((item) => (
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-micro ${
              isActivePath(item?.path)
                ? 'text-primary' :'text-muted-foreground'
            }`}
          >
            <div className={`p-2 rounded-lg transition-micro ${
              isActivePath(item?.path)
                ? 'bg-primary/10' :'hover:bg-muted'
            }`}>
              <Icon 
                name={item?.icon} 
                size={20}
                className={isActivePath(item?.path) ? 'text-primary' : 'text-muted-foreground'}
              />
            </div>
            <span className={`text-xs font-medium mt-1 truncate ${
              isActivePath(item?.path)
                ? 'text-primary' :'text-muted-foreground'
            }`}>
              {item?.label}
            </span>
          </button>
        ))}
        
        {/* More Menu Button */}
        <button
          onClick={() => router?.push('/analytics-dashboard')}
          className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-micro ${
            pathname === '/analytics-dashboard' ?'text-primary' :'text-muted-foreground'
          }`}
        >
          <div className={`p-2 rounded-lg transition-micro ${
            pathname === '/analytics-dashboard' ?'bg-primary/10' :'hover:bg-muted'
          }`}>
            <Icon 
              name="BarChart3" 
              size={20}
              className={pathname === '/analytics-dashboard' ? 'text-primary' : 'text-muted-foreground'}
            />
          </div>
          <span className={`text-xs font-medium mt-1 truncate ${
            pathname === '/analytics-dashboard' ?'text-primary' :'text-muted-foreground'
          }`}>
            Analytics
          </span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;