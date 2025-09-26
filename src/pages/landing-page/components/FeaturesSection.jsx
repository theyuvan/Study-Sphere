import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "MessageSquare",
      title: "AI-Powered Chat",
      description: "Ask questions about your study materials and get instant, intelligent answers from our advanced AI system.",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20"
    },
    {
      id: 2,
      icon: "Upload",
      title: "Smart File Upload",
      description: "Upload PDFs, notes, and documents. Our system processes and indexes your content for easy retrieval.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20"
    },
    {
      id: 3,
      icon: "BarChart3",
      title: "Progress Analytics",
      description: "Track your learning progress with detailed analytics, insights, and personalized recommendations.",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20"
    },
    {
      id: 4,
      icon: "Brain",
      title: "Knowledge Management",
      description: "Organize and manage your study materials with intelligent categorization and search capabilities.",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20"
    },
    {
      id: 5,
      icon: "Zap",
      title: "Instant Insights",
      description: "Get immediate feedback and insights on your study patterns to optimize your learning strategy.",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20"
    },
    {
      id: 6,
      icon: "Users",
      title: "Collaborative Learning",
      description: "Share knowledge and collaborate with fellow students in a secure, AI-enhanced environment.",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Powerful Features for
            <span className="text-primary block">Smarter Learning</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how StudySphere's cutting-edge AI technology transforms the way you study, learn, and retain knowledge.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className={`group relative p-8 rounded-2xl border ${feature?.borderColor} ${feature?.bgColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${feature?.bgColor} ${feature?.borderColor} border-2 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon 
                  name={feature?.icon} 
                  size={28} 
                  className={feature?.color}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {feature?.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to revolutionize your study experience?
          </p>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <span className="text-primary font-medium">Join thousands of successful students</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;