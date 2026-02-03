import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const CoverPage = ({ onComplete }) => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Trigger the opening animation after 3.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onComplete callback after animation finishes
      setTimeout(() => onComplete?.(), 600);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Floating particles background
  const Particle = ({ delay, duration }) => (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{ 
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        opacity: [0, 0.6, 0]
      }}
      transition={{ delay, duration, repeat: Infinity }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );

  // Split cover into two halves that open
  const topVariants = {
    visible: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const bottomVariants = {
    visible: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  return (
    <motion.div
      initial={false}
      animate={isVisible ? 'visible' : 'exit'}
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
    >
      {/* Top Half - Blue */}
      <motion.div
        variants={topVariants}
        initial="visible"
        className={`absolute top-0 left-0 w-full h-1/2 bg-linear-to-br ${isDark ? 'from-blue-700 via-blue-600 to-purple-600' : 'from-blue-600 via-blue-500 to-purple-500'} overflow-hidden`}
      >
        {/* Animated background circles */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-400 rounded-full opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        {/* Particles */}
        {[...Array(8)].map((_, i) => (
          <Particle key={i} delay={i * 0.3} duration={2 + i * 0.2} />
        ))}

        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="h-24 w-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-6xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  S
                </span>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-white text-sm tracking-widest font-light"
            >
              FLEXIBLE SUBSCRIPTIONS
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Half - Purple */}
      <motion.div
        variants={bottomVariants}
        initial="visible"
        className={`absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-br ${isDark ? 'from-purple-700 via-purple-600 to-pink-600' : 'from-purple-600 via-purple-500 to-pink-500'} overflow-hidden`}
      >
        {/* Animated background circles */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-pink-400 rounded-full opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-400 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        />

        {/* Particles */}
        {[...Array(8)].map((_, i) => (
          <Particle key={`bottom-${i}`} delay={i * 0.3 + 0.2} duration={2 + i * 0.2} />
        ))}

        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center z-10"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-7xl font-black text-white mb-4 tracking-tight"
            >
              FlexiSub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-white/80 text-xl font-light tracking-wide"
            >
              Your Perfect Pricing Plan
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Center Logo - scales and rotates */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 1, duration: 1, type: 'spring', stiffness: 100 }}
        exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.4 } }}
      >
        <div className="h-28 w-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-white opacity-0 rounded-3xl"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-7xl font-black text-white relative z-10">S</span>
        </div>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{ delay: i * 0.15, duration: 0.6, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>

      {/* Corner accents */}
      <motion.div
        className="absolute top-8 right-8 w-24 h-0.5 bg-gradient-to-r from-transparent to-white opacity-40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-24 h-0.5 bg-gradient-to-r from-white to-transparent opacity-40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      />
    </motion.div>
  );
};

export default CoverPage;
