import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  let post = null
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug },
    })
  } catch (error) {
    // Database not set up yet
  }

  if (!post) {
    return { title: 'Artigo Não Encontrado' }
  }

  return {
    title: `${post.title} | Tyson Cofre RE/MAX`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let post = null
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug },
    })
  } catch (error) {
    // Database not set up yet
  }

  if (!post || !post.published) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}
          
          <h1 className="text-4xl font-bold text-[#0A2240] mb-4">
            {post.title}
          </h1>
          
          <div className="text-gray-500 mb-8">
            Por Tyson Cofre • {new Date(post.createdAt).toLocaleDateString('pt-PT')}
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 whitespace-pre-line">
              {post.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
