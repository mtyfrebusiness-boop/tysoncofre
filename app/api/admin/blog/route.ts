import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET all blog posts (admin)
export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(posts)
}

// POST new blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const post = await prisma.blogPost.create({
      data: {
        slug: body.slug,
        title: body.title,
        titleEn: body.titleEn || null,
        titleEs: body.titleEs || null,
        content: body.content,
        contentEn: body.contentEn || null,
        contentEs: body.contentEs || null,
        excerpt: body.excerpt || body.content.substring(0, 150) + '...',
        coverImage: body.coverImage || null,
        published: body.published || false,
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 })
  }
}
