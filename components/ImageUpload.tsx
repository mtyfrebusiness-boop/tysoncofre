'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Parse current value to array
  const images = value ? value.split(',').filter(Boolean) : []

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (images.length + files.length > 10) {
      setError('Maximum 10 images allowed')
      return
    }

    setUploading(true)
    setError('')

    try {
      const newUrls: string[] = []

      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          setError('Only image files are allowed')
          continue
        }

        if (file.size > 5 * 1024 * 1024) {
          setError('Image must be less than 5MB')
          continue
        }

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Upload failed')
        }

        const data = await response.json()
        newUrls.push(data.url)
      }

      if (newUrls.length > 0) {
        const updatedValue = [...images, ...newUrls].join(',')
        onChange(updatedValue)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages.join(','))
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      
      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-2 mb-3">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img 
                src={url.trim()} 
                alt={`Uploaded ${index + 1}`} 
                className="w-full h-20 object-cover rounded-lg" 
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < 10 && (
        <label
          htmlFor="image-upload"
          className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#DC1010] transition-colors"
        >
          <div className="text-center">
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#DC1010] mx-auto"></div>
            ) : (
              <>
                <Upload className="mx-auto h-6 w-6 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">
                  {images.length > 0 ? 'Add more images' : 'Click to upload'}
                </p>
                <p className="text-xs text-gray-400">
                  {images.length}/10 images • Max 5MB each
                </p>
              </>
            )}
          </div>
        </label>
      )}
      
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      
      <p className="mt-2 text-xs text-gray-500">
        Or enter image URLs separated by commas:
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent mt-1"
        placeholder="https://exemplo.com/img1.jpg, https://exemplo.com/img2.jpg"
      />
    </div>
  )
}
