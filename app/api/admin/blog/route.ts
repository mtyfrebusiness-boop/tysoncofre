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
    
    // Generate excerpt from content if not provided
    let excerpt = body.excerpt
    if (!excerpt && body.content) {
      excerpt = body.content.substring(0, 150) + '...'
    }
    if (!excerpt) {
      excerpt = ''
    }
    
    const post = await prisma.blogPost.create({
      data: {
        slug: body.slug,
        title: body.title,
        titleEn: body.titleEn || null,
        titleEs: body.titleEs || null,
        content: body.content,
        contentEn: body.contentEn || null,
        contentEs: body.contentEs || null,
        excerpt: excerpt,
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

// PUT update blog post
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const body = await req.json()
    
    // Generate excerpt from content if not provided
    let excerpt = body.excerpt
    if (!excerpt && body.content) {
      excerpt = body.content.substring(0, 150) + '...'
    }
    if (!excerpt) {
      excerpt = ''
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        titleEn: body.titleEn || null,
        titleEs: body.titleEs || null,
        content: body.content,
        contentEn: body.contentEn || null,
        contentEs: body.contentEs || null,
        excerpt: excerpt,
        coverImage: body.coverImage || null,
        published: body.published || false,
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 })
  }
}

// DELETE blog post
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await prisma.blogPost.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 })
  }
}
