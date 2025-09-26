import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FooterSection = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const handleGetStarted = () => {
    navigate('/authentication');
  };

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'API', href: '#api' }
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Press', href: '#press' }
    ],
    support: [
      { label: 'Help Center', href: '#help' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Status', href: '#status' },
      { label: 'Community', href: '#community' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#twitter' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#linkedin' },
    { name: 'Facebook', icon: 'Facebook', href: '#facebook' },
    { name: 'Instagram', icon: 'Instagram', href: '#instagram' },
    { name: 'YouTube', icon: 'Youtube', href: '#youtube' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={24} color="white" />
              </div>
              <span className="text-2xl font-bold text-foreground">StudySphere</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Transform your study experience with AI-powered learning. Upload your materials, chat with AI, and get personalized insights to boost your academic success.
            </p>

            <div className="space-y-4">
              <Button
                variant="default"
                onClick={handleGetStarted}
                iconName="ArrowRight"
                iconPosition="right"
                className="font-medium"
              >
                Start Learning Today
              </Button>

              <div className="flex items-center space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    className="w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    aria-label={social?.name}
                  >
                    <Icon 
                      name={social?.icon} 
                      size={18} 
                      className="text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks?.product?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks?.company?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks?.support?.map((link) => (
                  <li key={link?.label}>
                    <a
                      href={link?.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-foreground mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">Get the latest updates on new features and study tips.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button variant="default" className="px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-border bg-muted/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-muted-foreground">
                © {currentYear} StudySphere. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-4">
                {footerLinks?.legal?.map((link) => (
                  <a
                    key={link?.label}
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link?.label}
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span>Back to top</span>
              <Icon name="ArrowUp" size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;