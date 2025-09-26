import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ activeTab }) => {
  const getHeaderContent = () => {
    if (activeTab === 'login') {
      return {
        title: "Welcome back to StudySphere",
        subtitle: "Sign in to continue your learning journey and access your personalized study materials."
      };
    } else {
      return {
        title: "Join StudySphere Today",
        subtitle: "Create your account to start building your personalized knowledge base and enhance your learning experience."
      };
    }
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-soft">
          <Icon name="GraduationCap" size={32} color="white" />
        </div>
      </div>
      
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        {title}
      </h1>
      
      <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;