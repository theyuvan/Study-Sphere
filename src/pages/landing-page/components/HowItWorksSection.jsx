import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      icon: "Upload",
      title: "Upload Your Materials",
      description: "Simply drag and drop your study materials, notes, PDFs, and documents into StudySphere.",
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20"
    },
    {
      id: 2,
      icon: "Brain",
      title: "AI Processes Content",
      description: "Our advanced AI analyzes and indexes your content, making it searchable and interactive.",
      image: "https://images.pixabay.com/photo/2023/01/26/22/13/ai-generated-7747171_960_720.jpg",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20"
    },
    {
      id: 3,
      icon: "MessageSquare",
      title: "Chat & Learn",
      description: "Ask questions about your materials and get instant, intelligent answers with context.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20"
    },
    {
      id: 4,
      icon: "TrendingUp",
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics and personalized insights.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How StudySphere
            <span className="text-primary block">Works for You</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started in minutes and transform your study experience with our simple, powerful workflow.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20">
          {steps?.map((step, index) => (
            <div
              key={step?.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full ${step?.bgColor} ${step?.borderColor} border-2`}>
                    <Icon 
                      name={step?.icon} 
                      size={28} 
                      className={step?.color}
                    />
                  </div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold`}>
                    {step?.id}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {step?.title}
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {step?.description}
                </p>

                {/* Features List */}
                <div className="space-y-3">
                  {step?.id === 1 && (
                    <>
                      <div className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-muted-foreground">Support for PDF, DOCX, TXT files</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-muted-foreground">Drag & drop interface</span>
                      </div>
                    </>
                  )}
                  {step?.id === 2 && (
                    <>
                      <div className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-muted-foreground">Advanced NLP processing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-muted-foreground">Intelligent content indexing</span>
                      </div>
                    </>
                  )}
                  {step?.id === 3 && (
                    <>
                      <div className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-muted-foreground">Real-time responses</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-muted-foreground">Context-aware answers</span>
                      </div>
                    </>
                  )}
                  {step?.id === 4 && (
                    <>
                      <div className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-muted-foreground">Detailed analytics dashboard</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-muted-foreground">Personalized recommendations</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Image */}
              <div className="flex-1">
                <div className="relative group">
                  <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src={step?.image}
                      alt={`${step?.title} illustration`}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className={`absolute -top-4 -right-4 w-12 h-12 ${step?.bgColor} ${step?.borderColor} border-2 rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon 
                      name={step?.icon} 
                      size={20} 
                      className={step?.color}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-30"></div>
      </div>
    </section>
  );
};

export default HowItWorksSection;