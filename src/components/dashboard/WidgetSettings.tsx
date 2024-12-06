import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Widget } from '../../types/dashboard';

interface WidgetSettingsProps {
  widget: Widget;
  onClose: () => void;
  onUpdate: (config: any) => void;
}

export function WidgetSettings({ widget, onClose, onUpdate }: WidgetSettingsProps) {
  const [config, setConfig] = useState(widget.config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(config);
  };

  const renderPeriodSettings = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Période
      </label>
      <select
        value={config.period}
        onChange={(e) => setConfig({ ...config, period: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="day">Jour</option>
        <option value="week">Semaine</option>
        <option value="month">Mois</option>
        <option value="quarter">Trimestre</option>
        <option value="year">Année</option>
      </select>
    </div>
  );

  const renderChartSettings = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Type de graphique
      </label>
      <select
        value={config.chartType}
        onChange={(e) => setConfig({ ...config, chartType: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="line">Ligne</option>
        <option value="bar">Barre</option>
        <option value="pie">Camembert</option>
      </select>
    </div>
  );

  const renderLimitSettings = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Nombre d'éléments à afficher
      </label>
      <input
        type="number"
        value={config.limit}
        onChange={(e) => setConfig({ ...config, limit: parseInt(e.target.value) })}
        min="1"
        max="50"
        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );

  const renderMetricSettings = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Métrique
      </label>
      <select
        value={config.metric}
        onChange={(e) => setConfig({ ...config, metric: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="revenue">Chiffre d'affaires</option>
        <option value="volume">Volume</option>
        <option value="average">Moyenne</option>
      </select>
    </div>
  );

  const renderComparisonSettings = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="showTarget"
          checked={config.showTarget}
          onChange={(e) => setConfig({ ...config, showTarget: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="showTarget" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Afficher l'objectif
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="compareLastPeriod"
          checked={config.compareLastPeriod}
          onChange={(e) => setConfig({ ...config, compareLastPeriod: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="compareLastPeriod" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Comparer avec la période précédente
        </label>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Paramètres du widget : {widget.title}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Paramètres communs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Titre du widget
          </label>
          <input
            type="text"
            value={widget.title}
            onChange={(e) => setConfig({ ...config, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Paramètres spécifiques selon le type de widget */}
        {['revenue_chart', 'stock_levels', 'customer_stats'].includes(widget.type) && renderPeriodSettings()}
        {['revenue_chart', 'stock_levels'].includes(widget.type) && renderChartSettings()}
        {['top_products', 'recent_transactions'].includes(widget.type) && renderLimitSettings()}
        {['revenue_chart', 'top_products'].includes(widget.type) && renderMetricSettings()}
        {['revenue_chart', 'sales_performance'].includes(widget.type) && renderComparisonSettings()}

        {/* Paramètres spécifiques au type de widget */}
        {widget.type === 'stock_levels' && (
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showLowStock"
                checked={config.showLowStock}
                onChange={(e) => setConfig({ ...config, showLowStock: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="showLowStock" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Afficher les alertes de stock bas
              </label>
            </div>
            {config.showLowStock && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Seuil d'alerte (%)
                </label>
                <input
                  type="number"
                  value={config.alertThreshold}
                  onChange={(e) => setConfig({ ...config, alertThreshold: parseInt(e.target.value) })}
                  min="1"
                  max="100"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}