'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail } from 'lucide-react'

const navLinks = [
  { href: '/imoveis', label: 'Imóveis' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/sobremim', label: 'Sobre Mim' },
  { href: '/blog', label: 'Blog' },
  { href: '/contactos', label: 'Contactos' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#0A2240] text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+351930567663" className="flex items-center gap-2 hover:text-[#DC1010] transition">
              <Phone size={16} />
              <span>+351 930 567 663</span>
            </a>
            <a href="mailto:tysoncofre@remax.pt" className="flex items-center gap-2 hover:text-[#DC1010] transition">
              <Mail size={16} />
              <span>tysoncofre@remax.pt</span>
            </a>
          </div>
          <div className="text-sm">AMI Licença Nº 14507</div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/tysoncofre-logo.png" 
              alt="Tyson Cofre - Consultor Imobiliário RE/MAX" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition ${
                  pathname === link.href
                    ? 'text-[#DC1010]'
                    : 'text-[#0A2240] hover:text-[#DC1010]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/estudo-mercado"
              className="bg-[#DC1010] text-white px-6 py-2 rounded font-medium hover:bg-[#b00d0d] transition"
            >
              Pedir Estudo de Mercado
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#0A2240]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 font-medium ${
                  pathname === link.href
                    ? 'text-[#DC1010]'
                    : 'text-[#0A2240]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/estudo-mercado"
              className="block mt-4 bg-[#DC1010] text-white px-6 py-2 rounded font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Pedir Estudo de Mercado
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
