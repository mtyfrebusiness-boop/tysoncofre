'use client'

import { useState, useEffect } from 'react'
import { Trash2, Mail, Phone, MessageSquare, Home, ExternalLink } from 'lucide-react'

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<any>(null)

  // Fetch leads on mount
  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = () => {
    fetch('/api/admin/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching leads:', err)
        setLoading(false)
      })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este lead?')) return
    
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id))
        if (selectedLead?.id === id) {
          setSelectedLead(null)
        }
      } else {
        alert('Erro ao excluir lead')
      }
    } catch (err) {
      alert('Erro ao excluir lead')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#0A2240] mb-8">Gerir Leads</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">A carregar...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            Ainda não há leads registados.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Leads List */}
            <div className="col-span-1 border-r">
              <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
                {leads.map((lead) => (
                  <div 
                    key={lead.id} 
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedLead?.id === lead.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                        {lead.listingTitle && (
                          <p className="text-xs text-[#DC1010] mt-1">
                            📍 {lead.listingTitle}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(lead.createdAt).toLocaleDateString('pt-PT')}
                      </div>
                    </div>
                    {!lead.read && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        Novo
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Lead Details */}
            <div className="col-span-2 p-6">
              {selectedLead ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#0A2240]">{selectedLead.name}</h2>
                    <button 
                      onClick={() => handleDelete(selectedLead.id)}
                      disabled={deletingId === selectedLead.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="text-gray-400" size={20} />
                      <a href={`mailto:${selectedLead.email}`} className="text-[#DC1010] hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>

                    {selectedLead.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="text-gray-400" size={20} />
                        <a href={`tel:${selectedLead.phone}`} className="text-[#0A2240] hover:underline">
                          {selectedLead.phone}
                        </a>
                      </div>
                    )}

                    {selectedLead.listingTitle && (
                      <div className="flex items-center gap-3">
                        <Home className="text-gray-400" size={20} />
                        <a 
                          href={`/imoveis/${selectedLead.listingId}`}
                          target="_blank"
                          className="text-[#0A2240] font-medium hover:underline flex items-center gap-1"
                        >
                          {selectedLead.listingTitle}
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <MessageSquare className="text-gray-400" size={20} />
                      <span className="text-gray-600">
                        {selectedLead.source || 'Direct'}
                      </span>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-medium text-gray-700 mb-2">Mensagem:</h3>
                      <p className="text-gray-600 whitespace-pre-wrap">{selectedLead.message}</p>
                    </div>

                    <div className="text-sm text-gray-400 mt-4">
                      Recebido em: {new Date(selectedLead.createdAt).toLocaleString('pt-PT')}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Selecione um lead para ver os detalhes
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
