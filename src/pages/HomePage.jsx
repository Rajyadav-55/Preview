// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// CORRECT PATH: from pages to components
import PlanCard from '../components/subsrciptions/PlanCard';
import SubscriptionConfig from '../components/subsrciptions/SubscriptionConfig';
import { subscriptionPlans } from '../utils/subscriptionCalculator';
import { useSubscription } from '../context/SubscriptionContext';
import { useTheme } from '../context/ThemeContext';
import { 
  ArrowRightIcon, 
  ShieldCheckIcon, 
  ChartBarIcon,
  ClockIcon,
  CheckIcon,
  SparklesIcon,
  RocketLaunchIcon,
  TrophyIcon 
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const { state, dispatch } = useSubscription();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  
  const handleSelectPlan = (planId) => {
    dispatch({ type: 'SELECT_PLAN', payload: planId });
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };
  
  const handleProceedToCheckout = () => {
    dispatch({ type: 'CALCULATE_CONFIG' });
    navigate('/checkout');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-12 md:pt-20 pb-16 md:pb-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-blue-200 to-purple-200 rounded-full opacity-30 blur-3xl"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-purple-200 to-pink-200 rounded-full opacity-30 blur-3xl"
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border ${isDark ? 'bg-purple-900/30 text-purple-300 border-purple-600' : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200'}`}
            >
              <SparklesIcon className="h-5 w-5" />
              <span className="font-semibold">Next-Gen Pricing Solution</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-5xl md:text-7xl font-black mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Your Subscription,{' '}
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block mt-2">
                Your Way
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Say goodbye to one-size-fits-all pricing. Choose your billing frequency, transparency level, and duration. 
              <span className="text-blue-600 font-semibold"> Full control. Zero surprises.</span>
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: <RocketLaunchIcon className="h-6 w-6" />, value: '4', label: 'Billing Options' },
              { icon: <ShieldCheckIcon className="h-6 w-6" />, value: '100%', label: 'Transparent' },
              { icon: <TrophyIcon className="h-6 w-6" />, value: '30%', label: 'Max Savings' },
              { icon: <CheckIcon className="h-6 w-6" />, value: '14-Day', label: 'Money Back' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className={`relative border rounded-2xl p-6 text-center hover:transition-all duration-300 shadow-lg hover:shadow-xl ${isDark ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-white mb-3">
                    {stat.icon}
                  </div>
                  <div className={`text-4xl font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Plans Section */}
      <div className={`py-16 md:py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            key={isDark}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Pick Your Perfect Plan
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Each plan comes with everything you need. Choose based on your usage and budget.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {subscriptionPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isSelected={state.selection.planId === plan.id}
                onSelect={handleSelectPlan}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Configuration Section */}
      <div className={`py-16 md:py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            key={isDark}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Customize Your Experience
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Fine-tune every detail to match your needs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`rounded-3xl border p-8 md:p-12 shadow-xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-linear-to-br from-white to-gray-50 border-gray-200'}`}
          >
            <SubscriptionConfig />
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Ready to Transform Your Subscriptions?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of customers experiencing true pricing flexibility
            </p>

            <motion.button
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProceedToCheckout}
              className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-xl inline-flex items-center gap-2 text-lg"
            >
              Start Your Free Trial
              <ArrowRightIcon className="h-6 w-6" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-8 flex items-center justify-center gap-4 text-white text-sm"
            >
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="h-4 w-4" />
                <span>Secure Checkout</span>
              </div>
              <div className="h-1 w-1 bg-white/50 rounded-full" />
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                <span>No CC Required</span>
              </div>
              <div className="h-1 w-1 bg-white/50 rounded-full" />
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-4 w-4" />
                <span>Instant Access</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {showAnimation && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ 
            scale: 2, 
            opacity: 0,
            y: -100
          }}
          transition={{ duration: 1 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          <div className="h-20 w-20 rounded-full bg-linear-to-r from-blue-500 to-purple-500 opacity-20" />
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;