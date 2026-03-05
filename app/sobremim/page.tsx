import { Metadata } from 'next'
import { Award, Star, Globe, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Mim | Tyson Cofre RE/MAX',
  description: 'Conheça Tyson Cofre, consultor imobiliário RE/MAX em Almada. Experiência, formação e compromissos com os clientes.',
}

export default function SobreMimPage() {
  const timeline = [
    { year: '2024', title: 'Início da carreira na RE/MAX' },
    { year: '2024', title: 'Prémio Rookie do Ano' },
    { year: '2025', title: 'Prémio Presidente' },
    { year: '2025', title: '5 Estrelas RE/MAX' },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-6 text-[#0A2240]">
              Tyson Cofre
            </h1>
            <p className="text-xl text-[#DC1010] font-medium mb-4">
              Consultor Imobiliário RE/MAX
            </p>
            <p className="text-gray-600 mb-6">
              Sou Tyson Cofre, consultor imobiliário da RE/MAX Bay II em Almada. 
              Com uma abordagem focada no cliente, ajudo famílias e investidores 
              a encontrar o imóvel perfeito na região de Lisboa e Setúbal.
            </p>
            <p className="text-gray-600 mb-6">
              O meu compromisso é oferecer um serviço de excelência, com 
              transparência e profissionalismo em cada etapa do processo de 
              compra, venda ou arrendamento de imóveis.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded">
                <Globe size={18} className="text-[#DC1010]" />
                <span>Português, Inglês, Espanhol</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded">
                <Calendar size={18} className="text-[#DC1010]" />
                <span>Disponível 7 dias por semana</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img
              src="/images/tyson-frente.png"
              alt="Tyson Cofre"
              className="w-full h-full object-contain bg-white"
            />
          </div>
        </div>

        {/* Awards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#0A2240]">
            Prémios e Reconhecimentos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Award className="text-[#C9A84C] mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-[#0A2240] mb-2">Prémio Presidente 2025</h3>
              <p className="text-gray-600">Reconhecimento de excelência em vendas</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Star className="text-[#C9A84C] mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-[#0A2240] mb-2">5 Estrelas RE/MAX</h3>
              <p className="text-gray-600">Avaliação máxima de satisfação</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Award className="text-[#C9A84C] mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-[#0A2240] mb-2">Rookie do Ano</h3>
              <p className="text-gray-600">Melhor estreante da região</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-[#0A2240]">
            Carreira
          </h2>
          <div className="max-w-2xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4 pb-8">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-[#DC1010] rounded-full"></div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200"></div>
                  )}
                </div>
                <div className="pb-4">
                  <span className="text-[#DC1010] font-bold">{item.year}</span>
                  <h3 className="font-bold text-[#0A2240]">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
