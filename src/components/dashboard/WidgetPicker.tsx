import React from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { 
  BarChart3, 
  Package, 
  Users, 
  FileText, 
  Clock, 
  TrendingUp,
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  PieChart,
  Activity,
  Map
} from 'lucide-react';

const availableWidgets = [
  {
    type: 'revenue_chart',
    title: 'Graphique des revenus',
    description: 'Visualisez l\'évolution de vos revenus',
    icon: TrendingUp,
    defaultConfig: {
      period: 'month',
      showTarget: true,
      compareLastPeriod: true,
      currency: 'XOF',
      chartType: 'line'
    }
  },
  {
    type: 'stock_levels',
    title: 'Niveaux de stock',
    description: 'Surveillez vos niveaux de stock',
    icon: Package,
    defaultConfig: {
      showLowStock: true,
      alertThreshold: 10,
      showReorderPoint: true,
      displayType: 'chart'
    }
  },
  {
    type: 'top_products',
    title: 'Meilleurs produits',
    description: 'Vos produits les plus vendus',
    icon: ShoppingCart,
    defaultConfig: {
      limit: 5,
      period: 'month',
      metric: 'revenue',
      showTrend: true
    }
  },
  {
    type: 'customer_stats',
    title: 'Statistiques clients',
    description: 'Aperçu de vos clients',
    icon: Users,
    defaultConfig: {
      showNewCustomers: true,
      showRetentionRate: true,
      showLifetimeValue: true,
      period: 'month'
    }
  },
  {
    type: 'invoice_status',
    title: 'État des factures',
    description: 'Suivi des factures',
    icon: FileText,
    defaultConfig: {
      showOverdue: true,
      showPending: true,
      displayType: 'pie',
      period: 'month'
    }
  },
  {
    type: 'recent_transactions',
    title: 'Transactions récentes',
    description: 'Dernières transactions',
    icon: Clock,
    defaultConfig: {
      limit: 5,
      showAmount: true,
      showStatus: true,
      types: ['payment', 'invoice', 'quote']
    }
  },
  {
    type: 'cash_flow',
    title: 'Flux de trésorerie',
    description: 'Suivi des entrées et sorties',
    icon: DollarSign,
    defaultConfig: {
      period: 'month',
      showProjection: true,
      showBreakdown: true,
      chartType: 'bar'
    }
  },
  {
    type: 'stock_alerts',
    title: 'Alertes stock',
    description: 'Produits en rupture ou bas',
    icon: AlertTriangle,
    defaultConfig: {
      showLowStock: true,
      showOutOfStock: true,
      showReorderSuggestions: true,
      sortBy: 'priority'
    }
  },
  {
    type: 'sales_performance',
    title: 'Performance des ventes',
    description: 'Analyse des ventes',
    icon: PieChart,
    defaultConfig: {
      period: 'month',
      showTarget: true,
      showComparison: true,
      metrics: ['revenue', 'volume', 'average']
    }
  },
  {
    type: 'activity_feed',
    title: 'Activité récente',
    description: 'Journal des activités',
    icon: Activity,
    defaultConfig: {
      limit: 10,
      types: ['invoice', 'quote', 'payment', 'stock'],
      showUser: true,
      showTimestamp: true
    }
  },
  {
    type: 'sales_map',
    title: 'Carte des ventes',
    description: 'Répartition géographique',
    icon: Map,
    defaultConfig: {
      region: 'SN',
      metric: 'revenue',
      period: 'month',
      showLegend: true
    }
  }
];

interface WidgetPickerProps {
  onClose: () => void;
}

export function WidgetPicker({ onClose }: WidgetPickerProps) {
  const { addWidget } = useDashboardStore();

  const handleAddWidget = (type: string, title: string, config: any) => {
    addWidget({
      type,
      title,
      position: Date.now(),
      config,
    });
    onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-6">Ajouter un widget</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableWidgets.map((widget) => (
          <button
            key={widget.type}
            onClick={() => handleAddWidget(widget.type, widget.title, widget.defaultConfig)}
            className="flex items-start p-4 border rounded-lg hover:border-indigo-500 transition-colors dark:border-gray-600 dark:hover:border-indigo-400"
          >
            <widget.icon className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mr-4 mt-1" />
            <div className="text-left">
              <h3 className="font-medium dark:text-gray-200">{widget.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{widget.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}