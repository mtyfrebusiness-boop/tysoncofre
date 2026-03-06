'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  multiple?: boolean
  maxImages?: number
}

export default function ImageUpload({ 
  value, 
  onChange, 
  multiple = false, 
  maxImages = 10 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const images = value ? value.split(',').map(img => img.trim()).filter(Boolean) : []

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setError('')
    setIsUploading(true)

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setError('Only image files are allowed')
          continue
        }

        // Validate file size (max 5MB per image)
        if (file.size > 5 * 1024 * 1024) {
          setError('Each image must be less than 5MB')
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
        
        if (multiple) {
          const newImages = [...images, data.url].slice(0, maxImages)
          onChange(newImages.join(', '))
        } else {
          onChange(data.url)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages.join(', '))
  }

  if (multiple) {
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
        
        <label
          htmlFor="image-upload"
          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#DC1010] transition-colors"
        >
          <div className="text-center">
            {isUploading ? (
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-[#DC1010]" />
            ) : (
              <Upload className="w-8 h-8 mx-auto text-gray-400" />
            )}
            <p className="mt-2 text-sm text-gray-500">
              {isUploading ? 'A uploading...' : `Click to upload (max ${maxImages})`}
            </p>
          </div>
        </label>

        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-5 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="mt-2 text-xs text-gray-500">
          Recommended: WebP format for faster loading
        </p>
      </div>
    )
  }

  // Single image mode
  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="single-image-upload"
      />
      
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          htmlFor="single-image-upload"
          className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#DC1010] transition-colors"
        >
          <div className="text-center">
            {isUploading ? (
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-[#DC1010]" />
            ) : (
              <ImageIcon className="w-8 h-8 mx-auto text-gray-400" />
            )}
            <p className="mt-2 text-sm text-gray-500">
              {isUploading ? 'A carregar...' : 'Click to upload image'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              WebP, PNG, or JPEG
            </p>
          </div>
        </label>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
