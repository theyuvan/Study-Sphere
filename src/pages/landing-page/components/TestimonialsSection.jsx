import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Computer Science Student",
      university: "Stanford University",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "StudySphere completely transformed how I study for my CS courses. The AI chat feature helps me understand complex algorithms by breaking them down into digestible explanations.",
      rating: 5,
      subject: "Computer Science"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Medical Student",
      university: "Harvard Medical School",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "The ability to upload my medical textbooks and get instant answers to specific questions has been a game-changer. My exam scores improved by 25% since using StudySphere.",
      rating: 5,
      subject: "Medicine"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Business Major",
      university: "Wharton School",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "The analytics dashboard shows me exactly where I need to focus my study time. It\'s like having a personal tutor that knows my learning patterns.",
      rating: 5,
      subject: "Business"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Engineering Student",
      university: "MIT",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "StudySphere\'s AI understands engineering concepts better than most teaching assistants. It explains complex formulas and their applications clearly.",
      rating: 5,
      subject: "Engineering"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Psychology Major",
      university: "UCLA",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "The collaborative features helped me study with classmates more effectively. We can share insights and learn from each other\'s questions.",
      rating: 5,
      subject: "Psychology"
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "Law Student",
      university: "Yale Law School",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: "Analyzing case studies and legal documents is so much faster now. StudySphere helps me identify key legal principles and precedents instantly.",
      rating: 5,
      subject: "Law"
    }
  ];

  const stats = [
    { label: "Active Students", value: "10,000+", icon: "Users" },
    { label: "Success Rate", value: "95%", icon: "TrendingUp" },
    { label: "Study Hours Saved", value: "50,000+", icon: "Clock" },
    { label: "Universities", value: "200+", icon: "GraduationCap" }
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Loved by Students
            <span className="text-primary block">Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful students who have transformed their learning experience with StudySphere.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat?.value}</div>
              <div className="text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial?.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src={testimonial?.avatar}
                    alt={`${testimonial?.name} avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card"></div>
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{testimonial?.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial?.role}</div>
                  <div className="text-xs text-primary font-medium">{testimonial?.university}</div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center px-2 py-1 bg-primary/10 rounded-full">
                    <span className="text-xs font-medium text-primary">{testimonial?.subject}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-success/10 rounded-full border border-success/20 mb-6">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="text-success font-medium">Trusted by top universities</span>
          </div>
          <p className="text-lg text-muted-foreground">
            Ready to join them and boost your academic success?
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;