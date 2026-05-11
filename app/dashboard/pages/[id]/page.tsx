'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import QRCode from 'qrcode'
import toast, { Toaster } from 'react-hot-toast'
import AvatarUpload from '@/components/AvatarUpload'
import { getSocialIcon } from '@/lib/utils/getSocialIcon'

type ThemePreset = {
  id: string
  name: string
  emoji: string
  background: string
  themeColor: string
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'dark-elegant',
    name: 'Dark Elegant',
    emoji: '⚫',
    background: 'linear-gradient(160deg, #0d0d1a 0%, #1a1a2e 50%, #0f1a3d 100%)',
    themeColor: '#C9A84C',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    emoji: '✨',
    background: 'linear-gradient(160deg, #080500 0%, #120c00 40%, #1c1500 70%, #0e0a00 100%)',
    themeColor: '#C9A84C',
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    emoji: '⚡',
    background: 'linear-gradient(160deg, #07000f 0%, #0d0020 50%, #050010 100%)',
    themeColor: '#a855f7',
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    emoji: '🌊',
    background: 'linear-gradient(160deg, #020d1a 0%, #0a2540 50%, #0d3358 100%)',
    themeColor: '#38bdf8',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    emoji: '🌲',
    background: 'linear-gradient(160deg, #020d08 0%, #0a2015 50%, #0d2e1a 100%)',
    themeColor: '#4ade80',
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    emoji: '🌹',
    background: 'linear-gradient(160deg, #1a0d10 0%, #2d1520 50%, #1a0d18 100%)',
    themeColor: '#f0a090',
  },
  {
    id: 'sunset-vibes',
    name: 'Sunset Vibes',
    emoji: '🌅',
    background: 'linear-gradient(160deg, #f093fb 0%, #f5576c 50%, #fda085 100%)',
    themeColor: '#ffffff',
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    emoji: '🎀',
    background: 'linear-gradient(160deg, #fdf2f8 0%, #ede9fe 50%, #e0f2fe 100%)',
    themeColor: '#a855f7',
  },
  {
    id: 'minimal-white',
    name: 'Minimal White',
    emoji: '⚪',
    background: '#ffffff',
    themeColor: '#111111',
  },
  {
    id: 'custom',
    name: 'Custom',
    emoji: '✏️',
    background: '',
    themeColor: '',
  },
]

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
  is_active: boolean
  avatar_url: string | null  // ✅ ADDED
}

export default function EditPagePage() {
  const params = useParams()
  const pageId = params.id as string
  const supabase = createClient()

  const [page, setPage] = useState<PageData | null>(null)
  const [links, setLinks] = useState<PageLink[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    thumbnail_url: '',
  })
  const [saving, setSaving] = useState(false)
  const [editingLink, setEditingLink] = useState<PageLink | null>(null)
  const [thumbnailUploading, setThumbnailUploading] = useState(false)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const [pageTitle, setPageTitle] = useState('')
  const [pageDescription, setPageDescription] = useState('')
  const [pageThemeColor, setPageThemeColor] = useState('#3b82f6')
  const [pageBackgroundType, setPageBackgroundType] = useState('solid')
  const [pageBackgroundValue, setPageBackgroundValue] = useState('#ffffff')
  const [hideBranding, setHideBranding] = useState(false)
  const [selectedThemeId, setSelectedThemeId] = useState('custom')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [qrForeground, setQrForeground] = useState('#000000')
  const [qrBackground, setQrBackground] = useState('#ffffff')
  const [showQrSection, setShowQrSection] = useState(false)

  useEffect(() => {
    fetchPageData()
  }, [pageId])

  const fetchPageData = async () => {
    try {
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single()

      if (pageError) throw pageError
      setPage(pageData)
      setPageTitle(pageData.title || '')
      setPageDescription(pageData.description || '')
      setPageThemeColor(pageData.theme_color || '#3b82f6')
      setPageBackgroundType(pageData.background_type || 'solid')
      setPageBackgroundValue(pageData.background_value || '#ffffff')
      setHideBranding(pageData.hide_branding || false)

      const { data: linksData, error: linksError } = await supabase
        .from('page_links')
        .select('*')
        .eq('page_id', pageId)
        .order('order_position', { ascending: true })

      if (linksError) throw linksError
      setLinks(linksData || [])
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load page data')
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
      toast.success('✅ Link berhasil ditambahkan!')
      setNewLink({ title: '', url: '', thumbnail_url: '' })
      setShowAddForm(false)
      fetchPageData()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteLink = async (linkId: string) => {
    if (!confirm('Yakin mau hapus link ini?')) return
    try {
      const { error } = await supabase.from('page_links').delete().eq('id', linkId)
      if (error) throw error
      toast.success('✅ Link berhasil dihapus!')
      fetchPageData()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingLink) return

    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar!')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 2MB!')
      return
    }

    setThumbnailUploading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const fileExt = file.name.split('.').pop()
      const fileName = `thumbnails/${user.id}/${editingLink.id}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { cacheControl: '3600', upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      setEditingLink({ ...editingLink, thumbnail_url: publicUrl })
      toast.success('Foto berhasil diupload!')
    } catch (error: any) {
      toast.error(`Upload gagal: ${error.message}`)
    } finally {
      setThumbnailUploading(false)
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = ''
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
          start_date: editingLink.start_date,
          end_date: editingLink.end_date,
        })
        .eq('id', editingLink.id)
      if (error) throw error
      toast.success('✅ Link berhasil diupdate!')
      setEditingLink(null)
      fetchPageData()
    } catch (error: any) {
      toast.error(error.message)
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
          hide_branding: hideBranding,
        })
        .eq('id', pageId)
      if (error) throw error
      toast.success('✅ Pengaturan page berhasil diupdate!')
      fetchPageData()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setSaving(false)
    }
  }

  const applyPreset = (theme: ThemePreset) => {
    setSelectedThemeId(theme.id)
    if (theme.id !== 'custom') {
      setPageThemeColor(theme.themeColor)
      setPageBackgroundValue(theme.background)
    }
  }

  const generateQRCode = async () => {
    if (!page) return
    const pageUrl = `${window.location.origin}/${page.slug}`
    try {
      const qrDataUrl = await QRCode.toDataURL(pageUrl, {
        width: 512,
        margin: 2,
        color: { dark: qrForeground, light: qrBackground },
      })
      setQrCodeUrl(qrDataUrl)
    } catch (error) {
      console.error('Error generating QR code:', error)
      toast.error('Failed to generate QR code')
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = `qr-code-${page?.slug || 'biolinky'}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">Page tidak ditemukan</div>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 transition">
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const mostClickedLink = links.reduce((max, link) => (link.clicks > max.clicks ? link : max), links[0])

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 transition">
                ← Kembali ke Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{page.title}</h1>
                <p className="text-sm text-gray-500">biolinky.com/{page.slug}</p>
              </div>
            </div>
            <Link href={`/${page.slug}`} target="_blank" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Preview →
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* ✅ AVATAR UPLOAD - NEW SECTION */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📸 Foto Profil
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Upload foto profil untuk ditampilkan di halaman bio kamu
              </p>
              <AvatarUpload 
                currentAvatarUrl={page.avatar_url}
                pageId={page.id}
                onUploadComplete={() => fetchPageData()}
              />
            </div>

            {/* Page Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">⚙️ Pengaturan Page</h2>
              <form onSubmit={handleUpdatePage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul Page</label>
                  <input type="text" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Nama kamu" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea value={pageDescription} onChange={(e) => setPageDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} placeholder="Bio singkat tentang kamu" />
                </div>
                {/* Theme Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">🎨 Pilih Theme</label>
                  <div className="grid grid-cols-5 gap-2 mb-2">
                    {THEME_PRESETS.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => applyPreset(theme)}
                        className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
                          selectedThemeId === theme.id
                            ? 'ring-2 ring-violet-500 ring-offset-2 scale-105 shadow-lg shadow-violet-500/20'
                            : 'border border-gray-200 hover:scale-105 hover:shadow-md hover:border-violet-300'
                        }`}
                      >
                        {theme.id === 'custom' ? (
                          <div className="h-12 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-lg">✏️</span>
                          </div>
                        ) : (
                          <div className="h-12" style={{ background: theme.background }} />
                        )}
                        <div className="bg-white px-1 py-1 flex items-center gap-1">
                          <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-gray-200"
                            style={{
                              backgroundColor: theme.id === 'custom' ? pageThemeColor : theme.themeColor,
                            }}
                          />
                          <span className="text-[9px] text-gray-600 truncate font-medium leading-tight">{theme.name}</span>
                        </div>
                        {selectedThemeId === theme.id && (
                          <div className="absolute top-1 right-1 w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    {selectedThemeId === 'custom' ? 'Mode custom — atur warna manual di bawah.' : `Theme "${THEME_PRESETS.find(t => t.id === selectedThemeId)?.name}" dipilih. Klik Simpan untuk menerapkan.`}
                  </p>
                </div>

                {/* Custom inputs — hanya tampil bila Custom dipilih */}
                {selectedThemeId === 'custom' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Warna Aksen</label>
                      <div className="flex gap-2 items-center">
                        <input type="color" value={pageThemeColor} onChange={(e) => setPageThemeColor(e.target.value)} className="h-10 w-20 rounded border border-gray-300 cursor-pointer" />
                        <input type="text" value={pageThemeColor} onChange={(e) => setPageThemeColor(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm" placeholder="#3b82f6" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
                      <input type="text" value={pageBackgroundValue} onChange={(e) => setPageBackgroundValue(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        placeholder="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" />
                      <p className="text-xs text-gray-500 mt-1">Gunakan hex (#99ff00) atau CSS gradient</p>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Remove BioLinky Branding</h3>
                    <p className="text-sm text-gray-500">Hide "Dibuat dengan BioLinky" footer from your bio page</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={hideBranding} onChange={(e) => setHideBranding(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">{hideBranding ? 'Hidden' : 'Visible'}</span>
                  </label>
                </div>
                <button type="submit" disabled={saving}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition">
                  {saving ? '💾 Menyimpan...' : '💾 Simpan Pengaturan'}
                </button>
              </form>
            </div>

            <button onClick={() => setShowAddForm(!showAddForm)}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition text-lg">
              + Tambah Link Baru
            </button>

            {showAddForm && (
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Tambah Link Baru</h3>
                <form onSubmit={handleAddLink} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Link</label>
                    <input type="text" value={newLink.title} onChange={(e) => setNewLink({ ...newLink, title: e.target.value})} required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Instagram Saya" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                    <input type="url" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://instagram.com/username" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL (opsional)</label>
                    <input type="url" value={newLink.thumbnail_url} onChange={(e) => setNewLink({ ...newLink, thumbnail_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://example.com/image.jpg" />
                  </div>
                  <button type="submit" disabled={saving}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition">
                    {saving ? 'Menyimpan...' : 'Simpan Link'}
                  </button>
                </form>
              </div>
            )}

            <div>
              <h3 className="text-xl font-semibold mb-4">Semua Link ({links.length})</h3>
              {links.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <p className="text-gray-500">Belum ada link. Tambah link pertama kamu!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {links.map((link) => (
                    <div key={link.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                      {/* Thumbnail atau logo platform */}
                      {link.thumbnail_url ? (
                        <img src={link.thumbnail_url} alt={link.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                      ) : (
                        (() => {
                          const { icon: Icon, color } = getSocialIcon(link.url)
                          return (
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${color}18`, border: `1px solid ${color}40` }}
                            >
                              <Icon size={22} style={{ color }} />
                            </div>
                          )
                        })()
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{link.title}</h4>
                          {(link.start_date || link.end_date) && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                              ⏰ Scheduled
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{link.url}</p>
                        {(link.start_date || link.end_date) && (
                          <div className="text-xs text-gray-400 mt-1">
                            {link.start_date && <span>From: {new Date(link.start_date).toLocaleDateString()}</span>}
                            {link.start_date && link.end_date && <span> • </span>}
                            {link.end_date && <span>Until: {new Date(link.end_date).toLocaleDateString()}</span>}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingLink(link)}
                          className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">Edit</button>
                        <button onClick={() => handleDeleteLink(link.id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">Hapus</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {editingLink && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                  <h3 className="text-xl font-semibold mb-4">Edit Link</h3>
                  <form onSubmit={handleUpdateLink} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Judul Link</label>
                      <input type="text" value={editingLink.title} onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                      <input type="url" value={editingLink.url} onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Foto Thumbnail</label>
                      <div className="flex items-center gap-4">
                        {/* Preview: foto atau logo platform */}
                        <div className="relative flex-shrink-0">
                          {editingLink.thumbnail_url ? (
                            <img
                              src={editingLink.thumbnail_url}
                              alt="thumbnail"
                              className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                            />
                          ) : (
                            (() => {
                              const { icon: Icon, color } = getSocialIcon(editingLink.url)
                              return (
                                <div
                                  className="w-16 h-16 rounded-xl flex items-center justify-center border"
                                  style={{ backgroundColor: `${color}18`, borderColor: `${color}40` }}
                                >
                                  <Icon size={28} style={{ color }} />
                                </div>
                              )
                            })()
                          )}
                          {thumbnailUploading && (
                            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                              <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Tombol upload / hapus */}
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            disabled={thumbnailUploading}
                            onClick={() => thumbnailInputRef.current?.click()}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                          >
                            {editingLink.thumbnail_url ? 'Ganti Foto' : 'Upload Foto'}
                          </button>
                          {editingLink.thumbnail_url && (
                            <button
                              type="button"
                              onClick={() => setEditingLink({ ...editingLink, thumbnail_url: null })}
                              className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                            >
                              Hapus Foto
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Hidden file input */}
                      <input
                        ref={thumbnailInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="hidden"
                      />

                      {!editingLink.thumbnail_url && (
                        <p className="text-xs text-gray-400 mt-2">
                          Jika tidak diupload, logo {getSocialIcon(editingLink.url).name} akan digunakan otomatis.
                        </p>
                      )}
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">⏰ Schedule Link (Optional)</h4>
                      <p className="text-xs text-gray-500 mb-3">Set when this link should be visible. Leave empty to always show.</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Start Date & Time</label>
                          <input type="datetime-local" value={editingLink.start_date?.slice(0, 16) || ''}
                            onChange={(e) => setEditingLink({ ...editingLink, start_date: e.target.value || null })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                          <p className="text-xs text-gray-400 mt-1">{editingLink.start_date ? '✅ Scheduled' : 'Always visible'}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">End Date & Time</label>
                          <input type="datetime-local" value={editingLink.end_date?.slice(0, 16) || ''}
                            onChange={(e) => setEditingLink({ ...editingLink, end_date: e.target.value || null })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                          <p className="text-xs text-gray-400 mt-1">{editingLink.end_date ? '✅ Scheduled' : 'No expiration'}</p>
                        </div>
                      </div>
                      {editingLink.start_date && editingLink.end_date && (
                        <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-2">
                          <p className="text-xs text-blue-800">
                            📅 This link will be visible from <strong>{new Date(editingLink.start_date).toLocaleString()}</strong> to <strong>{new Date(editingLink.end_date).toLocaleString()}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setEditingLink(null)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
                      <button type="submit" disabled={saving}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                        {saving ? 'Menyimpan...' : 'Update'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">📊 Analytics</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">Total Links</p>
                  <p className="text-3xl font-bold text-blue-900">{links.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">Total Clicks</p>
                  <p className="text-3xl font-bold text-green-900">
                    {links.reduce((sum, link) => sum + link.clicks, 0)}
                  </p>
                </div>
                {mostClickedLink && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-700 font-medium">Most Clicked Link</p>
                    <p className="font-semibold text-purple-900">{mostClickedLink.title}</p>
                    <p className="text-sm text-purple-600">{mostClickedLink.clicks} clicks</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <button onClick={() => setShowQrSection(!showQrSection)}
                className="w-full flex items-center justify-between text-lg font-semibold mb-4">
                <span>📱 QR Code Generator</span>
                <span>{showQrSection ? '▼' : '▶'}</span>
              </button>
              {showQrSection && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Foreground</label>
                      <input type="color" value={qrForeground} onChange={(e) => setQrForeground(e.target.value)}
                        className="h-10 w-16 rounded border border-gray-300" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Background</label>
                      <input type="color" value={qrBackground} onChange={(e) => setQrBackground(e.target.value)}
                        className="h-10 w-16 rounded border border-gray-300" />
                    </div>
                  </div>
                  <button onClick={generateQRCode}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Generate QR Code
                  </button>
                  {qrCodeUrl && (
                    <div className="text-center">
                      <img src={qrCodeUrl} alt="QR Code" className="mx-auto rounded-lg shadow-md" />
                      <button onClick={downloadQRCode}
                        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                        📥 Download QR Code
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}