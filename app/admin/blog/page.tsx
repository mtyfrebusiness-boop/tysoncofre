'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, FileText, Trash2 } from 'lucide-react'
import DeleteButton from '@/components/DeleteButton'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="p-8 text-center">A carregar...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#0A2240]">Gerir Blog</h1>
        <Link
          href="/admin/blog/novo"
          className="bg-[#DC1010] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#b00d0d] transition"
        >
          <Plus size={20} />
          Novo Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Ainda não há posts no blog.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publicado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-PT') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-[#0A2240] hover:text-[#DC1010] mr-4 inline-block"
                      >
                        <Edit size={18} />
                      </Link>
                      <DeleteButton id={post.id} type="post" />
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
