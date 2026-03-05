'use client'

import { useState } from 'react'

interface ContactFormProps {
  source?: string
  listingId?: string
  listingTitle?: string
}

export default function ContactForm({ source = 'homepage', listingId, listingTitle }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: listingTitle ? `Estou interessado no imóvel: ${listingTitle}` : '',
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
          source,
          listingId,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-green-800 font-bold text-lg mb-2">Mensagem Enviada!</h3>
        <p className="text-green-700">
          Obrigado pelo seu contacto. Em breve receberá uma resposta da nossa parte.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-green-600 underline hover:text-green-800"
        >
          Enviar nova mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Mensagem *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
          placeholder="Como podemos ajudá-lo?"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#DC1010] text-white py-3 rounded font-bold hover:bg-[#b00d0d] transition disabled:opacity-50"
      >
        {status === 'loading' ? 'A enviar...' : 'Enviar Mensagem'}
      </button>

      {status === 'error' && (
        <p className="text-red-500 text-sm text-center">
          Ocorreu um erro. Por favor, tente novamente.
        </p>
      )}
    </form>
  )
}
