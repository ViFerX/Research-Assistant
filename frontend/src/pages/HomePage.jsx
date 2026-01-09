import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Lightbulb,
  Globe,
  FileText,
  GitBranch,
  BarChart3,
  Shield,
  CheckCircle,
  Code,
  Mic,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
} from 'lucide-react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Literature Survey Generator',
      description: 'Generate comprehensive literature surveys with AI-powered citation mining',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Research Gap Finder',
      description: 'Identify limitations and research opportunities in existing literature',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Multi-Language Translator',
      description: 'Translate research papers to multiple languages instantly',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Persona Summarizer',
      description: 'Generate summaries tailored for different audiences',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: 'Methodology Builder',
      description: 'Design step-by-step research methodologies with flowcharts',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Experiment Replicator',
      description: 'Suggest experimental variants from existing papers',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Cross-Domain Synthesizer',
      description: 'Build interdisciplinary research connections',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Benchmark Explorer',
      description: 'Recommend evaluation metrics for your experiments',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Contradiction Analyzer',
      description: 'Detect conflicting claims in research papers',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Citation Validator',
      description: 'Validate citations and reference formats',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'LaTeX Generator',
      description: 'Convert markdown drafts to LaTeX typescripts',
      color: 'from-gray-600 to-gray-800',
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: 'Voice Transcriber',
      description: 'Transcribe audio recordings to text',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <Navbar transparent />

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-800 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-lg px-4 py-2 rounded-full mb-6 border border-white border-opacity-30">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-medium">AI-Powered Research Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow-lg">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Research Partner
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white text-opacity-90 mb-10 max-w-3xl mx-auto font-light">
              Generate literature surveys, find research gaps, design methodologies, and write papers — effortlessly with cutting-edge AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/register"
                className="group px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>

            {/* Floating Stats */}
            <motion.div
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { number: '12+', label: 'AI Features' },
                { number: '1000+', label: 'Papers Analyzed' },
                { number: '99%', label: 'Accuracy' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-effect text-white p-6 rounded-2xl"
                >
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white text-opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        className="py-32 relative"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to accelerate your research workflow, all in one platform
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="card-feature group"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Zap className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Research?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-10">
              Join researchers worldwide who are already accelerating their work with AI
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Research Assistant</span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering researchers with AI-driven tools for smarter, faster research
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 Smart Research Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
