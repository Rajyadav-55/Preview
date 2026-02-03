import React from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Pricing', href: '#' },
      { name: 'Plans', href: '/' },
      { name: 'Features', href: '#' },
      { name: 'Security', href: '#' }
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' }
    ],
    Support: [
      { name: 'Help Center', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Status', href: '#' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookies Policy', href: '#' },
      { name: 'Compliance', href: '#' }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };
  
  return (
    <footer className={`bg-gradient-to-b ${isDark ? 'from-gray-800 to-gray-900' : 'from-gray-900 to-black'} ${isDark ? 'text-gray-300' : 'text-gray-300'} mt-16`}>
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-1 lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-lg">S</span>
                </div>
                <h3 className="text-xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  FlexiSub
                </h3>
              </div>
              <p className={`text-sm mb-6 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Flexible subscription management made simple. No hidden fees, complete transparency.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <GlobeAltIcon className="h-5 w-5" />, label: 'Web' },
                  { icon: <EnvelopeIcon className="h-5 w-5" />, label: 'Email' }
                ].map((item) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-all ${isDark ? 'bg-gray-700 hover:bg-blue-600/30 text-gray-500 hover:text-blue-400' : 'bg-gray-800 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400'}`}
                    title={item.label}
                  >
                    {item.icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <h4 className={`font-bold mb-4 text-sm uppercase tracking-wider ${isDark ? 'text-gray-200' : 'text-white'}`}>
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className={`${isDark ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-400'} transition-colors text-sm font-medium`}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className={`border-t my-8 md:my-12 ${isDark ? 'border-gray-700' : 'border-gray-800'}`} />

          {/* Bottom Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <motion.div variants={itemVariants} className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
              <p>&copy; {currentYear} FlexiSub. All rights reserved.</p>
              <p className="mt-1">Built with <HeartIcon className="h-4 w-4 inline text-red-500" /> by FlexiSub Team</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center md:justify-end gap-6"
            >
              <a
                href="mailto:rajyadav01dev@gmail.com"
                className={`flex items-center gap-2 transition-colors text-sm ${isDark ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-400'}`}
              >
                <EnvelopeIcon className="h-4 w-4" />
                <span>Support</span>
              </a>
              <a
                href="#"
                className={`flex items-center gap-2 transition-colors text-sm ${isDark ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-400'}`}
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span>English</span>
              </a>
              <a
                href="#"
                className={`transition-colors text-sm ${isDark ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-400'}`}
              >
                Status Page
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Top Gradient Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </footer>
  );
};

export default Footer;