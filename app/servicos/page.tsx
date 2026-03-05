import { Metadata } from 'next'
import Link from 'next/link'
import { Home, Key, Calculator, TrendingUp, Star, MapPin, Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Serviços Imobiliários | Tyson Cofre RE/MAX',
  description: 'Serviços de compra, venda, arrendamento e avaliação de imóveis em Almada e Lisboa. Consultoria personalizada com Tyson Cofre.',
}

export default function ServicosPage() {
  const services = [
    {
      icon: Home,
      title: 'Compra de Imóvel',
      description: 'Encontre o imóvel perfeito para comprar. Acompanhamento personalizado em toda a processo de compra, desde a pesquisa até à escritura.',
      features: [
        'Pesquisa personalizada de imóveis',
        'Visitas guiadas',
        'Negociação e acompanhamento',
        'Apoio na documentação',
      ],
    },
    {
      icon: Key,
      title: 'Arrendamento',
      description: 'Encontre a melhor opção de arrendamento para as suas necessidades com as melhores condições do mercado.',
      features: [
        'Grande carteira de imóveis para arrendar',
        'Análise de contratos',
        'Apoio na negociação',
        'Seguimento pós-arrendamento',
      ],
    },
    {
      icon: Calculator,
      title: 'Avaliação Imobiliária',
      description: 'Avaliação profissional do seu imóvel com relatório detalhado e análise de mercado atual.',
      features: [
        'Avaliação certificada',
        'Relatório detalhado',
        'Análise comparativa de mercado',
        'Sugestões de valorização',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Estudo de Mercado',
      description: 'Análise detalhada do mercado imobiliário na zona de Almada e Lisboa para tomar a melhor decisão.',
      features: [
        'Análise de tendências',
        'Preços por zona',
        'Projeções de valorização',
        'Relatório personalizado',
      ],
    },
    {
      icon: Star,
      title: 'Consultoria para Investidores',
      description: 'Orientação especializada para investidores que procuram oportunidades no mercado imobiliário.',
      features: [
        'Análise de investimentos',
        'Oportunidades de mercado',
        'Due diligence',
        'Apoio na gestão',
      ],
    },
    {
      icon: MapPin,
      title: 'Procura Personalizada',
      description: 'Serviço de busca personalizada para encontrar exatamente o que procura, mesmo que não exista ainda no mercado.',
      features: [
        'Perfil detalhado do cliente',
        'Busca ativa no mercado',
        'Alertas de novos imóveis',
        'Negociação exclusiva',
      ],
    },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#0A2240] mb-4">
            Os Nossos Serviços
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Serviços imobiliários completos para ajudá-lo a encontrar, comprar, vender ou arrendar o imóvel ideal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <service.icon className="text-[#DC1010] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 text-[#0A2240]">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-2 h-2 bg-[#DC1010] rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-[#0A2240] text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de Ajuda?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Entre em contacto comigo para uma conversa sem compromisso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+351930567663"
              className="flex items-center gap-2 bg-[#DC1010] px-6 py-3 rounded font-bold hover:bg-[#b00d0d] transition"
            >
              <Phone size={20} />
              Ligar Agora
            </a>
            <Link
              href="/contactos"
              className="border-2 border-white px-6 py-3 rounded font-bold hover:bg-white hover:text-[#0A2240] transition"
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
