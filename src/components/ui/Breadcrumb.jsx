import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const router = useRouter();
  const pathname = usePathname();

  const pathMapping = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/ai-q-a-interface': { label: 'AI Q&A', icon: 'MessageSquare' },
    '/analytics-dashboard': { label: 'Analytics', icon: 'BarChart3' },
    '/settings': { label: 'Settings', icon: 'Settings' },
    '/help': { label: 'Help', icon: 'HelpCircle' },
    '/profile': { label: 'Profile', icon: 'User' }
  };

  const generateBreadcrumbItems = () => {
    if (customItems) return customItems;

    const pathSegments = pathname?.split('/')?.filter(Boolean);
    const items = [{ label: 'Dashboard', path: '/dashboard', icon: 'Home' }];

    if (pathname !== '/dashboard') {
      const currentPath = pathname;
      const currentItem = pathMapping?.[currentPath];
      
      if (currentItem) {
        items?.push({
          label: currentItem?.label,
          path: currentPath,
          icon: currentItem?.icon,
          isActive: true
        });
      }
    } else {
      items[0].isActive = true;
    }

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  const handleNavigation = (path) => {
    if (path) {
      router?.push(path);
    }
  };

  if (breadcrumbItems?.length <= 1 && breadcrumbItems?.[0]?.isActive) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems?.map((item, index) => (
          <li key={item?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground/60"
              />
            )}
            
            {item?.isActive ? (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                {item?.icon && <Icon name={item?.icon} size={16} />}
                <span className="hidden sm:inline">{item?.label}</span>
                <span className="sm:hidden">{item?.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center space-x-1 hover:text-foreground transition-micro focus-ring rounded px-1 py-0.5"
              >
                {item?.icon && <Icon name={item?.icon} size={16} />}
                <span className="hidden sm:inline">{item?.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;