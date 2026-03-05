import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0A2240] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <img 
                src="/images/tysoncofre-logo.png" 
                alt="Tyson Cofre RE/MAX" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-4">
              Consultor imobiliário RE/MAX na região de Almada e Lisboa. 
              Ajudo você a encontrar o imóvel dos seus sonhos.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#DC1010] transition">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#DC1010] transition">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#DC1010] transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/imoveis" className="text-gray-300 hover:text-[#DC1010] transition">Imóveis</Link></li>
              <li><Link href="/servicos" className="text-gray-300 hover:text-[#DC1010] transition">Serviços</Link></li>
              <li><Link href="/sobremim" className="text-gray-300 hover:text-[#DC1010] transition">Sobre Mim</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-[#DC1010] transition">Blog</Link></li>
              <li><Link href="/contactos" className="text-gray-300 hover:text-[#DC1010] transition">Contactos</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li><Link href="/imoveis?type=sale" className="text-gray-300 hover:text-[#DC1010] transition">Comprar Imóvel</Link></li>
              <li><Link href="/imoveis?type=rent" className="text-gray-300 hover:text-[#DC1010] transition">Arrendar Imóvel</Link></li>
              <li><Link href="/estudo-mercado" className="text-gray-300 hover:text-[#DC1010] transition">Estudo de Mercado</Link></li>
              <li><Link href="/avaliacao" className="text-gray-300 hover:text-[#DC1010] transition">Avaliação Imobiliária</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contactos</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-[#DC1010] mt-1" />
                <div>
                  <p className="font-medium">Telemóvel</p>
                  <a href="tel:+351930567663" className="text-gray-300 hover:text-[#DC1010] transition">+351 930 567 663</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-[#DC1010] mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:tysoncofre@remax.pt" className="text-gray-300 hover:text-[#DC1010] transition">tysoncofre@remax.pt</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#DC1010] mt-1" />
                <div>
                  <p className="font-medium">Escritório</p>
                  <p className="text-gray-300">RE/MAX Bay II, Almada</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tyson Cofre - RE/MAX. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacidade" className="text-gray-400 hover:text-[#DC1010] transition">Política de Privacidade</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-[#DC1010] transition">Política de Cookies</Link>
            <Link href="/legal" className="text-gray-400 hover:text-[#DC1010] transition">Aviso Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
