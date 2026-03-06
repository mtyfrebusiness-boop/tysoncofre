import Link from 'next/link'
import { Home, Building, FileText, Users, LogOut } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0A2240] text-white">
        <div className="p-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-300">Tyson Cofre RE/MAX</p>
        </div>
        
        <nav className="mt-6">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-6 py-3 hover:bg-[#1a3a5c] transition-colors"
          >
            <Home size={20} />
            Dashboard
          </Link>
          <Link 
            href="/admin/imoveis" 
            className="flex items-center gap-3 px-6 py-3 hover:bg-[#1a3a5c] transition-colors"
          >
            <Building size={20} />
            Imóveis
          </Link>
          <Link 
            href="/admin/blog" 
            className="flex items-center gap-3 px-6 py-3 hover:bg-[#1a3a5c] transition-colors"
          >
            <FileText size={20} />
            Blog
          </Link>
          <Link 
            href="/admin/leads" 
            className="flex items-center gap-3 px-6 py-3 hover:bg-[#1a3a5c] transition-colors"
          >
            <Users size={20} />
            Leads
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">{session.user?.email}</span>
            <Link 
              href="/api/auth/signout" 
              className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
            >
              <LogOut size={16} />
              Sair
            </Link>
          </div>
          <Link 
            href="/" 
            className="mt-4 block text-center py-2 bg-[#DC1010] hover:bg-[#b00d0d] rounded transition-colors"
          >
            Ver Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
