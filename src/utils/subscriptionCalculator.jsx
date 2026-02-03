export const subscriptionPlans = [
  {
    id: 'weekly',
    name: 'Weekly',
    frequency: 'weekly',
    price: 12.99,
    description: 'Perfect for trying out our service',
    features: [
      'Access to all basic features',
      'Weekly email updates',
      'Basic support',
      'Limited storage (5GB)'
    ],
    bestValue: false
  },
  {
    id: 'twice-weekly',
    name: 'Twice Weekly',
    frequency: 'twice-weekly',
    price: 22.99,
    description: 'More frequent updates and features',
    features: [
      'Everything in Weekly plan',
      'Twice weekly updates',
      'Priority support',
      'Medium storage (15GB)',
      'Advanced analytics'
    ],
    bestValue: true
  },
  {
    id: 'fortnightly',
    name: 'Fortnightly',
    frequency: 'fortnightly',
    price: 19.99,
    description: 'Balance of features and value',
    features: [
      'Everything in Weekly plan',
      'Fortnightly expert sessions',
      'Standard support',
      'Medium storage (10GB)'
    ],
    bestValue: false
  },
  {
    id: 'monthly',
    name: 'Monthly',
    frequency: 'monthly',
    price: 39.99,
    description: 'Maximum value for committed users',
    features: [
      'Everything in Twice Weekly plan',
      'Monthly strategy sessions',
      '24/7 premium support',
      'Unlimited storage',
      'Custom reporting',
      'API access'
    ],
    bestValue: false
  }
];

export const calculatePrice = (plan, months, transparency) => {
  let basePrice = plan.price;
  
  switch (plan.frequency) {
    case 'weekly':
      basePrice *= 4.33;
      break;
    case 'twice-weekly':
      basePrice *= 8.66;
      break;
    case 'fortnightly':
      basePrice *= 2.165;
      break;
    case 'monthly':
      break;
  }
  
  let total = basePrice * months;
  
  if (transparency === 'transparent') {
    total *= 0.9;
  }
  
  return Math.round(total * 100) / 100;
};