'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import QRCode from 'qrcode'

type PageLink = {
  id: string
  title: string
  url: string
  thumbnail_url: string | null
  is_active: boolean
  order_position: number
}

type PageData = {
  id: string
  slug: string
  title: string
  description: string | null
  theme_color: string
  is_active: boolean
}

export default function EditPagePage() {
  const params = useParams()
  const pageId = params.id as string
  const router = useRouter()
  const supabase = createClient()

  const [page, setPage] = useState<PageData | null>(null)
  const [links, setLinks] = useState<PageLink[]>([])
  const [loading, setLoading] = useState(true)

  // Form state for adding new link
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    thumbnail_url: '',
  })
  const [saving, setSaving] = useState(false)

  // Edit link state
  const [editingLink, setEditingLink] = useState<PageLink | null>(null)

  // Page settings state
  const [pageTitle, setPageTitle] = useState('')
  const [pageDescription, setPageDescription] = useState('')
  const [pageThemeColor, setPageThemeColor] = useState('#3b82f6')
  const [pageBackgroundType, setPageBackgroundType] = useState('solid')
  const [pageBackgroundValue, setPageBackgroundValue] = useState('#ffffff')

  // QR Code state
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [qrForeground, setQrForeground] = useState('#000000')
  const [qrBackground, setQrBackground] = useState('#ffffff')
  const [showQrSection, setShowQrSection] = useState(false)

  useEffect(() => {
    fetchPageData()
  }, [pageId])

  const fetchPageData = async () => {
    try {
      // Fetch page
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single()

      if (pageError) throw pageError
      setPage(pageData)

      // Load page data to form state
      setPageTitle(pageData.title || '')
      setPageDescription(pageData.description || '')
      setPageThemeColor(pageData.theme_color || '#3b82f6')
      setPageBackgroundType(pageData.background_type || 'solid')
      setPageBackgroundValue(pageData.background_value || '#ffffff')

      // Fetch links
      const { data: linksData, error: linksError } = await supabase
        .from('page_links')
        .select('*')
        .eq('page_id', pageId)
        .order('order_position', { ascending: true })

      if (linksError) throw linksError
      setLinks(linksData || [])
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to load page data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase.from('page_links').insert({
        page_id: pageId,
        title: newLink.title,
        url: newLink.url,
        thumbnail_url: newLink.thumbnail_url || null,
        order_position: links.length,
      })

      if (error) throw error

      alert('Link berhasil ditambahkan!')
      setNewLink({ title: '', url: '', thumbnail_url: '' })
      setShowAddForm(false)
      fetchPageData()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteLink = async (linkId: string) => {
    if (!confirm('Yakin mau hapus link ini?')) return

    try {
      const { error } = await supabase
        .from('page_links')
        .delete()
        .eq('id', linkId)

      if (error) throw error

      alert('Link berhasil dihapus!')
      fetchPageData()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleUpdateLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLink) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('page_links')
        .update({
          title: editingLink.title,
          url: editingLink.url,
          thumbnail_url: editingLink.thumbnail_url,
        })
        .eq('id', editingLink.id)

      if (error) throw error

      alert('Link berhasil diupdate!')
      setEditingLink(null)
      fetchPageData()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdatePage = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('pages')
        .update({
          title: pageTitle,
          description: pageDescription,
          theme_color: pageThemeColor,
          background_type: pageBackgroundType,
          background_value: pageBackgroundValue,
        })
        .eq('id', pageId)

      if (error) throw error

      alert('Pengaturan page berhasil diupdate!')
      fetchPageData()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  const generateQRCode = async () => {
    if (!page) return

    const pageUrl = `${window.location.origin}/${page.slug}`

    try {
      const qrDataUrl = await QRCode.toDataURL(pageUrl, {
        width: 512,
        margin: 2,
        color: {
          dark: qrForeground,
          light: qrBackground,
        },
      })

      setQrCodeUrl(qrDataUrl)
    } catch (error) {
      console.error('Error generating QR code:', error)
      alert('Failed to generate QR code')
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = `qr-code-${page?.slug || 'biolinky'}.png`
    link.click()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Kembali ke Dashboard
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
            <p className="text-gray-600 mt-1">
              biolinky.com/<span className="font-mono">{page.slug}</span>
            </p>
          </div>
          <Link
            href={`/${page.slug}`}
            target="_blank"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Preview →
          </Link>
        </div>
      </div>

      {/* Page Settings Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">⚙️ Pengaturan Page</h3>
        
        <form onSubmit={handleUpdatePage} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Page
              </label>
              <input
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <input
                type="text"
                value={pageDescription}
                onChange={(e) => setPageDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warna Tema
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={pageThemeColor}
                  onChange={(e) => setPageThemeColor(e.target.value)}
                  className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={pageThemeColor}
                  onChange={(e) => setPageThemeColor(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background
              </label>
              <input
                type="text"
                value={pageBackgroundValue}
                onChange={(e) => setPageBackgroundValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                placeholder="#ffffff atau linear-gradient(...)"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition"
          >
            {saving ? 'Menyimpan...' : '💾 Simpan Pengaturan'}
          </button>
        </form>
      </div>

      {/* QR Code Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">📱 QR Code Generator</h3>
          <button
            onClick={() => {
              const newState = !showQrSection
              setShowQrSection(newState)
              if (newState && !qrCodeUrl) {
                generateQRCode()
              }
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {showQrSection ? 'Sembunyikan' : 'Tampilkan'}
          </button>
        </div>

        {showQrSection && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* QR Code Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview QR Code
                </label>
                {qrCodeUrl ? (
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code"
                      className="w-64 h-64 rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center h-64">
                    <p className="text-gray-500">Generating QR code...</p>
                  </div>
                )}
              </div>

              {/* QR Code Settings */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warna QR Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={qrForeground}
                      onChange={(e) => setQrForeground(e.target.value)}
                      className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={qrForeground}
                      onChange={(e) => setQrForeground(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warna Background QR
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={qrBackground}
                      onChange={(e) => setQrBackground(e.target.value)}
                      className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={qrBackground}
                      onChange={(e) => setQrBackground(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <button
                  onClick={generateQRCode}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  🔄 Regenerate QR Code
                </button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>URL Page Kamu:</strong>
                  </p>
                  <code className="text-xs text-blue-900 break-all">
                    {typeof window !== 'undefined' && page
                      ? `${window.location.origin}/${page.slug}`
                      : 'Loading...'}
                  </code>
                </div>

                <button
                  onClick={downloadQRCode}
                  disabled={!qrCodeUrl}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  💾 Download QR Code PNG
                </button>

                <p className="text-xs text-gray-500 text-center">
                  QR Code ini bisa dicetak untuk kartu nama, poster, atau stiker!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Link Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {showAddForm ? 'Batal' : '+ Tambah Link Baru'}
        </button>
      </div>

      {/* Add Link Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Tambah Link Baru</h3>
          <form onSubmit={handleAddLink} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Link *
              </label>
              <input
                type="text"
                value={newLink.title}
                onChange={(e) =>
                  setNewLink({ ...newLink, title: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Instagram Saya"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL *
              </label>
              <input
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://instagram.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail URL (opsional)
              </label>
              <input
                type="url"
                value={newLink.thumbnail_url}
                onChange={(e) =>
                  setNewLink({ ...newLink, thumbnail_url: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {saving ? 'Menyimpan...' : 'Simpan Link'}
            </button>
          </form>
        </div>
      )}

      {/* Links List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Semua Link ({links.length})
        </h3>

        {links.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">Belum ada link. Tambah link pertama kamu!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
              >
                {link.thumbnail_url && (
                  <img
                    src={link.thumbnail_url}
                    alt={link.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{link.title}</h4>
                  <p className="text-sm text-gray-500 truncate">{link.url}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingLink(link)}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Link Modal */}
      {editingLink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Link</h3>
            <form onSubmit={handleUpdateLink} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Link
                </label>
                <input
                  type="text"
                  value={editingLink.title}
                  onChange={(e) =>
                    setEditingLink({ ...editingLink, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={editingLink.url}
                  onChange={(e) =>
                    setEditingLink({ ...editingLink, url: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={editingLink.thumbnail_url || ''}
                  onChange={(e) =>
                    setEditingLink({
                      ...editingLink,
                      thumbnail_url: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLink(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Menyimpan...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}