import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SignupForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password?.length >= 8) score++;
    if (/[a-z]/?.test(password)) score++;
    if (/[A-Z]/?.test(password)) score++;
    if (/\d/?.test(password)) score++;
    if (/[^A-Za-z0-9]/?.test(password)) score++;

    const levels = [
      { strength: 0, label: '', color: '' },
      { strength: 1, label: 'Very Weak', color: 'bg-red-500' },
      { strength: 2, label: 'Weak', color: 'bg-orange-500' },
      { strength: 3, label: 'Fair', color: 'bg-yellow-500' },
      { strength: 4, label: 'Good', color: 'bg-blue-500' },
      { strength: 5, label: 'Strong', color: 'bg-green-500' }
    ];

    return levels?.[score];
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.fullName?.trim()) {
      errors.fullName = "Full name is required";
    } else if (formData?.fullName?.trim()?.length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
    }
    
    if (!formData?.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData?.confirmEmail) {
      errors.confirmEmail = "Please confirm your email";
    } else if (formData?.email !== formData?.confirmEmail) {
      errors.confirmEmail = "Email addresses do not match";
    }
    
    if (!formData?.password) {
      errors.password = "Password is required";
    } else if (formData?.password?.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    
    if (!formData?.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData?.password !== formData?.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData?.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms and conditions";
    }
    
    setFormErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleInputChange = (e) => {
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
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </div>
      )}
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={handleInputChange}
        error={formErrors?.fullName}
        required
      />
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
      <Input
        label="Confirm Email"
        type="email"
        name="confirmEmail"
        placeholder="Confirm your email"
        value={formData?.confirmEmail}
        onChange={handleInputChange}
        error={formErrors?.confirmEmail}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Create a password"
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
        
        {formData?.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.color}`}
                  style={{ width: `${(passwordStrength?.strength / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {passwordStrength?.label}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={formErrors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
        </button>
      </div>
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        name="agreeToTerms"
        checked={formData?.agreeToTerms}
        onChange={handleInputChange}
        error={formErrors?.agreeToTerms}
        required
      />
      <Button
        type="submit"
        variant="default"
        size="lg"
        loading={loading}
        fullWidth
        iconName="UserPlus"
        iconPosition="left"
        iconSize={16}
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;