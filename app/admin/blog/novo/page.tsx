'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/ImageUpload'

export default function NovoBlogPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    titleEs: '',
    content: '',
    contentEn: '',
    contentEs: '',
    excerpt: '',
    coverImage: '',
    published: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug,
        }),
      })

      if (response.ok) {
        router.push('/admin/blog')
      } else {
        setError('Erro ao criar post')
      }
    } catch (err) {
      setError('Erro ao criar post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#0A2240]">Novo Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Title */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título (PT) *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título (EN)
            </label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título (ES)
            </label>
            <input
              type="text"
              value={formData.titleEs}
              onChange={(e) => setFormData({ ...formData, titleEs: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Excerpt (resumo breve)
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
            placeholder="Breve resumo do artigo..."
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagem de Capa
          </label>
          <ImageUpload
            value={formData.coverImage ? [formData.coverImage] : []}
            onChange={(urls) => setFormData({ ...formData, coverImage: urls[0] || '' })}
            maxImages={1}
          />
        </div>

        {/* Content PT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Conteúdo (PT) *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={12}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent font-mono text-sm"
            placeholder="Escreva o conteúdo em Markdown..."
            required
          />
        </div>

        {/* Content EN/ES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conteúdo (EN)
            </label>
            <textarea
              value={formData.contentEn}
              onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent font-mono text-sm"
              placeholder="Content in English..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conteúdo (ES)
            </label>
            <textarea
              value={formData.contentEs}
              onChange={(e) => setFormData({ ...formData, contentEs: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent font-mono text-sm"
              placeholder="Contenido en Español..."
            />
          </div>
        </div>

        {/* Published */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="rounded text-[#DC1010] focus:ring-[#DC1010]"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700">
            Publicar imediatamente
          </label>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#DC1010] text-white px-6 py-2 rounded-lg hover:bg-[#b00d0d] transition-colors disabled:opacity-50"
          >
            {loading ? 'A guardar...' : 'Guardar Post'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
