import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function generateUniqueFilename(originalName: string): string {
  const ext = path.extname(originalName)
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${random}${ext}`
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check if Cloudinary is configured
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET

    // If Cloudinary is configured, use it
    if (cloudName && uploadPreset) {
      // Convert file to base64
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

      const cloudinaryFormData = new FormData()
      cloudinaryFormData.append('file', base64)
      cloudinaryFormData.append('upload_preset', uploadPreset)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: cloudinaryFormData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        return NextResponse.json({ error: errorData.error?.message || 'Upload failed' }, { status: 500 })
      }

      const data = await response.json()
      return NextResponse.json({ url: data.secure_url })
    }

    // Fallback: Store file locally in public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const filename = generateUniqueFilename(file.name)
    const filepath = path.join(uploadsDir, filename)

    // Write file to disk
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    fs.writeFileSync(filepath, buffer)

    // Return the public URL
    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
