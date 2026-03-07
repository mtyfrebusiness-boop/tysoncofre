'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  id: string
  type: 'listing' | 'post'
}

export default function DeleteButton({ id, type }: DeleteButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir este ${type === 'listing' ? 'imóvel' : 'post'}?`)) {
      return
    }

    try {
      const endpoint = type === 'listing' ? '/api/admin/imoveis' : '/api/admin/blog'
      const res = await fetch(`${endpoint}?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert('Erro ao excluir')
      }
    } catch (err) {
      alert('Erro ao excluir')
    }
  }

  return (
    <button 
      onClick={handleDelete}
      className="p-2 text-red-600 hover:bg-red-50 rounded"
      title="Excluir"
    >
      <Trash2 size={18} />
    </button>
  )
}
