import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Users, Trophy, Zap, Target, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const LandingPage = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden p-2">
      {/* Glassmorphic container - Full Screen */}
      <div className="h-full w-full backdrop-blur-xl bg-white/30 border-4 border-black rounded-3xl shadow-brutal flex flex-col overflow-auto">
        <div className="space-y-8 p-4 sm:p-6">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-6"
          >
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mb-6"
              >
                Welcome to{' '}
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
                  className="text-purple-600"
                >
                  StudySphere
                </motion.span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed font-medium"
              >
                Your AI-powered study companion that transforms learning with intelligent content analysis, 
                personalized quizzes, and collaborative study tools.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link to="/app">
                  <motion.div
                    whileHover={{ scale: 1.05, rotateZ: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button className="bg-black text-white px-8 py-4 text-lg font-black hover:bg-gray-800 border-4 border-black shadow-brutal rounded-xl">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05, rotateZ: 1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button variant="outline" className="px-8 py-4 text-lg font-black border-4 border-black hover:bg-black hover:text-white rounded-xl shadow-brutal">
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-black mb-6">
                Supercharge Your Learning
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
                StudySphere combines cutting-edge AI technology with proven learning methodologies 
                to help you study smarter, not harder.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -8, rotateZ: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-8 text-center bg-gradient-to-br from-blue-100 to-blue-50 cursor-pointer">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-black mb-4">AI-Powered Analysis</h3>
                  <p className="text-gray-600 font-medium">
                    Upload any document and let our advanced AI extract key concepts, 
                    generate summaries, and create personalized study materials.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8, rotateZ: 1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-8 text-center bg-gradient-to-br from-green-100 to-green-50 cursor-pointer">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                  >
                    <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-black mb-4">Smart Quizzes</h3>
                  <p className="text-gray-600 font-medium">
                    Automatically generated quizzes based on your content with adaptive difficulty 
                    that adjusts to your learning progress.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -8, rotateZ: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-8 text-center bg-gradient-to-br from-purple-100 to-purple-50 cursor-pointer">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-black mb-4">Collaborative Learning</h3>
                  <p className="text-gray-600 font-medium">
                    Join study groups, compete on leaderboards, and share knowledge 
                    with fellow learners worldwide.
                  </p>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black text-white">
              <div className="p-8 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center"
                >
                  <h2 className="text-3xl sm:text-4xl font-black mb-6">
                    Why Choose StudySphere?
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
                    Join thousands of students who have transformed their learning experience
                  </p>
                </motion.div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2, type: "spring" }}
                    >
                      <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-black mb-2">Save 70% Study Time</h3>
                      <p className="text-gray-300 font-medium">
                        Our AI instantly processes and organizes your study materials, 
                        eliminating hours of manual note-taking.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3, type: "spring" }}
                    >
                      <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-black mb-2">Improve Retention by 85%</h3>
                      <p className="text-gray-300 font-medium">
                        Spaced repetition and adaptive quizzing help you remember information 
                        long-term, not just for exams.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4, type: "spring" }}
                    >
                      <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-black mb-2">Track Your Progress</h3>
                      <p className="text-gray-300 font-medium">
                        Detailed analytics show your learning patterns, strengths, 
                        and areas for improvement.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5, type: "spring" }}
                    >
                      <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-black mb-2">Multi-Format Support</h3>
                      <p className="text-gray-300 font-medium">
                        Upload PDFs, images, videos, and audio files. StudySphere 
                        handles any type of study material.
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.02, rotateZ: 1 }}
                >
                  <Card className="bg-gradient-to-br from-purple-100 to-purple-50 text-black">
                    <div className="p-8 text-center">
                      <motion.div
                        initial={{ rotateZ: 0 }}
                        animate={{ rotateZ: [0, -10, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Zap className="h-16 w-16 text-purple-600 mx-auto mb-6" />
                      </motion.div>
                      <h3 className="text-2xl font-black mb-4">
                        Ready to Transform Your Learning?
                      </h3>
                      <p className="text-gray-600 mb-6 font-medium">
                        Join over 10,000 students who are already studying smarter with StudySphere
                      </p>
                      <Link to="/app">
                        <motion.div
                          whileHover={{ scale: 1.05, rotateZ: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Button className="bg-black text-white px-8 py-4 font-black hover:bg-gray-800 border-4 border-black shadow-brutal rounded-xl">
                            Start Learning Now
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </Card>
          </motion.div>

          {/* Testimonials Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-black mb-6">
                What Students Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -5, rotateZ: -1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 cursor-pointer">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center mb-4"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotateZ: 180 }}
                        whileInView={{ scale: 1, rotateZ: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 + i * 0.1, type: "spring" }}
                      >
                        <Star className="h-5 w-5 text-orange-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <p className="text-gray-600 mb-4 font-medium">
                    "StudySphere completely changed how I prepare for exams. The AI-generated quizzes 
                    are spot-on and helped me improve my grades significantly!"
                  </p>
                  <div className="font-black text-black">Sarah M.</div>
                  <div className="text-gray-600 font-medium">Computer Science Student</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5, rotateZ: 1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-green-100 to-green-50 cursor-pointer">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center mb-4"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotateZ: 180 }}
                        whileInView={{ scale: 1, rotateZ: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1, type: "spring" }}
                      >
                        <Star className="h-5 w-5 text-orange-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <p className="text-gray-600 mb-4 font-medium">
                    "The collaborative features are amazing. Studying with friends has never been 
                    easier, and the leaderboards keep us all motivated!"
                  </p>
                  <div className="font-black text-black">Alex Chen</div>
                  <div className="text-gray-600 font-medium">Medical Student</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5, rotateZ: -1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 cursor-pointer">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center mb-4"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotateZ: 180 }}
                        whileInView={{ scale: 1, rotateZ: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.6 + i * 0.1, type: "spring" }}
                      >
                        <Star className="h-5 w-5 text-orange-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <p className="text-gray-600 mb-4 font-medium">
                    "I save so much time now! Just upload my lecture notes and StudySphere 
                    creates everything I need to study effectively."
                  </p>
                  <div className="font-black text-black">Emma Rodriguez</div>
                  <div className="text-gray-600 font-medium">Business Student</div>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="bg-gradient-to-br from-purple-100 to-purple-50">
              <div className="p-8 text-center space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-black text-black"
                >
                  Ready to Study Smarter?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-gray-600 max-w-2xl mx-auto font-medium"
                >
                  Join StudySphere today and experience the future of learning. 
                  Start your free trial now!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Link to="/app">
                    <motion.div
                      whileHover={{ scale: 1.05, rotateZ: -1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Button className="bg-black text-white px-12 py-4 text-xl font-black hover:bg-gray-800 border-4 border-black shadow-brutal rounded-xl">
                        Get Started Free <Trophy className="ml-3 h-6 w-6" />
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;