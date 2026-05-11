import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang BioLinky - Platform Link in Bio Gratis Indonesia',
  description:
    'BioLinky dibangun untuk creators, influencers, dan businesses Indonesia yang ingin tampil profesional secara online tanpa biaya. Kenali cerita, misi, dan tim di balik BioLinky.',
  alternates: {
    canonical: 'https://biolinky.vercel.app/about',
  },
}

export default function AboutPage() {
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

      <main className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-sm font-semibold mb-5 uppercase tracking-wide">
            Tentang Kami
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Dibuat untuk{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Creators
            </span>
            <br />
            Indonesia
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            BioLinky lahir dari keresahan sederhana: kenapa tools yang bagus harus mahal?
            Creators Indonesia berhak punya tools profesional tanpa bayar.
          </p>
        </div>

        {/* Story */}
        <div className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-3xl p-10 mb-10">
          <h2 className="text-2xl font-black text-white mb-5">Cerita BioLinky</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              BioLinky dimulai dengan pertanyaan sederhana: kenapa creators Indonesia harus membayar
              Rp100.000–200.000 per bulan hanya untuk menyimpan beberapa link?
            </p>
            <p>
              Linktree dan platform serupa memang bagus, tapi dengan harga dalam dollar dan fitur
              terbaik di balik paywall, rasanya tidak adil untuk creators yang baru memulai.
            </p>
            <p>
              Kami membangun BioLinky dengan satu prinsip: <strong className="text-white">semua
              fitur premium, gratis selamanya.</strong> Analytics, QR code, custom theme,
              link scheduling — semuanya tersedia tanpa bayar sepeser pun.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            {
              emoji: '🎯',
              title: 'Misi Kami',
              desc: 'Memberdayakan setiap creator Indonesia dengan tools profesional yang gratis dan mudah digunakan.',
            },
            {
              emoji: '💡',
              title: 'Visi Kami',
              desc: 'Menjadi platform link-in-bio #1 di Indonesia yang dipercaya oleh jutaan creators dan businesses.',
            },
            {
              emoji: '❤️',
              title: 'Nilai Kami',
              desc: 'Transparansi, gratis tanpa syarat, performa tinggi, dan selalu mendengarkan kebutuhan pengguna.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="bg-gradient-to-br from-violet-500/8 to-blue-500/5 border border-violet-500/15 rounded-3xl p-10 mb-16">
          <h2 className="text-2xl font-black text-white mb-6">Teknologi yang Kami Gunakan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Next.js 16', role: 'Framework' },
              { name: 'Supabase', role: 'Database & Auth' },
              { name: 'Vercel', role: 'Hosting' },
              { name: 'Tailwind CSS', role: 'Styling' },
              { name: 'TypeScript', role: 'Language' },
              { name: 'Framer Motion', role: 'Animasi' },
              { name: 'PostgreSQL', role: 'Database' },
              { name: 'React 19', role: 'UI Library' },
            ].map((tech, i) => (
              <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-4 text-center">
                <div className="font-bold text-white text-sm">{tech.name}</div>
                <div className="text-gray-500 text-xs mt-1">{tech.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {[
            { number: '10K+', label: 'Pengguna Aktif' },
            { number: '500K+', label: 'Links Dibuat' },
            { number: '2M+', label: 'Total Klik' },
            { number: '100%', label: 'Gratis Selamanya' },
          ].map((stat, i) => (
            <div key={i} className="text-center bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-black text-white mb-4">Bergabung Sekarang</h2>
          <p className="text-gray-400 mb-8">Gratis. Cepat. Tanpa kartu kredit.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:-translate-y-px"
          >
            Buat Akun Gratis →
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/8 py-8 px-4 mt-20 text-center">
        <div className="flex items-center justify-center gap-6 mb-4">
          <Link href="/" className="text-gray-500 hover:text-violet-400 transition text-sm">Beranda</Link>
          <Link href="/features" className="text-gray-500 hover:text-violet-400 transition text-sm">Fitur</Link>
          <Link href="/pricing" className="text-gray-500 hover:text-violet-400 transition text-sm">Harga</Link>
        </div>
        <p className="text-gray-600 text-sm">© 2026 BioLinky. Dibuat dengan ❤️ untuk creators Indonesia.</p>
      </footer>
    </div>
  )
}
