import React, { createContext, useContext, useReducer } from 'react';
import { subscriptionPlans, calculatePrice } from '../utils/subscriptionCalculator';

const initialState = {
  selection: {
    planId: subscriptionPlans[0].id,
    months: 1,
    transparency: 'transparent'
  },
  config: null
};

const SubscriptionContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_PLAN':
      return {
        ...state,
        selection: { ...state.selection, planId: action.payload }
      };
    case 'UPDATE_MONTHS':
      return {
        ...state,
        selection: { ...state.selection, months: action.payload }
      };
    case 'UPDATE_TRANSPARENCY':
      return {
        ...state,
        selection: { ...state.selection, transparency: action.payload }
      };
    case 'CALCULATE_CONFIG':
      const plan = subscriptionPlans.find(p => p.id === state.selection.planId);
      const totalCost = calculatePrice(
        plan,
        state.selection.months,
        state.selection.transparency
      );
      return {
        ...state,
        config: {
          plan,
          months: state.selection.months,
          transparency: state.selection.transparency,
          startDate: new Date(),
          totalCost
        }
      };
    default:
      return state;
  }
};

export const SubscriptionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <SubscriptionContext.Provider value={{ state, dispatch }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};