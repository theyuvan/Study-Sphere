import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = {
    email: "student@studysphere.com",
    password: "StudyPass123"
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData?.password) {
      errors.password = "Password is required";
    } else if (formData?.password?.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleInputChange = (e) => {
    if (!e || !e.target) return;
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors?.[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <p className="text-sm text-destructive">
              {error === "Invalid credentials" 
                ? `Invalid credentials. Use: ${mockCredentials?.email} / ${mockCredentials?.password}`
                : error
              }
            </p>
          </div>
        </div>
      )}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={formErrors?.email}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={formErrors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-micro"
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        loading={loading}
        fullWidth
        iconName="LogIn"
        iconPosition="left"
        iconSize={16}
      >
        Sign In
      </Button>
      <div className="text-center">
        <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
          <Icon name="Info" size={14} className="inline mr-1" />
          Demo credentials: {mockCredentials?.email} / {mockCredentials?.password}
        </p>
      </div>
    </form>
  );
};

export default LoginForm;