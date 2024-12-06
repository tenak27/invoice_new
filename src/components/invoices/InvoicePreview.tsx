import React from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FileText, Mail, Download, Printer, Share2 } from 'lucide-react';

interface InvoicePreviewProps {
  data: {
    customer?: any;
    items: any[];
    subtotal: number;
    tax: number;
    total: number;
    notes?: string;
    validUntil?: Date;
    status?: string;
  };
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  const { settings } = useSettingsStore();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // TODO: Implémenter la génération PDF
    console.log('Téléchargement PDF');
  };

  const handleSendEmail = () => {
    // TODO: Implémenter l'envoi par email
    console.log('Envoi par email');
  };

  const handleShare = () => {
    // TODO: Implémenter le partage
    console.log('Partage du document');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Barre d'actions */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-gray-500" />
          <span className="font-medium">Aperçu du document</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleSendEmail} className="p-2 hover:bg-gray-200 rounded-full" title="Envoyer par email">
            <Mail className="h-5 w-5 text-gray-600" />
          </button>
          <button onClick={handleDownload} className="p-2 hover:bg-gray-200 rounded-full" title="Télécharger">
            <Download className="h-5 w-5 text-gray-600" />
          </button>
          <button onClick={handlePrint} className="p-2 hover:bg-gray-200 rounded-full" title="Imprimer">
            <Printer className="h-5 w-5 text-gray-600" />
          </button>
          <button onClick={handleShare} className="p-2 hover:bg-gray-200 rounded-full" title="Partager">
            <Share2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* En-tête */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            {settings.logo && (
              <img
                src={settings.logo}
                alt="Logo de l'entreprise"
                className="h-16 object-contain mb-4"
              />
            )}
            <h1 className="text-2xl font-bold text-gray-900">{settings.companyName}</h1>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>{settings.address}</p>
              <p>Tél: {settings.phone}</p>
              <p>Email: {settings.email}</p>
              <p>N° TVA: {settings.taxId}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-block bg-gray-100 rounded-lg px-6 py-4">
              <h2 className="text-2xl font-bold text-indigo-600 mb-2">FACTURE</h2>
              <p className="text-gray-600">N° FAC/2024/0001</p>
              <p className="text-gray-600">Date: {format(new Date(), 'dd MMMM yyyy', { locale: fr })}</p>
              {data.validUntil && (
                <p className="text-gray-600">
                  Échéance: {format(new Date(data.validUntil), 'dd MMMM yyyy', { locale: fr })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Informations client */}
        {data.customer && (
          <div className="mb-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Facturer à</h2>
            <div className="text-gray-700">
              <p className="text-lg font-medium">{data.customer.name}</p>
              <p>{data.customer.address}</p>
              <div className="mt-2">
                <p>Tél: {data.customer.phone}</p>
                <p>Email: {data.customer.email}</p>
                {data.customer.taxId && (
                  <p>N° TVA: {data.customer.taxId}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Articles */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qté</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unit.</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">TVA</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.items.map((item, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {item.product?.name || 'Produit non spécifié'}
                    </div>
                    <div className="text-gray-500">{item.description}</div>
                  </td>
                  <td className="px-6 py-4 text-right">{item.quantity}</td>
                  <td className="px-6 py-4 text-right">{formatCurrency(item.price)}</td>
                  <td className="px-6 py-4 text-right">18%</td>
                  <td className="px-6 py-4 text-right font-medium">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totaux */}
        <div className="mb-8">
          <div className="bg-gray-50 rounded-lg p-6 ml-auto w-72">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total HT</span>
                <span className="font-medium">{formatCurrency(data.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">TVA (18%)</span>
                <span className="font-medium">{formatCurrency(data.tax)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-lg font-medium">Total TTC</span>
                <span className="text-lg font-bold text-indigo-600">{formatCurrency(data.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes et conditions */}
        {(data.notes || settings.invoiceNotes) && (
          <div className="border-t pt-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
                <div className="text-sm text-gray-600 whitespace-pre-line">
                  {data.notes || settings.invoiceNotes}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Conditions de paiement</h3>
                <div className="text-sm text-gray-600">
                  <p>Paiement à 30 jours</p>
                  <p>Coordonnées bancaires :</p>
                  <p>{settings.bankDetails}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Signature */}
        {settings.useSignature && settings.signature && (
          <div className="mt-8 flex justify-end">
            <div className="text-center">
              <img
                src={settings.signature}
                alt="Signature"
                className="h-16 object-contain mb-2"
              />
              <div className="text-sm text-gray-500">Signature autorisée</div>
            </div>
          </div>
        )}

        {/* Pied de page */}
        <div className="mt-8 pt-8 border-t text-center text-xs text-gray-500">
          <p>{settings.companyName} - {settings.address}</p>
          <p>Tél: {settings.phone} | Email: {settings.email}</p>
          <p>RCCM: {settings.registrationNumber} | N° TVA: {settings.taxId}</p>
        </div>
      </div>
    </div>
  );
}