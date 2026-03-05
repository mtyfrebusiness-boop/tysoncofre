'use client'

import { useState } from 'react'
import { Calculator, Check } from 'lucide-react'

export default function EstudoMercadoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyType: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'estudo-mercado',
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyAddress: '',
          propertyType: '',
          message: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-500" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#0A2240] mb-4">
              Pedido Enviado!
            </h2>
            <p className="text-gray-600 mb-6">
              Obrigado pelo seu interesse. Em breve entrarei em contacto consigo 
              para fornecer o estudo de mercado solicitado.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="text-[#DC1010] font-medium hover:underline"
            >
              Fazer outro pedido
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Calculator className="text-[#DC1010] mx-auto mb-4" size={48} />
            <h1 className="text-4xl font-bold text-[#0A2240] mb-4">
              Estudo de Mercado
            </h1>
            <p className="text-gray-600">
              Descubra o valor real do seu imóvel no mercado atual. 
              Receba uma análise detalhada e personalizada.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                    placeholder="O seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                    placeholder="seu@email.pt"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telemóvel
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                    placeholder="+351 900 000 000"
                  />
                </div>

                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Imóvel
                  </label>
                  <select
                    id="propertyType"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="moradia">Moradia</option>
                    <option value="t1">T1</option>
                    <option value="t2">T2</option>
                    <option value="t3">T3</option>
                    <option value="t4">T4 ou mais</option>
                    <option value="loja">Loja</option>
                    <option value="escritorio">Escritório</option>
                    <option value="terreno">Terreno</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Morada do Imóvel
                </label>
                <input
                  type="text"
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                  placeholder="Rua, Código Postal, Localidade"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem / Informações Adicionais
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                  placeholder="Conte-nos mais sobre o imóvel ou as suas necessidades..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#DC1010] text-white py-3 rounded font-bold hover:bg-[#b00d0d] transition disabled:opacity-50"
              >
                {status === 'loading' ? 'A enviar...' : 'Solicitar Estudo de Mercado'}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">
                  Ocorreu um erro. Por favor, tente novamente.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
