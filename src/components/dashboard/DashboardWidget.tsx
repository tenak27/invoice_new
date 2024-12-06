import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { Widget } from '../../types/dashboard';
import { Modal } from '../ui/Modal';
import { WidgetSettings } from './WidgetSettings';
import { RevenueChart } from './widgets/RevenueChart';
import { StockLevels } from './widgets/StockLevels';
import { TopProducts } from './widgets/TopProducts';
import { CustomerStats } from './widgets/CustomerStats';
import { InvoiceStatus } from './widgets/InvoiceStatus';
import { RecentTransactions } from './widgets/RecentTransactions';

const widgetComponents = {
  revenue_chart: RevenueChart,
  stock_levels: StockLevels,
  top_products: TopProducts,
  customer_stats: CustomerStats,
  invoice_status: InvoiceStatus,
  recent_transactions: RecentTransactions,
};

interface DashboardWidgetProps {
  widget: Widget;
}

export function DashboardWidget({ widget }: DashboardWidgetProps) {
  const { removeWidget, updateWidget } = useDashboardStore();
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const WidgetComponent = widgetComponents[widget.type as keyof typeof widgetComponents];

  const handleUpdateConfig = (newConfig: any) => {
    updateWidget(widget.id, { config: { ...widget.config, ...newConfig } });
    setSettingsOpen(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{widget.title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSettingsOpen(true)}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Paramètres du widget"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={() => removeWidget(widget.id)}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Supprimer le widget"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          {WidgetComponent && <WidgetComponent config={widget.config} />}
        </div>
      </div>

      <Modal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)}>
        <WidgetSettings
          widget={widget}
          onClose={() => setSettingsOpen(false)}
          onUpdate={handleUpdateConfig}
        />
      </Modal>
    </>
  );
}