import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Blog Imobiliário | Tyson Cofre RE/MAX',
  description: 'Artigos e notícias sobre o mercado imobiliário em Portugal. Dicas para compradores, vendedores e investidores.',
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#0A2240]">
          Blog Imobiliário
        </h1>
        
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="h-48 bg-gray-200">
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#0A2240] mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="text-[#DC1010] font-medium text-sm">
                    Ler Mais →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Em breve artigos e notícias sobre o mercado imobiliário.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
