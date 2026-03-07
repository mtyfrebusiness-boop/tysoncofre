'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/components/ImageUpload'

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  useEffect(() => {
    if (!id) return
    
    fetch(`/api/admin/blog`)
      .then(res => res.json())
      .then(data => {
        const post = data.find((p: any) => p.id === id)
        if (post) {
          setFormData({
            title: post.title || '',
            titleEn: post.titleEn || '',
            titleEs: post.titleEs || '',
            content: post.content || '',
            contentEn: post.contentEn || '',
            contentEs: post.contentEs || '',
            excerpt: post.excerpt || '',
            coverImage: post.coverImage || '',
            published: post.published || false,
          })
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching post:', err)
        setLoading(false)
      })
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/blog?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/blog')
      } else {
        setError('Erro ao atualizar post')
      }
    } catch (err) {
      setError('Erro ao atualizar post')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">A carregar...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#0A2240]">Editar Post</h1>
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

        {/* Cover Image with Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagem de Capa
          </label>
          <ImageUpload
            value={formData.coverImage}
            onChange={(url) => setFormData({ ...formData, coverImage: url })}
          />
          <p className="mt-1 text-xs text-gray-500">Ou use uma URL direta:</p>
          <input
            type="url"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent mt-1"
            placeholder="https://exemplo.com/imagem.jpg"
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
            disabled={saving}
            className="bg-[#DC1010] text-white px-6 py-2 rounded-lg hover:bg-[#b00d0d] transition-colors disabled:opacity-50"
          >
            {saving ? 'A guardar...' : 'Guardar Alterações'}
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
