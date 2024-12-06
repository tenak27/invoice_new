import { format, formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatDate(date: Date): string {
  return format(date, 'dd MMM yyyy', { locale: fr });
}

export function formatDateTime(date: Date): string {
  return format(date, 'dd MMM yyyy HH:mm', { locale: fr });
}

export function formatRelativeTime(date: Date): string {
  return formatDistance(date, new Date(), { locale: fr, addSuffix: true });
}

export function formatDateRange(start: Date, end: Date): string {
  return `${formatDate(start)} - ${formatDate(end)}`;
}