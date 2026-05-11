import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fitur Lengkap - Analytics, QR Code, Custom Theme & Lebih',
  description:
    'Semua fitur BioLinky: Analytics real-time, QR Code generator, custom theme, link scheduling, upload foto profil, link thumbnail, dan banyak lagi. Semua gratis selamanya.',
  alternates: {
    canonical: 'https://biolinky.vercel.app/features',
  },
}

const features = [
  {
    emoji: '📊',
    title: 'Analytics Real-time',
    desc: 'Pantau setiap klik link kamu secara real-time. Lihat link mana yang paling populer, berapa total klik, dan pahami audience kamu lebih dalam.',
    highlights: ['Total klik per link', 'Ranking link terpopuler', 'Dashboard analytics lengkap'],
    gradient: 'from-violet-500/15 to-violet-500/3',
    border: 'border-violet-500/20',
  },
  {
    emoji: '📱',
    title: 'QR Code Generator',
    desc: 'Generate QR code unik untuk halaman bio kamu. Custom warna sesuai brand, download dalam format PNG resolusi tinggi, cetak untuk kartu nama, poster, atau merchandise.',
    highlights: ['Custom warna QR code', 'Download PNG resolusi tinggi', 'Cetak untuk kartu nama & poster'],
    gradient: 'from-blue-500/15 to-blue-500/3',
    border: 'border-blue-500/20',
  },
  {
    emoji: '🎨',
    title: 'Custom Theme & Gradient',
    desc: 'Personalisasi halaman bio kamu sepenuhnya. Pilih warna tema, buat background gradient yang unik, dan tampilkan personality kamu yang sesungguhnya.',
    highlights: ['Color picker lengkap', 'Background gradient', 'Preview langsung'],
    gradient: 'from-fuchsia-500/15 to-fuchsia-500/3',
    border: 'border-fuchsia-500/20',
  },
  {
    emoji: '⏰',
    title: 'Link Scheduling',
    desc: 'Jadwalkan link supaya muncul dan menghilang otomatis di waktu yang kamu tentukan. Sempurna untuk promo flash sale, event terbatas, atau konten seasonal.',
    highlights: ['Set tanggal mulai & selesai', 'Otomatis tampil/sembunyi', 'Ideal untuk promo & event'],
    gradient: 'from-amber-500/15 to-amber-500/3',
    border: 'border-amber-500/20',
  },
  {
    emoji: '🖼️',
    title: 'Foto Profil & Thumbnail',
    desc: 'Upload foto profil untuk halaman bio kamu. Tambahkan gambar thumbnail untuk setiap link agar halaman lebih menarik, profesional, dan meningkatkan click-through rate.',
    highlights: ['Upload foto profil', 'Thumbnail per link', 'Support JPG, PNG, GIF'],
    gradient: 'from-emerald-500/15 to-emerald-500/3',
    border: 'border-emerald-500/20',
  },
  {
    emoji: '🔗',
    title: 'Custom Slug URL',
    desc: 'Dapatkan URL yang mudah diingat dan profesional. Contoh: biolinky.vercel.app/namakamuBagikan ke Instagram, TikTok, YouTube, dan semua platform dengan satu link.',
    highlights: ['URL pendek & mudah diingat', 'Satu link untuk semua platform', 'Mudah diketik di bio'],
    gradient: 'from-cyan-500/15 to-cyan-500/3',
    border: 'border-cyan-500/20',
  },
  {
    emoji: '🎯',
    title: 'Social Media Icons',
    desc: 'BioLinky otomatis mendeteksi platform dari URL kamu dan menampilkan ikon yang sesuai. Instagram, YouTube, TikTok, Twitter, LinkedIn, GitHub, dan banyak lagi.',
    highlights: ['Auto-detect platform', 'Ikon warna brand asli', 'Tampilan profesional'],
    gradient: 'from-rose-500/15 to-rose-500/3',
    border: 'border-rose-500/20',
  },
  {
    emoji: '🚀',
    title: 'Super Cepat & Reliable',
    desc: 'Halaman bio kamu di-host di Vercel Edge Network global dengan uptime 99.9%. Loading cepat dari mana saja di seluruh dunia, mobile-friendly secara default.',
    highlights: ['Vercel Edge Network global', 'Uptime 99.9%', 'Mobile-first design'],
    gradient: 'from-indigo-500/15 to-indigo-500/3',
    border: 'border-indigo-500/20',
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#060912] text-white">
      {/* Nav */}
      <nav className="border-b border-white/8 bg-[#060912]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-black text-sm">B</span>
            </div>
            <span className="text-lg font-black bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">BioLinky</span>
          </Link>
          <div className="flex gap-3">
            <Link href="/login" className="text-gray-400 hover:text-white px-4 py-2 rounded-xl hover:bg-white/8 transition text-sm font-medium">Login</Link>
            <Link href="/signup" className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-lg shadow-violet-500/25">Mulai Gratis</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-sm font-semibold mb-5 uppercase tracking-wide">
            Semua Fitur
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Fitur{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Premium
            </span>
            <br />
            100% Gratis
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Semua yang kamu butuhkan untuk membuat link-in-bio profesional yang mengonversi.
            Tidak ada fitur yang dikunci di balik paywall.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${feature.gradient} border ${feature.border} rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-4xl mb-5">{feature.emoji}</div>
              <h2 className="text-xl font-black text-white mb-3">{feature.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{feature.desc}</p>
              <ul className="space-y-2">
                {feature.highlights.map((h, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-blue-500/5 p-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl font-black text-white mb-4">Coba Semua Fitur Sekarang</h2>
            <p className="text-gray-400 mb-8">Gratis selamanya. Setup dalam 2 menit.</p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-px"
            >
              Buat Akun Gratis →
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/8 py-8 px-4 mt-20 text-center">
        <p className="text-gray-600 text-sm">© 2026 BioLinky. Semua fitur gratis selamanya.</p>
      </footer>
    </div>
  )
}
