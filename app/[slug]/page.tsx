'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getSocialIcon } from '@/lib/utils/getSocialIcon'

type PageLink = {
  id: string
  title: string
  url: string
  thumbnail_url: string | null
  clicks: number
  is_active: boolean
  order_position: number
}

type PageData = {
  id: string
  slug: string
  title: string
  description: string | null
  theme_color: string
  background_value: string
  hide_branding: boolean
}

export default function PublicBioPage() {
  const params = useParams()
  const slug = params.slug as string
  const supabase = createClient()

  const [page, setPage] = useState<PageData | null>(null)
  const [links, setLinks] = useState<PageLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPageData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single()

      if (pageError || !pageData) {
        setError('Halaman tidak ditemukan')
        setPage(null)
        setLinks([])
        return
      }

      setPage(pageData)

      const { data: linksData } = await supabase
        .from('page_links')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('is_active', true)
        .order('order_position', { ascending: true })

      setLinks(linksData || [])
    } catch (error) {
      console.error('Error:', error)
      setError('Terjadi kesalahan saat memuat halaman')
    } finally {
      setLoading(false)
    }
  }, [slug, supabase])

  useEffect(() => {
    fetchPageData()
  }, [fetchPageData])

  const handleLinkClick = async (linkId: string) => {
    try {
      const { error } = await supabase.rpc('increment_link_clicks', {
        link_id: linkId
      })

      if (error) {
        console.error('Error tracking click:', error)
      }
    } catch (error) {
      console.error('Error tracking click:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-gray-500 mb-4">{error || 'Halaman tidak ditemukan'}</div>
          <Link
            href="/"
            className="inline-block text-sm text-blue-600 hover:text-blue-800 transition"
          >
            Kembali ke halaman utama
          </Link>
        </div>
      </div>
    )
  }

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
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link.id)}
                className="block bg-white/90 backdrop-blur-sm hover:bg-white rounded-2xl p-4 transition shadow-md hover:shadow-xl transform hover:-translate-y-1"
                style={{ borderLeft: `4px solid ${page.theme_color || '#3b82f6'}` }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    {link.thumbnail_url ? (
                      <>
                        <img
                          src={link.thumbnail_url}
                          alt={link.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        {(() => {
                          const { icon: Icon, color } = getSocialIcon(link.url)
                          return (
                            <div
                              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md"
                              style={{ backgroundColor: color }}
                            >
                              <Icon size={12} color="white" />
                            </div>
                          )
                        })()}
                      </>
                    ) : (
                      (() => {
                        const { icon: Icon, color } = getSocialIcon(link.url)
                        return (
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${color}20` }}
                          >
                            <Icon size={24} style={{ color }} />
                          </div>
                        )
                      })()
                    )}
                  </div>
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
            ))
          )}
        </div>

        {!page.hide_branding && (
          <div className="text-center">
            <Link
              href="/"
              className="inline-block text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Dibuat dengan <span className="font-bold text-blue-600">BioLinky</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}