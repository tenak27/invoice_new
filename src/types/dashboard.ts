export interface Widget {
  id: string;
  type: string;
  title: string;
  position: number;
  config: {
    period?: 'day' | 'week' | 'month' | 'quarter' | 'year';
    limit?: number;
    showTarget?: boolean;
    compareLastPeriod?: boolean;
    currency?: string;
    chartType?: 'line' | 'bar' | 'pie';
    showLowStock?: boolean;
    alertThreshold?: number;
    showReorderPoint?: boolean;
    displayType?: 'chart' | 'list' | 'pie';
    metric?: 'revenue' | 'volume' | 'average';
    showTrend?: boolean;
    showNewCustomers?: boolean;
    showRetentionRate?: boolean;
    showLifetimeValue?: boolean;
    showOverdue?: boolean;
    showPending?: boolean;
    showAmount?: boolean;
    showStatus?: boolean;
    types?: string[];
    showProjection?: boolean;
    showBreakdown?: boolean;
    showOutOfStock?: boolean;
    showReorderSuggestions?: boolean;
    sortBy?: 'priority' | 'name' | 'quantity';
    showComparison?: boolean;
    metrics?: string[];
    showUser?: boolean;
    showTimestamp?: boolean;
    region?: string;
    showLegend?: boolean;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }[];
}