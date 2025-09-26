import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthTabs from './components/AuthTabs';
import AuthHeader from './components/AuthHeader';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignUpForm';
import SocialLogin from './components/SocialLogin';
import SuccessNotification from './components/SuccessNotification';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Authentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Mock credentials for demonstration
  const mockCredentials = {
    email: "student@studysphere.com",
    password: "StudyPass123"
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication validation
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Mock successful login
        const userData = {
          id: 1,
          name: "Alex Johnson",
          email: formData?.email,
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          joinedDate: "2024-01-15",
          studyStreak: 12,
          totalQuestions: 156,
          uploadedFiles: 8
        };

        // Store user data in localStorage (mock session)
        localStorage.setItem('studysphere_user', JSON.stringify(userData));
        localStorage.setItem('studysphere_auth_token', 'mock_jwt_token_12345');

        setSuccessMessage('Welcome back! Redirecting to your dashboard...');
        setShowSuccess(true);

        // Redirect to dashboard after success message
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful signup
      const userData = {
        id: Date.now(),
        name: formData?.fullName,
        email: formData?.email,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        joinedDate: new Date()?.toISOString()?.split('T')?.[0],
        studyStreak: 0,
        totalQuestions: 0,
        uploadedFiles: 0
      };

      // Store user data in localStorage (mock session)
      localStorage.setItem('studysphere_user', JSON.stringify(userData));
      localStorage.setItem('studysphere_auth_token', 'mock_jwt_token_' + Date.now());

      setSuccessMessage('Account created successfully! Welcome to StudySphere!');
      setShowSuccess(true);

      // Redirect to dashboard after success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');

    try {
      // Simulate social login delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful social login
      const userData = {
        id: Date.now(),
        name: provider === 'google' ? "Google User" : "GitHub User",
        email: `user@${provider}.com`,
        avatar: provider === 'google' 
          ? "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        joinedDate: new Date()?.toISOString()?.split('T')?.[0],
        studyStreak: 0,
        totalQuestions: 0,
        uploadedFiles: 0
      };

      localStorage.setItem('studysphere_user', JSON.stringify(userData));
      localStorage.setItem('studysphere_auth_token', 'mock_social_token_' + Date.now());

      setSuccessMessage(`Successfully signed in with ${provider}! Redirecting...`);
      setShowSuccess(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLanding = () => {
    navigate('/landing-page');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back button */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToLanding}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
          className="text-muted-foreground hover:text-foreground"
        >
          Back to Home
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-elevated p-6 sm:p-8 border border-border">
            <AuthHeader activeTab={activeTab} />
            
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="space-y-6">
              {activeTab === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  loading={loading}
                  error={error}
                />
              ) : (
                <SignupForm
                  onSubmit={handleSignup}
                  loading={loading}
                  error={error}
                />
              )}
              
              <SocialLogin
                onSocialLogin={handleSocialLogin}
                loading={loading}
              />
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Secure authentication powered by modern encryption
            </p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Icon name="Shield" size={14} className="text-success" />
              <span className="text-xs text-success">SSL Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success notification */}
      <SuccessNotification
        show={showSuccess}
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default Authentication;