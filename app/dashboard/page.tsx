'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

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

      const { data, error } = await supabase
        .from('pages')
        .insert({
          user_id: user.id,
          slug: slug,
          title: 'My Links',
        })
        .select()
        .single()

      if (error) throw error

      alert('Page berhasil dibuat!')
      fetchPages()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Kelola semua link-in-bio kamu</p>
        </div>
        <button
          onClick={createNewPage}
          disabled={creating}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {creating ? 'Creating...' : '+ Buat Page Baru'}
        </button>
      </div>

      {pages.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada page</h3>
          <p className="text-gray-500 mb-6">Mulai dengan membuat Link-in-Bio pertama kamu</p>
          <button
            onClick={createNewPage}
            disabled={creating}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {creating ? 'Creating...' : '+ Buat Page Pertama'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <div key={page.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{page.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${page.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {page.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                biolinky.com/<span className="font-mono">{page.slug}</span>
              </p>
              <div className="flex gap-2">
                <Link 
                  href={`/dashboard/pages/${page.id}`} 
                  className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </Link>
                <Link 
                  href={`/${page.slug}`} 
                  target="_blank" 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}