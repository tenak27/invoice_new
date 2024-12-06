import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu as MenuIcon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  X 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { useAuthStore } from '../../store/useAuthStore';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-background-secondary border-b border-border shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="p-2 rounded-lg text-text-primary hover:bg-primary/10 focus:outline-none"
            >
              <MenuIcon className="h-6 w-6" />
            </motion.button>
            <div className="ml-4">
              <Logo size="sm" variant="compact" className="hover:opacity-80 transition-opacity" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg text-text-primary hover:bg-primary/10 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  <span>{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </motion.button>

              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 rounded-lg bg-background-secondary border border-border shadow-lg"
                >
                  <div className="py-1">
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-primary/10"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Paramètres
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-text-primary hover:bg-primary/10"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Déconnexion
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}