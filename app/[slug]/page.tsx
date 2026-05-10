import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function PublicBioPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch page data
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (pageError || !page) {
    notFound()
  }

  // Fetch links
  const { data: links } = await supabase
    .from('page_links')
    .select('*')
    .eq('page_id', page.id)
    .eq('is_active', true)
    .order('order_position', { ascending: true })

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: page.background_value || '#ffffff' }}
    >
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold" style={{ color: page.theme_color || '#3b82f6' }}>
              {page.title.charAt(0)}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-gray-600">{page.description}</p>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {!links || links.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
              <p className="text-gray-500">Belum ada link yang ditambahkan</p>
            </div>
          ) : (
            links.map((link: any) => {
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/90 backdrop-blur-sm hover:bg-white rounded-2xl p-4 transition shadow-md hover:shadow-xl transform hover:-translate-y-1"
                  style={{ borderLeft: `4px solid ${page.theme_color || '#3b82f6'}` }}
                >
                  <div className="flex items-center gap-4">
                    {link.thumbnail_url && (
                      <img
                        src={link.thumbnail_url}
                        alt={link.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{link.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{link.url}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </a>
              )
            })
          )}
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-sm text-gray-600 hover:text-gray-900 transition"
          >
            Dibuat dengan <span className="font-bold text-blue-600">BioLinky</span>
          </Link>
        </div>
      </div>
    </div>
  )
}