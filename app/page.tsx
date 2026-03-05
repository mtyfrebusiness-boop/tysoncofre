import Link from 'next/link'
import { prisma } from '@/lib/db'
import ListingCard from '@/components/ListingCard'
import ContactForm from '@/components/ContactForm'
import { Phone, Award, Star, MapPin, Home, Key, Calculator, TrendingUp } from 'lucide-react'

export const revalidate = 60

export default async function HomePage() {
  // Fetch featured listings
  const featuredListings = await prisma.listing.findMany({
    where: { featured: true },
    take: 4,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0A2240] to-[#1a3a5c] text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on the LEFT */}
            <div>
              <div className="relative h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden">
                <img
                  src="/images/tyson-frente.png"
                  alt="Tyson Cofre - Consultor Imobiliário RE/MAX"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            </div>
            {/* Text on the RIGHT */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Encontre o Imóvel dos Seus Sonhos
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Sou Tyson Cofre, consultor RE/MAX em Almada e Lisboa. 
                Ajudo você a encontrar a casa perfeita para si e para a sua família.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded">
                  <Award className="text-[#C9A84C]" size={20} />
                  <span>Prémio Presidente 2025</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded">
                  <Star className="text-[#C9A84C]" size={20} />
                  <span>5 Estrelas</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded">
                  <TrendingUp className="text-[#C9A84C]" size={20} />
                  <span>Rookie do Ano</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+351930567663"
                  className="flex items-center gap-2 bg-[#DC1010] px-6 py-3 rounded font-bold hover:bg-[#b00d0d] transition"
                >
                  <Phone size={20} />
                  Ligar Agora
                </a>
                <a
                  href="https://wa.me/351930567663"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] px-6 py-3 rounded font-bold hover:bg-[#20BD5A] transition"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0A2240]">
            Os Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <Home className="text-[#DC1010] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 text-[#0A2240]">Compra de Imóvel</h3>
              <p className="text-gray-600">
                Encontre o imóvel perfeito para comprar. Acompanhamento personalizado em toda a processo de compra.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <Key className="text-[#DC1010] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 text-[#0A2240]">Arrendamento</h3>
              <p className="text-gray-600">
                Encontre a melhor opção de arrendamento para as suas necessidades com as melhores condições do mercado.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <Calculator className="text-[#DC1010] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 text-[#0A2240]">Avaliação Imobiliária</h3>
              <p className="text-gray-600">
                Avaliação profissional do seu imóvel com relatório detalhado e análise de mercado.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <TrendingUp className="text-[#DC1010] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 text-[#0A2240]">Estudo de Mercado</h3>
              <p className="text-gray-600">
                Análise detalhada do mercado imobiliário na zona de Almada e Lisboa para tomar a melhor decisão.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <Star className="text-[#DC1010] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 text-[#0A2240]">Consultoria Personalizada</h3>
              <p className="text-gray-600">
                Orientação especializada para investidores e quem procura imóveis de luxo.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <MapPin className="text-[#DC1010] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 text-[#0A2240]">Procura de Imóvel</h3>
              <p className="text-gray-600">
                Serviço de busca personalizada para encontrar exatamente o que procura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A2240]">
              Imóveis em Destaque
            </h2>
            <Link
              href="/imoveis"
              className="text-[#DC1010] font-medium hover:underline"
            >
              Ver Todos os Imóveis →
            </Link>
          </div>
          {featuredListings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredListings.map((listing: any) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Em breve imóveis em destaque
            </p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#0A2240]">
                Tyson Cofre - O Seu Consultor Imobiliário
              </h2>
              <p className="text-gray-600 mb-4">
                Com vasta experiência no mercado imobiliário português, especializei-me em ajudar famílias e investidores a encontrar o imóvel perfeito na região de Almada e Lisboa.
              </p>
              <p className="text-gray-600 mb-6">
                Enquanto consultor RE/MAX, comprometo-me a oferecer um serviço de excelência, com transparência e profissionalismo em cada etapa do processo.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/sobremim"
                  className="bg-[#0A2240] text-white px-6 py-3 rounded font-medium hover:bg-[#1a3a5c] transition"
                >
                  Saber Mais
                </Link>
                <Link
                  href="/contactos"
                  className="border-2 border-[#0A2240] text-[#0A2240] px-6 py-3 rounded font-medium hover:bg-[#0A2240] hover:text-white transition"
                >
                  Contactar
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/images/tysoncofre logo.png"
                alt="Tyson Cofre"
                className="w-full h-full object-contain bg-gray-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#0A2240]">
                Vamos Encontrar o Seu Imóvel Ideal?
              </h2>
              <p className="text-gray-600 mb-8">
                Entre em contacto comigo para uma conversa sem compromisso. 
                Estou disponível para ajudá-lo a encontrar o imóvel perfeito para si.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-[#DC1010]" size={24} />
                  <div>
                    <p className="font-bold">Telefone</p>
                    <a href="tel:+351930567663" className="text-gray-600 hover:text-[#DC1010]">
                      +351 930 567 663
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#25D366] font-bold">WhatsApp</span>
                  <div>
                    <p className="font-bold">WhatsApp</p>
                    <a 
                      href="https://wa.me/351930567663" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#DC1010]"
                    >
                      Enviar mensagem
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <ContactForm source="homepage" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
