import React from 'react';
import { Edit, Trash2, Eye, Send, FileText, CheckCircle } from 'lucide-react';
import { useInvoiceStore } from '../../store/useInvoiceStore';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface InvoiceListProps {
  onEdit: (invoice: any) => void;
}

export function InvoiceList({ onEdit }: InvoiceListProps) {
  const { invoices, deleteInvoice, updateStatus } = useInvoiceStore();

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      deleteInvoice(id);
    }
  };

  const handleSend = (id: string) => {
    updateStatus(id, 'sent');
  };

  const handleMarkAsPaid = (id: string) => {
    updateStatus(id, 'paid');
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'overdue':
        return 'En retard';
      case 'draft':
        return 'Brouillon';
      case 'sent':
        return 'Envoyée';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Numéro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'échéance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{invoice.number}</div>
                  <div className="text-sm text-gray-500">
                    {format(invoice.createdAt, 'dd/MM/yyyy', { locale: fr })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Client {invoice.customerId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(invoice.dueDate, 'dd MMM yyyy', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.total)}</div>
                  <div className="text-xs text-gray-500">TVA incluse</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(invoice.status)}`}>
                    {getStatusLabel(invoice.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => window.open(`/invoices/${invoice.id}`, '_blank')}
                      className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-100 rounded"
                      title="Voir"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    
                    {invoice.status === 'draft' && (
                      <>
                        <button
                          onClick={() => handleSend(invoice.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-100 rounded"
                          title="Envoyer"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onEdit(invoice)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-100 rounded"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          className="text-red-600 hover:text-red-900 p-1 hover:bg-red-100 rounded"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}

                    {invoice.status === 'sent' && (
                      <>
                        <button
                          onClick={() => handleMarkAsPaid(invoice.id)}
                          className="text-green-600 hover:text-green-900 p-1 hover:bg-green-100 rounded"
                          title="Marquer comme payée"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => window.open(`/invoices/${invoice.id}/pdf`, '_blank')}
                          className="text-orange-600 hover:text-orange-900 p-1 hover:bg-orange-100 rounded"
                          title="Télécharger PDF"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}