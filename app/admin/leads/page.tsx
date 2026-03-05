import { PrismaClient } from '@prisma/client'
import { Check, X } from 'lucide-react'

const prisma = new PrismaClient()

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Mark all as read (simple approach for demo)
  await prisma.lead.updateMany({
    where: { read: false },
    data: { read: true }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#0A2240] mb-8">Gerir Leads</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            Ainda não há leads registados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensagem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fonte</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.map((lead: { id: string; name: string; email: string; phone: string | null; message: string; source: string | null; createdAt: Date; read: boolean }) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={`mailto:${lead.email}`} className="text-[#DC1010] hover:underline">
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.phone ? (
                        <a href={`tel:${lead.phone}`} className="text-[#0A2240] hover:underline">
                          {lead.phone}
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <p className="truncate">{lead.message}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.source || 'Direct'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleString('pt-PT')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
