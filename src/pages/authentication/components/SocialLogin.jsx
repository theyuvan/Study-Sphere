import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLogin = ({ onSocialLogin, loading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'bg-gray-900 hover:bg-gray-800 text-white'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            size="default"
            onClick={() => onSocialLogin(provider?.id)}
            disabled={loading}
            className={`${provider?.color} transition-micro`}
            iconName={provider?.icon}
            iconPosition="left"
            iconSize={16}
          >
            {provider?.name}
          </Button>
        ))}
      </div>
      <p className="text-xs text-center text-muted-foreground">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default SocialLogin;