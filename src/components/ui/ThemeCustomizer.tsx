import React from 'react';
import { motion } from 'framer-motion';
import { Settings, X, Circle, CheckCircle2 } from 'lucide-react';
import { useThemeStore } from '../../lib/utils/theme';

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, setTheme, radius, setRadius, isCompact, setCompact } = useThemeStore();

  const radiusOptions = [
    { value: 'none', label: 'Aucun' },
    { value: 'sm', label: 'Petit' },
    { value: 'md', label: 'Moyen' },
    { value: 'lg', label: 'Grand' },
    { value: 'full', label: 'Complet' },
  ];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors"
      >
        <Settings className="h-6 w-6" />
      </motion.button>

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed inset-y-0 right-0 w-80 bg-background-paper shadow-xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Personnalisation</h2>
          <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-text-primary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Mode */}
          <div>
            <h3 className="text-sm font-medium mb-3">Mode</h3>
            <div className="grid grid-cols-2 gap-3">
              {['light', 'dark'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTheme(mode as 'light' | 'dark')}
                  className={`p-3 rounded-lg border ${
                    theme === mode
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{mode}</span>
                    {theme === mode ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 text-text-disabled" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <h3 className="text-sm font-medium mb-3">Coins arrondis</h3>
            <div className="grid grid-cols-2 gap-3">
              {radiusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setRadius(option.value as any)}
                  className={`p-3 rounded-lg border ${
                    radius === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {radius === option.value ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 text-text-disabled" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Layout Density */}
          <div>
            <h3 className="text-sm font-medium mb-3">Densité</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: false, label: 'Confortable' },
                { value: true, label: 'Compact' },
              ].map((option) => (
                <button
                  key={String(option.value)}
                  onClick={() => setCompact(option.value)}
                  className={`p-3 rounded-lg border ${
                    isCompact === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {isCompact === option.value ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 text-text-disabled" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}