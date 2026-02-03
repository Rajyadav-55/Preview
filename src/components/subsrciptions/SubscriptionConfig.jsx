import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CalculatorIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline';
import { useSubscription } from '../../context/SubscriptionContext';
import { useTheme } from '../../context/ThemeContext';
import { subscriptionPlans, calculatePrice } from '../../utils/subscriptionCalculator';

const SubscriptionConfig = () => {
  const { state, dispatch } = useSubscription();
  const { isDark } = useTheme();
  const [showBreakdown, setShowBreakdown] = useState(true);
  
  const selectedPlan = subscriptionPlans.find(p => p.id === state.selection.planId);
  const totalPrice = calculatePrice(
    selectedPlan,
    state.selection.months,
    state.selection.transparency
  );
  
  const monthOptions = [1, 2, 3, 6, 9, 12];
  
  const handleMonthsChange = (months) => {
    dispatch({ type: 'UPDATE_MONTHS', payload: months });
  };
  
  const handleTransparencyChange = (type) => {
    dispatch({ type: 'UPDATE_TRANSPARENCY', payload: type });
  };
  
  return (
    <div className={`rounded-2xl shadow-xl p-6 md:p-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Configure Your Subscription</h2>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 180 }}
          className={`h-10 w-10 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}
        >
          <CalculatorIcon className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        </motion.div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <CalendarIcon className={`h-6 w-6 mr-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Duration</h3>
          <span className={`ml-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>(How many months?)</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {monthOptions.map((months) => {
            const isSelected = state.selection.months === months;
            return (
              <motion.button
                key={months}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMonthsChange(months)}
                className={`relative py-4 rounded-xl font-medium transition-all duration-300 ${
                  isSelected
                    ? 'bg-linear-to-br from-blue-500 to-purple-600 text-white shadow-xl'
                    : isDark
                    ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="duration-highlight"
                    className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="text-lg font-bold">{months}</div>
                <div className="text-sm opacity-90">{months === 1 ? 'Month' : 'Months'}</div>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          {state.selection.transparency === 'transparent' ? (
            <EyeIcon className={`h-6 w-6 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          ) : (
            <EyeSlashIcon className={`h-6 w-6 mr-3 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          )}
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Pricing Model</h3>
          <InformationCircleIcon className={`h-5 w-5 ml-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTransparencyChange('transparent')}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
              state.selection.transparency === 'transparent'
                ? 'border-green-500 bg-green-50 shadow-lg'
                : isDark
                ? 'border-gray-700 hover:border-green-600 bg-gray-700/50'
                : 'border-gray-200 hover:border-green-300 bg-white'
            }`}
          >
            <div className="flex items-center mb-3">
              <motion.div
                animate={{ scale: state.selection.transparency === 'transparent' ? 1.1 : 1 }}
                className={`h-5 w-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  state.selection.transparency === 'transparent'
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-400'
                }`}
              >
                {state.selection.transparency === 'transparent' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-2 w-2 rounded-full bg-white"
                  />
                )}
              </motion.div>
              <h4 className={`font-bold text-lg ${isDark && state.selection.transparency === 'transparent' ? 'text-gray-900' : isDark ? 'text-white' : 'text-gray-900'}`}>Transparent Pricing</h4>
            </div>
            <p className={`text-sm ${isDark && state.selection.transparency === 'transparent' ? 'text-gray-700' : isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              See all costs upfront. Get a <span className={`font-semibold ${isDark && state.selection.transparency === 'transparent' ? 'text-green-700' : 'text-green-600'}`}>10% discount</span> for choosing complete transparency.
            </p>
            <div className={`mt-3 flex items-center ${isDark && state.selection.transparency === 'transparent' ? 'text-green-700' : 'text-green-600'}`}>
              <span className="text-sm font-medium">✓ No hidden fees</span>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTransparencyChange('transitional')}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
              state.selection.transparency === 'transitional'
                ? 'border-amber-500 bg-amber-50 shadow-lg'
                : isDark
                ? 'border-gray-700 hover:border-amber-600 bg-gray-700/50'
                : 'border-gray-200 hover:border-amber-300 bg-white'
            }`}
          >
            <div className="flex items-center mb-3">
              <motion.div
                animate={{ scale: state.selection.transparency === 'transitional' ? 1.1 : 1 }}
                className={`h-5 w-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  state.selection.transparency === 'transitional'
                    ? 'border-amber-500 bg-amber-500'
                    : 'border-gray-400'
                }`}
              >
                {state.selection.transparency === 'transitional' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-2 w-2 rounded-full bg-white"
                  />
                )}
              </motion.div>
              <h4 className={`font-bold text-lg ${isDark && state.selection.transparency === 'transitional' ? 'text-gray-900' : isDark ? 'text-white' : 'text-gray-900'}`}>Transitional Pricing</h4>
            </div>
            <p className={`text-sm ${isDark && state.selection.transparency === 'transitional' ? 'text-gray-700' : isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Start with lower introductory rates that increase gradually. Perfect for testing the service.
            </p>
            <div className={`mt-3 flex items-center ${isDark && state.selection.transparency === 'transitional' ? 'text-amber-700' : 'text-amber-600'}`}>
              <span className="text-sm font-medium">⇨ Gradual increase</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={false}
        animate={{ height: showBreakdown ? 'auto' : 0 }}
        className="overflow-hidden mb-6"
      >
        <div className="border-t pt-6">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Detailed Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{selectedPlan.name} Plan</span>
              <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>${selectedPlan.price}/cycle</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Duration ({state.selection.months} months)</span>
              <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>× {state.selection.months}</span>
            </div>
            {state.selection.transparency === 'transparent' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'text-green-400 bg-green-900/30' : 'text-green-600 bg-green-50'}`}
              >
                <span>Transparent Pricing Discount (10%)</span>
                <span className="font-bold">-${(selectedPlan.price * state.selection.months * 0.1).toFixed(2)}</span>
              </motion.div>
            )}
            <div className={`border-t pt-3 ${isDark ? 'border-gray-700' : ''}`}>
              <div className={`flex justify-between items-center text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span>Total Amount</span>
                <motion.span
                  key={totalPrice}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl"
                >
                  ${totalPrice.toFixed(2)}
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBreakdown(!showBreakdown)}
          className={`flex items-center font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
        >
          <CalculatorIcon className="h-5 w-5 mr-2" />
          {showBreakdown ? 'Hide' : 'Show'} Price Breakdown
        </motion.button>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-linear-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl"
        >
          <div className="text-sm opacity-90">Selected Plan Total</div>
          <div className="text-3xl font-bold">${totalPrice.toFixed(2)}</div>
          <div className="text-sm opacity-90">
            {state.selection.transparency === 'transparent' ? 'With 10% transparency discount' : 'Transitional pricing applied'}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionConfig;