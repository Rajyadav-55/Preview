import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../../context/ThemeContext';

const PlanCard = ({ plan, isSelected, onSelect }) => {
  const { isDark } = useTheme();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`bg-white rounded-2xl shadow-lg overflow-visible relative border-2 transition-all duration-300 ${
        isSelected 
          ? 'border-blue-600 shadow-2xl ring-2 ring-blue-600/20' 
          : isDark
          ? 'border-gray-700 hover:border-blue-500'
          : 'border-gray-200 hover:border-blue-300'
      } ${plan.bestValue ? 'ring-2 ring-purple-500/30' : ''} ${isDark ? 'bg-gray-800' : 'bg-white'}`}
    >
      {plan.bestValue && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-linear-to-r from-purple-600 to-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap"
          >
            Most Popular
          </motion.div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{plan.name}</h3>
            <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-black'}`}>{plan.description}</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ${plan.price}
              <span className={`text-sm font-normal ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>/billing cycle</span>
            </div>
          </div>
        </div>
        
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li 
              key={index}
              className="flex items-center"
            >
              <CheckIcon className={`h-5 w-5 mr-3 shrink-0 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-black'}`}>{feature}</span>
            </li>
          ))}
        </ul>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(plan.id)}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            isSelected
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : isDark
              ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {isSelected ? 'Selected ✓' : 'Select Plan'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PlanCard;