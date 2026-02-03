// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircleIcon,
  ArrowLeftIcon,
  LockClosedIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  EyeIcon 
} from '@heroicons/react/24/outline';
// CORRECT PATH
import { useSubscription } from '../context/SubscriptionContext';
import { useTheme } from '../context/ThemeContext';

const CheckoutPage = () => {
  const { state } = useSubscription();
  const { isDark } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  if (!state.config) {
    return (
      <div className={`container mx-auto px-4 py-12 text-center ${isDark ? 'text-gray-300' : ''}`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>No Subscription Selected</h2>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl inline-flex items-center">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Choose a Plan
        </Link>
      </div>
    );
  }
  
  const { plan, months, transparency, totalCost } = state.config;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-8 md:py-12"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <Link 
          to="/" 
          className={`inline-flex items-center mb-8 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Plans
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-2"
          >
            <div className={`rounded-2xl shadow-xl p-6 mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Order Summary</h2>
              
              <div className="space-y-6">
                <div className={`flex items-center justify-between p-4 rounded-xl ${isDark ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50'}`}>
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                    <div className={`flex items-center mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <CalendarDaysIcon className="h-4 w-4 mr-2" />
                      <span>{months} month{months > 1 ? 's' : ''} • {transparency === 'transparent' ? 'Transparent' : 'Transitional'} Pricing</span>
                    </div>
                    <div className={`flex items-center mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <EyeIcon className="h-4 w-4 mr-2" />
                      <span>{transparency === 'transparent' ? 'All fees included' : 'Introductory rates apply'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>${totalCost.toFixed(2)}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Total</div>
                  </div>
                </div>
                
                <div>
                  <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'card', icon: <CreditCardIcon />, label: 'Credit Card' },
                      { id: 'paypal', icon: 'PP', label: 'PayPal' },
                      { id: 'google', icon: 'GP', label: 'Google Pay' },
                      { id: 'apple', icon: 'AP', label: 'Apple Pay' }
                    ].map((method) => (
                      <motion.button
                        key={method.id}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center ${
                          paymentMethod === method.id
                            ? isDark
                              ? 'border-blue-500 bg-blue-900/30'
                              : 'border-blue-500 bg-blue-50'
                            : isDark
                            ? 'border-gray-700 hover:border-blue-600 bg-gray-700/50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className={`h-8 w-8 flex items-center justify-center mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          {typeof method.icon === 'string' ? (
                            <span className="font-bold">{method.icon}</span>
                          ) : method.icon}
                        </div>
                        <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{method.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`flex items-center p-4 rounded-xl ${isDark ? 'bg-green-900/30 border border-green-800' : 'bg-green-50'}`}
                >
                  <LockClosedIcon className={`h-6 w-6 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-800'}`}>Secure Payment</h4>
                    <p className={`text-sm ${isDark ? 'text-green-300/70' : 'text-green-700'}`}>
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`rounded-2xl shadow-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>What's Included</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {plan.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start p-3 rounded-lg ${isDark ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-50 text-gray-900'}`}
                  >
                    <CheckCircleIcon className={`h-5 w-5 mr-3 shrink-0 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <div className={`border shadow-2xl rounded-2xl p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Complete Purchase</h3>
                
                <div className="space-y-4 mb-6">
                  <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>Plan Price</span>
                    <span>${plan.price}/cycle</span>
                  </div>
                  <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span>Duration</span>
                    <span>{months} month{months > 1 ? 's' : ''}</span>
                  </div>
                  {transparency === 'transparent' && (
                    <div className={`flex justify-between ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                      <span>Transparent Discount</span>
                      <span>-10%</span>
                    </div>
                  )}
                  <div className={`border-t pt-4 ${isDark ? 'border-gray-700' : ''}`}>
                    <div className={`flex justify-between text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <span>Total Amount</span>
                      <span>${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className={`flex items-center ${isDark ? 'text-gray-300' : ''}`}>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                    <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      I agree to the{' '}
                      <a href="#" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:underline'}`}>Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:underline'}`}>Privacy Policy</a>
                    </span>
                  </label>
                  <label className={`flex items-center mt-2 ${isDark ? 'text-gray-300' : ''}`}>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                    <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Send me product updates and tips (optional)
                    </span>
                  </label>
                </div>
                
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg font-bold"
                  >
                    <LockClosedIcon className="h-5 w-5 inline mr-2" />
                    Pay Securely ${totalCost.toFixed(2)}
                  </motion.button>
                  
                  <button className={`w-full py-3 border-2 rounded-lg font-medium ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                    Try 14 Days Free
                  </button>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`mt-6 p-4 rounded-xl text-center ${isDark ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50'}`}
                >
                  <div className={`flex items-center justify-center mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    <span className="font-semibold">30-Day Money-Back Guarantee</span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-blue-300/70' : 'text-gray-600'}`}>
                    If you're not satisfied, get a full refund within 30 days.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;