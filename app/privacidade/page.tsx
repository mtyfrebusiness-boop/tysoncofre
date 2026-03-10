'use client'

import Link from 'next/link'

export default function PrivacidadePage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-[#0A2240]">Política de Privacidade</h1>
        <p className="text-gray-500 mb-8">Última atualização: 9 de março de 2026</p>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2240]">1. Responsável pelo Tratamento de Dados</h2>
            <div className="text-gray-600 space-y-2">
              <p><strong>Tyson Cofre</strong></p>
              <p>Consultor Imobiliário — RE/MAX Bay II</p>
              <p>Av. 23 de Julho, Vitória Liberal, 20B, 2805-255 Almada, Portugal</p>
              <p>AMI Licença Nº 14507</p>
              <p>Email: tysoncofre@remax.pt</p>
              <p>Telemóvel: +351 930 567 663</p>
              <p>Website: www.tysoncofre.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2240]">2. Dados Recolhidos</h2>
            <p className="text-gray-600 mb-2">Recolhemos os seguintes dados pessoais quando interage com o nosso website:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Número de telemóvel/telefone</li>
              <li>Mensagens e pedidos submetidos através de formulários de contacto</li>
              <li>Dados de navegação (cookies, endereço IP, tipo de browser, páginas visitadas)</li>
              <li>Informação sobre o imóvel de interesse (quando aplicável)</li>
            </ul>
            <p className="text-gray-600 mt-2">Não recolhemos dados de categorias especiais (dados de saúde, origem racial, opiniões políticas, etc.).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2240]">3. Finalidade e Base Jurídica do Tratamento</h2>
            
            <h3 className="text-xl font-semibold mb-2 text-[#0A2240]">3.1 Resposta a Pedidos de Contacto</h3>
            <p className="text-gray-600 mb-4">Base jurídica: Execução de pré-contrato (Artigo 6.º, n.º 1, alínea b) do RGPD). Utilizamos o seu nome, email e mensagem para responder ao seu pedido de informação ou contacto.</p>
            
            <h3 className="text-xl font-semibold mb-2 text-[#0A2240]">3.2 Estudo de Mercado e Avaliação Imobiliária</h3>
            <p className="text-gray-600 mb-4">Base jurídica: Consentimento (Artigo 6.º, n.º 1, alínea a) do RGPD). Quando solicita um estudo de mercado gratuito, os seus dados são utilizados exclusivamente para elaborar e enviar essa análise.</p>
            
            <h3 className="text-xl font-semibold mb-2 text-[#0A2240]">3.3 Marketing e Comunicações Comerciais</h3>
            <p className="text-gray-600 mb-4">Base jurídica: Consentimento explícito (Artigo 6.º, n.º 1, alínea a) do RGPD). Só enviaremos comunicações de marketing se tiver dado consentimento explícito para tal. Pode retirar esse consentimento a qualquer momento.</p>
            
            <h3 className="text-xl font-semibold mb-2 text-[#0A2240]">3.4 Cumprimento de Obrigações Legais</h3>
            <p className="text-gray-600">Base jurídica: Obrigação legal (Artigo 6.º, n.º 1, alínea c) do RGPD). Podemos conservar determinados dados para cumprir obrigações fiscais, contabilísticas ou regulatórias impostas por lei portuguesa e europeia.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2240]">4. Período de Conservação</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Pedidos de contacto e leads: 2 anos após o último contacto</li>
              <li>Dados de transações imobiliárias concluídas: 10 anos (obrigação fiscal/legal)</li>
              <li>Dados de cookies de análise: conforme definido na Política de Cookies</li>
              <li>Dados de marketing: até retirada do consentimento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2240]">5. Partilha de Dados com Terceiros</h2>
            <p className="text-gray-600 mb-2">Os seus dados pessoais não são vendidos nem partilhados para fins comerciais com terceiros. Podem ser partilhados nas seguintes circunstâncias:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li><strong>RE/MAX Portugal:</strong> enquanto consultor RE/MAX, determinados dados de transações podem ser processados no âmbito do sistema da rede RE/MAX.</li>
              <li><strong>Prestadores de serviços técnicos:</strong> serviços de alojamento web e email, exclusivamente para fins operacionais.</li>
              <li><strong>Autoridades públicas:</strong> apenas quando legalmente obrigado, como a Autoridade Tributária e Aduaneira.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2240]">6. Os Seus Direitos (RGPD)</h2>
            <p className="text-gray-600 mb-2">Ao abrigo do RGPD, tem os seguintes direitos:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Direito de acesso</li>
              <li>Direito de retificação</li>
              <li>Direito ao apagamento ("direito a ser esquecido")</li>
              <li>Direito à limitação do tratamento</li>
              <li>Direito à portabilidade</li>
              <li>Direito de oposição</li>
              <li>Direito de retirar o consentimento</li>
            </ul>
            <p className="text-gray-600 mt-2">Para exercer qualquer destes direitos, contacte-nos em: <strong>tysoncofre@remax.pt</strong></p>
            <p className="text-gray-600 mt-2">Tem também o direito de apresentar reclamação junto da CNPD: <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-[#DC1010] hover:underline">www.cnpd.pt</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2240]">7. Cookies</h2>
            <p className="text-gray-600">O nosso website utiliza cookies. Utilizamos cookies essenciais, cookies analíticos e cookies de marketing (apenas com o seu consentimento). Para mais informações, consulte a nossa Política de Cookies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2240]">8. Segurança dos Dados</h2>
            <p className="text-gray-600 mb-2">Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Comunicações encriptadas (HTTPS/TLS)</li>
              <li>Acesso restrito aos dados de leads</li>
              <li>Passwords protegidas com hash criptográfico</li>
              <li>Backups regulares com acesso controlado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2240]">9. Contacto</h2>
            <p className="text-gray-600">Para qualquer questão relacionada com esta política ou com o tratamento dos seus dados pessoais:</p>
            <div className="text-gray-600 mt-2 space-y-1">
              <p><strong>Tyson Cofre</strong></p>
              <p>Email: tysoncofre@remax.pt</p>
              <p>Telemóvel: +351 930 567 663</p>
              <p>Endereço: RE/MAX Bay II, Av. 23 de Julho, Vitória Liberal, 20B, 2805-255 Almada, Portugal</p>
            </div>
          </section>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2240]">Privacy Policy (English)</h2>
            <p className="text-gray-500 mb-4">Last updated: March 9, 2026</p>

            <h3 className="text-xl font-semibold mb-2 text-[#0A2240]">1. Data Controller</h3>
            <div className="text-gray-600 space-y-2 mb-4">
              <p><strong>Tyson Cofre</strong></p>
              <p>Real Estate Consultant — RE/MAX Bay II</p>
              <p>Av. 23 de Julho, Vitória Liberal, 20B, 2805-255 Almada, Portugal</p>
              <p>AMI Licence No. 14507</p>
              <p>Email: tysoncofre@remax.pt</p>
              <p>Phone: +351 930 567 663</p>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-[#0A2240]">2. Data We Collect</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Messages and requests submitted through contact forms</li>
              <li>Browsing data (cookies, IP address, browser type, pages visited)</li>
              <li>Information about the property of interest</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 text-[#0A2240]">3. Your Rights Under GDPR</h3>
            <p className="text-gray-600 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Request erasure ("right to be forgotten")</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Object to processing</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="text-gray-600">To exercise your rights, contact us at: <strong>tysoncofre@remax.pt</strong></p>
            <p className="text-gray-600 mt-2">You also have the right to lodge a complaint with CNPD: <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-[#DC1010] hover:underline">www.cnpd.pt</a></p>

            <h3 className="text-xl font-semibold mb-2 text-[#0A2240] mt-4">US Visitors — Additional Rights</h3>
            <p className="text-gray-600 mb-2">If you are accessing this website from the United States:</p>
            <p className="text-gray-600 mb-2"><strong>California Residents (CCPA/CPRA):</strong> You have the right to know what personal information we collect, request deletion, and opt-out of sale. We do not sell personal information.</p>
            <p className="text-gray-600">For privacy requests, contact us at: <strong>tysoncofre@remax.pt</strong></p>
          </section>

          <div className="mt-8 pt-6 border-t">
            <Link href="/" className="text-[#DC1010] hover:underline">← Voltar ao Início</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
