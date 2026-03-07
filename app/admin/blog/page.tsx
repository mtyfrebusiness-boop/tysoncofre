import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, Edit, FileText } from 'lucide-react'
import DeleteButton from '@/components/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminBlogPage() {
  let posts: any[] = []
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#0A2240]">Gerir Blog</h1>
        <Link 
          href="/admin/blog/novo"
          className="flex items-center gap-2 bg-[#DC1010] text-white px-4 py-2 rounded-lg hover:bg-[#b00d0d] transition-colors"
        >
          <Plus size={20} />
          Novo Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-4">Ainda não há artigos publicados.</p>
            <Link 
              href="/admin/blog/novo"
              className="text-[#DC1010] hover:underline"
            >
              Criar o primeiro post →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publicado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.slug}
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Publicado</span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">Rascunho</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('pt-PT')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/admin/blog/${post.id}`}
                          className="p-2 text-[#0A2240] hover:bg-gray-100 rounded"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteButton id={post.id} type="post" />
                        <Link 
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded"
                        >
                          <FileText size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
