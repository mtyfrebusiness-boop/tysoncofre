import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Tyson Cofre RE/MAX',
  description: 'Política de privacidade do site Tyson Cofre - Consultor Imobiliário RE/MAX.',
}

export default function PrivacidadePage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0A2240] mb-8">
            Política de Privacidade
          </h1>
          
          <div className="prose max-w-none space-y-6 text-gray-600">
            <p>
              A sua privacidade é importante para nós. Esta política de privacidade explica como recolemos, 
              usamos e protegemos os seus dados pessoais.
            </p>
            
            <h2 className="text-xl font-bold text-[#0A2240]">Dados Recolhidos</h2>
            <p>
              Recolhemos dados pessoais que nos fornece através do formulário de contacto, 
              incluindo nome, email, telefone e mensagem.
            </p>
            
            <h2 className="text-xl font-bold text-[#0A2240]">Utilização dos Dados</h2>
            <p>
              Os seus dados são utilizados exclusivamente para responder aos seus pedidos de contacto 
              e fornecer informações sobre os nossos serviços imobiliários.
            </p>
            
            <h2 className="text-xl font-bold text-[#0A2240]">Proteção de Dados</h2>
            <p>
              Implementamos medidas de segurança adequadas para proteger os seus dados pessoais 
              contra acesso não autorizado, alteração ou destruição.
            </p>
            
            <h2 className="text-xl font-bold text-[#0A2240]">Contacto</h2>
            <p>
              Para exercer os seus direitos de acesso, retificação ou eliminação dos seus dados, 
              contacte-nos através de tysoncofre@remax.pt.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
