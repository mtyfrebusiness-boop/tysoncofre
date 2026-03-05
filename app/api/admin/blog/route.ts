import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET all blog posts (admin)
export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(posts)
}

// POST new blog post
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
