import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useThemeStore } from '../../lib/utils/theme';

export function AnimatedLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { theme } = useThemeStore();

  return (
    <div className={`min-h-screen bg-background-primary ${theme}`}>
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex">
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="sticky top-16 h-[calc(100vh-4rem)]"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.main
          layout
          className="flex-1 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}