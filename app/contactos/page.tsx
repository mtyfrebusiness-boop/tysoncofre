import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contactos | Tyson Cofre RE/MAX',
  description: 'Contacte Tyson Cofre, consultor imobiliário RE/MAX em Almada. Telefone, email e formulário de contacto disponíveis.',
}

export default function ContactosPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#0A2240]">
          Contactos
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-6 text-[#0A2240]">
                Informações de Contacto
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-[#DC1010] mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-[#0A2240]">Telefone</h3>
                    <a href="tel:+351930567663" className="text-gray-600 hover:text-[#DC1010]">
                      +351 930 567 663
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-[#DC1010] mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-[#0A2240]">Email</h3>
                    <a href="mailto:tysoncofre@remax.pt" className="text-gray-600 hover:text-[#DC1010]">
                      tysoncofre@remax.pt
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="text-[#DC1010] mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-[#0A2240]">Escritório</h3>
                    <p className="text-gray-600">
                      RE/MAX Bay II<br />
                      Almada, Portugal
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-[#DC1010] mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-[#0A2240]">Horário</h3>
                    <p className="text-gray-600">
                      Segunda a Sexta: 9h - 19h<br />
                      Sábado: 10h - 13h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Mapa - RE/MAX Bay II, Almada</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-[#0A2240]">
                Envie-nos uma Mensagem
              </h2>
              <ContactForm source="contactos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
