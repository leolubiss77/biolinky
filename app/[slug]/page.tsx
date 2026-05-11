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
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 animate-pulse" />
          <p className="text-gray-600 text-xs tracking-widest uppercase">Loading</p>
        </motion.div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#060912]">
        <div className="text-center">
          <p className="text-gray-400 mb-5">{error || 'Halaman tidak ditemukan'}</p>
          <Link href="/" className="text-sm text-violet-400 hover:text-violet-300 transition">
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
      className="min-h-screen relative flex items-start justify-center p-4 pt-14 pb-20 overflow-hidden"
      style={{ background: page.background_value || '#060912' }}
    >
      {/* Atmospheric background orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${themeColor}, transparent)` }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />

      <div className="relative w-full max-w-md">

        {/* Profile Section */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Avatar */}
          <div className="relative inline-block mb-5">
            {/* Outer glow ring */}
            <div
              className="absolute -inset-1.5 rounded-full opacity-40 blur-sm"
              style={{ background: `radial-gradient(circle, ${themeColor}, transparent)` }}
            />
            <div
              className="relative w-28 h-28 rounded-full overflow-hidden ring-[2.5px] ring-white/20 shadow-2xl"
              style={{ boxShadow: `0 0 40px ${themeColor}50` }}
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
                  style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}99)` }}
                >
                  <span
                    className="text-4xl font-black text-white"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {page.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            {/* Online dot */}
            <div
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white/30 shadow-lg"
              style={{ backgroundColor: themeColor }}
            />
          </div>

          {/* Name — Playfair Display */}
          <h1
            className="text-3xl font-bold text-white mb-2 tracking-wide leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {page.title}
          </h1>

          {/* Accent line */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-white/15" />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
            <div className="h-px w-12 bg-white/15" />
          </div>

          {page.description && (
            <p className="text-sm text-white/50 leading-relaxed max-w-[260px] mx-auto">
              {page.description}
            </p>
          )}
        </motion.div>

        {/* Links */}
        <div className="space-y-3 mb-10">
          {visibleLinks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl p-10 text-center border border-white/8"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <p className="text-white/30 text-sm">Belum ada link</p>
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
                  className="flex items-center gap-4 w-full rounded-2xl p-4 cursor-pointer group"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.10)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  whileHover={{
                    scale: 1.025,
                    y: -4,
                    boxShadow: `0 20px 60px ${themeColor}25`,
                  }}
                  whileTap={{ scale: 0.97 }}
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
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border border-white/20 shadow"
                          style={{ backgroundColor: color }}
                        >
                          <Icon size={10} color="white" />
                        </div>
                      </>
                    ) : (
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${color}18`,
                          border: `1px solid ${color}35`,
                        }}
                      >
                        <Icon size={22} style={{ color }} />
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 text-left">
                    <h3
                      className="font-semibold text-white/90 text-sm leading-tight tracking-wide"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {link.title}
                    </h3>
                    <p className="text-xs text-white/35 truncate mt-0.5 font-mono">
                      {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-80 transition-all group-hover:translate-x-0.5"
                    style={{ backgroundColor: `${themeColor}25` }}
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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
            transition={{ delay: 0.7 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-white/20 hover:text-white/40 transition-colors group"
            >
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-black text-[9px]">B</span>
              </div>
              <span>
                Made with{' '}
                <span className="font-semibold text-white/30 group-hover:text-violet-400 transition-colors">
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
