'use client'

import { useState, useEffect } from 'react'
import { Cookie } from 'lucide-react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0A2240] text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Cookie size={24} className="text-[#DC1010]" />
          <p className="text-sm">
            Utilizamos cookies para melhorar a sua experiência no nosso site. 
            Ao continuar a navegar, concorda com a nossa{' '}
            <a href="/cookies" className="underline hover:text-[#DC1010]">Política de Cookies</a>.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm border border-gray-500 rounded hover:bg-gray-700 transition"
          >
            Recusar
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm bg-[#DC1010] rounded hover:bg-[#b00d0d] transition"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
