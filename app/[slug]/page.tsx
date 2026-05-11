'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getSocialIcon } from '@/lib/utils/getSocialIcon'
import { motion } from 'framer-motion'

type PageLink = {
  id: string
  title: string
  url: string
  thumbnail_url: string | null
  clicks: number
  is_active: boolean
  order_position: number
  start_date: string | null
  end_date: string | null
}

type PageData = {
  id: string
  slug: string
  title: string
  description: string | null
  theme_color: string
  background_value: string
  hide_branding: boolean
  avatar_url: string | null
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
    } catch (err) {
      console.error('Error:', err)
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
      await supabase.rpc('increment_link_clicks', { link_id: linkId })
    } catch (err) {
      console.error('Error tracking click:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060912]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 animate-pulse" />
          <div className="text-gray-500 text-sm">Memuat...</div>
        </div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#060912]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-gray-400 mb-5 font-medium">{error || 'Halaman tidak ditemukan'}</div>
          <Link href="/" className="text-sm text-violet-400 hover:text-violet-300 transition font-semibold">
            ← Kembali ke BioLinky
          </Link>
        </div>
      </div>
    )
  }

  const visibleLinks = links.filter((link) => {
    const now = new Date()
    if (link.start_date && new Date(link.start_date) > now) return false
    if (link.end_date && new Date(link.end_date) < now) return false
    return true
  })

  const themeColor = page.theme_color || '#7c3aed'

  return (
    <div
      className="min-h-screen flex items-start justify-center p-4 pt-12 pb-16"
      style={{ background: page.background_value || '#060912' }}
    >
      <div className="w-full max-w-lg">

        {/* Profile Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div
              className="w-24 h-24 rounded-full overflow-hidden mx-auto ring-4 ring-white/15 shadow-2xl"
              style={{ boxShadow: `0 0 50px ${themeColor}50` }}
            >
              {page.avatar_url ? (
                <img
                  src={page.avatar_url}
                  alt={page.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}bb)` }}
                >
                  <span className="text-4xl font-black text-white">
                    {page.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white/20 shadow-lg" />
          </div>

          <h1 className="text-2xl font-black text-white mb-1.5 tracking-tight">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
              {page.description}
            </p>
          )}
        </motion.div>

        {/* Links */}
        <div className="space-y-3 mb-8">
          {visibleLinks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center"
            >
              <p className="text-gray-500 text-sm">Belum ada link yang ditambahkan</p>
            </motion.div>
          ) : (
            visibleLinks.map((link, index) => {
              const { icon: Icon, color } = getSocialIcon(link.url)
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link.id)}
                  className="flex items-center gap-4 w-full bg-white/8 hover:bg-white/14 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 group cursor-pointer"
                  whileHover={{ scale: 1.02, y: -3, boxShadow: `0 16px 48px ${themeColor}25` }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.07 }}
                >
                  {/* Icon / Thumbnail */}
                  <div className="relative flex-shrink-0">
                    {link.thumbnail_url ? (
                      <>
                        <img
                          src={link.thumbnail_url}
                          alt={link.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white/20 shadow"
                          style={{ backgroundColor: color }}
                        >
                          <Icon size={10} color="white" />
                        </div>
                      </>
                    ) : (
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}35` }}
                      >
                        <Icon size={22} style={{ color }} />
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-bold text-white text-sm">{link.title}</h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{link.url}</p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              )
            })
          )}
        </div>

        {/* Branding Footer */}
        {!page.hide_branding && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-gray-400 transition-colors group"
            >
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center group-hover:shadow-md group-hover:shadow-violet-500/30 transition-all">
                <span className="text-white font-black text-[9px]">B</span>
              </div>
              <span>
                Dibuat dengan{' '}
                <span className="font-bold text-violet-400 group-hover:text-violet-300 transition-colors">
                  BioLinky
                </span>
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
