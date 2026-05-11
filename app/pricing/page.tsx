import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Harga & Paket - BioLinky Gratis Selamanya',
  description:
    'BioLinky 100% gratis selamanya. Tidak ada paket berbayar, tidak ada hidden fee, tidak perlu kartu kredit. Semua fitur premium tersedia gratis untuk semua pengguna.',
  alternates: {
    canonical: 'https://biolinky.vercel.app/pricing',
  },
}

export default function PricingPage() {
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

      <main className="max-w-5xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm font-semibold mb-5 uppercase tracking-wide">
            Harga Transparan
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Gratis.{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Selamanya.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Tidak ada tipu-tipu. Tidak ada kartu kredit. Tidak ada batas link.
            BioLinky gratis untuk semua orang, selamanya.
          </p>
        </div>

        {/* Single Plan Card */}
        <div className="relative max-w-xl mx-auto mb-20">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-3xl blur opacity-40" />
          <div className="relative bg-[#0d0f1e] border border-white/15 rounded-3xl p-10 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-lg shadow-violet-500/30">
              ✨ Satu-satunya Paket
            </div>
            <div className="mb-6">
              <span className="text-7xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Rp0</span>
              <div className="text-gray-500 mt-2">/bulan • Gratis selamanya</div>
            </div>

            <div className="space-y-3 mb-10 text-left">
              {[
                'Unlimited links',
                'Analytics klik real-time',
                'QR Code generator & download',
                'Custom theme color & gradient',
                'Upload foto profil',
                'Link scheduling (start & end date)',
                'Link thumbnail images',
                'Remove branding option',
                'Custom slug URL',
                'HTTPS otomatis',
                'Uptime 99.9% (hosted di Vercel)',
                'Tidak ada iklan sama sekali',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/signup"
              className="block w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 hover:-translate-y-px"
            >
              Mulai Gratis Sekarang →
            </Link>
            <p className="text-gray-600 text-xs mt-3">Tidak perlu kartu kredit</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            Pertanyaan yang Sering Ditanya
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Apakah benar-benar gratis?',
                a: 'Ya, 100% gratis. Tidak ada paket premium tersembunyi, tidak ada batas waktu trial, tidak ada kartu kredit yang diperlukan.',
              },
              {
                q: 'Apakah ada batasan jumlah link?',
                a: 'Tidak ada! Kamu bisa menambahkan sebanyak mungkin link yang kamu inginkan tanpa batasan.',
              },
              {
                q: 'Bagaimana BioLinky menghasilkan uang?',
                a: 'Saat ini BioLinky gratis sepenuhnya. Di masa depan mungkin ada fitur opsional premium, tapi semua fitur inti akan tetap gratis.',
              },
              {
                q: 'Apakah data saya aman?',
                a: 'Ya. Data kamu disimpan di Supabase (PostgreSQL) dengan enkripsi standar industri. Kami tidak menjual data kamu ke pihak ketiga.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8 px-4 mt-20 text-center">
        <p className="text-gray-600 text-sm">© 2026 BioLinky. Gratis selamanya.</p>
      </footer>
    </div>
  )
}
