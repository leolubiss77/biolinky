'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

type Page = {
  id: string
  slug: string
  title: string
  is_active: boolean
  created_at: string
}

export default function DashboardPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [userEmail, setUserEmail] = useState<string>('')
  const supabase = createClient()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserEmail(user.email || '')

      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPages(data || [])
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const createNewPage = async () => {
    setCreating(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

      const slug = profile?.username || `user-${user.id.slice(0, 8)}`

      const { error } = await supabase
        .from('pages')
        .insert({ user_id: user.id, slug, title: 'My Links' })

      if (error) throw error

      toast.success('Page berhasil dibuat!')
      fetchPages()
    } catch (error: any) {
      toast.error(error.message || 'Gagal membuat page')
    } finally {
      setCreating(false)
    }
  }

  const firstName = userEmail.split('@')[0] || 'Creator'

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Memuat dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1e1b2e', color: '#fff', border: '1px solid rgba(139,92,246,0.3)' },
        }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Halo, <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">{firstName}</span> 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Kelola semua link-in-bio kamu di sini</p>
        </div>
        <button
          onClick={createNewPage}
          disabled={creating}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 hover:-translate-y-px text-sm"
        >
          {creating ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Membuat...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Buat Page Baru
            </>
          )}
        </button>
      </div>

      {/* Stats Row */}
      {pages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: 'Total Pages',
              value: pages.length,
              icon: '📄',
              gradient: 'from-violet-500/15 to-violet-500/5',
              border: 'border-violet-500/20',
            },
            {
              label: 'Pages Aktif',
              value: pages.filter(p => p.is_active).length,
              icon: '✅',
              gradient: 'from-emerald-500/15 to-emerald-500/5',
              border: 'border-emerald-500/20',
            },
            {
              label: 'Pages Nonaktif',
              value: pages.filter(p => !p.is_active).length,
              icon: '⏸️',
              gradient: 'from-gray-500/15 to-gray-500/5',
              border: 'border-gray-500/20',
            },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.gradient} border ${stat.border} rounded-2xl p-5`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-gray-500 text-sm font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {pages.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/8 to-blue-500/5 p-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600/30 to-blue-600/30 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Belum ada page</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Buat Link-in-Bio pertama kamu dan bagikan ke semua platform sosial media dalam hitungan menit.
            </p>
            <button
              onClick={createNewPage}
              disabled={creating}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 hover:-translate-y-px"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              {creating ? 'Membuat...' : 'Buat Page Pertama'}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pages.map((page) => (
            <div
              key={page.id}
              className="group relative bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Status badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  page.is_active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                    : 'bg-gray-500/15 text-gray-400 border border-gray-500/25'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${page.is_active ? 'bg-emerald-400' : 'bg-gray-500'}`} />
                  {page.is_active ? 'Aktif' : 'Nonaktif'}
                </div>
                <Link
                  href={`/${page.slug}`}
                  target="_blank"
                  className="text-gray-500 hover:text-violet-400 transition p-1 rounded-lg hover:bg-white/5"
                  title="Buka halaman"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-violet-300 transition-colors">
                {page.title}
              </h3>

              {/* URL */}
              <div className="flex items-center gap-1.5 mb-5">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex-shrink-0" />
                <p className="text-xs text-gray-500 truncate font-mono">
                  biolinky.com/<span className="text-gray-400">{page.slug}</span>
                </p>
              </div>

              {/* Actions */}
              <Link
                href={`/dashboard/pages/${page.id}`}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-violet-600/20 to-blue-600/20 hover:from-violet-600/40 hover:to-blue-600/40 border border-violet-500/25 hover:border-violet-500/50 text-violet-300 hover:text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Page
              </Link>
            </div>
          ))}

          {/* Create new card */}
          <button
            onClick={createNewPage}
            disabled={creating}
            className="group border-2 border-dashed border-white/10 hover:border-violet-500/40 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-gray-600 hover:text-violet-400 transition-all duration-300 min-h-[180px] hover:bg-violet-500/5"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-violet-500/15 border border-white/10 group-hover:border-violet-500/30 flex items-center justify-center transition-all">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-semibold text-sm">Buat Page Baru</span>
          </button>
        </div>
      )}
    </div>
  )
}
