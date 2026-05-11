'use client'

import Link from 'next/link'

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://biolinky.vercel.app/#website",
      "url": "https://biolinky.vercel.app",
      "name": "BioLinky",
      "description": "Platform link-in-bio gratis terbaik untuk creators Indonesia",
      "inLanguage": "id-ID",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://biolinky.vercel.app/{search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://biolinky.vercel.app/#organization",
      "name": "BioLinky",
      "url": "https://biolinky.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://biolinky.vercel.app/favicon.ico",
      },
      "sameAs": [],
    },
    {
      "@type": "SoftwareApplication",
      "name": "BioLinky",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "IDR",
      },
      "description":
        "BioLinky adalah platform link-in-bio gratis untuk creators, influencers, dan businesses Indonesia. Analytics real-time, QR code, custom theme — 100% gratis selamanya.",
      "url": "https://biolinky.vercel.app",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500",
      },
    },
  ],
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060912] text-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#060912]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <span className="text-white font-black text-sm">B</span>
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent tracking-tight">
                BioLinky
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Link
                href="/login"
                className="text-gray-400 hover:text-white px-4 py-2 rounded-xl hover:bg-white/8 transition-all duration-200 font-medium text-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-px"
              >
                Mulai Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-28 px-4 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-16 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 text-violet-300 text-sm font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Gratis Selamanya • Unlimited Links • Tanpa Iklan
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tighter">
              <span className="text-white">Satu Link untuk</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                Semua Konten
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Platform link-in-bio paling canggih untuk creators & brands Indonesia.
              Cantik, cepat, dan gratis selamanya.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <Link
                href="/signup"
                className="group flex items-center gap-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <span>Mulai Gratis Sekarang</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/cv_saw"
                className="flex items-center gap-2 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold border border-white/12 hover:border-white/25 hover:bg-white/5 transition-all duration-300"
              >
                <span>Lihat Demo</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative mx-auto w-64 md:w-72">
            <div className="relative rounded-[3rem] border border-white/15 bg-gradient-to-b from-white/8 to-white/3 p-1.5 shadow-2xl">
              <div className="rounded-[2.6rem] bg-[#0d0f1e] overflow-hidden">
                {/* Notch */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-24 h-5 bg-[#060912] rounded-full" />
                </div>
                {/* Bio preview */}
                <div className="px-5 pb-8">
                  <div className="flex flex-col items-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-black text-2xl mb-3 shadow-xl shadow-violet-500/40 ring-2 ring-white/15">
                      J
                    </div>
                    <div className="text-white font-bold text-sm">@johndoe</div>
                    <div className="text-white/40 text-xs mt-0.5">Creator & Designer</div>
                  </div>
                  {[
                    { label: 'Instagram', color: '#E4405F', emoji: '📸' },
                    { label: 'YouTube Channel', color: '#FF0000', emoji: '▶️' },
                    { label: 'Portfolio Website', color: '#7c3aed', emoji: '💼' },
                    { label: 'Toko Online', color: '#f59e0b', emoji: '🛍️' },
                  ].map((link, i) => (
                    <div
                      key={i}
                      className="mb-2.5 rounded-xl p-2.5 flex items-center gap-2.5 border border-white/8"
                      style={{ background: `${link.color}15` }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs"
                        style={{ backgroundColor: `${link.color}25` }}
                      >
                        {link.emoji}
                      </div>
                      <span className="text-white/75 text-xs font-medium">{link.label}</span>
                      <svg className="w-3 h-3 text-white/30 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Glow */}
            <div className="absolute -inset-6 bg-violet-500/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-14 px-4 border-y border-white/8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '10K+', label: 'Pengguna Aktif' },
            { number: '500K+', label: 'Link Dibuat' },
            { number: '2M+', label: 'Total Klik' },
            { number: '99.9%', label: 'Uptime' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-500 text-sm mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-sm font-semibold mb-5 tracking-wide uppercase">
              Fitur Unggulan
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Semua yang Kamu
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Butuhkan</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Fitur premium yang biasanya bayar mahal — di BioLinky semua gratis selamanya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                emoji: '📊',
                title: 'Analytics Real-time',
                desc: 'Track setiap klik, lihat link paling populer, dan pahami audience kamu dengan data lengkap.',
                from: 'from-violet-500/15',
                to: 'to-purple-500/5',
                border: 'border-violet-500/20',
                accent: 'text-violet-400',
              },
              {
                emoji: '📱',
                title: 'QR Code Generator',
                desc: 'Generate QR code dengan custom warna, download PNG, cetak untuk kartu nama atau event.',
                from: 'from-blue-500/15',
                to: 'to-cyan-500/5',
                border: 'border-blue-500/20',
                accent: 'text-blue-400',
              },
              {
                emoji: '🎨',
                title: 'Custom Theme & Gradient',
                desc: 'Pilih warna brand kamu, buat gradient background unik, dan customize sesuai personality.',
                from: 'from-fuchsia-500/15',
                to: 'to-pink-500/5',
                border: 'border-fuchsia-500/20',
                accent: 'text-fuchsia-400',
              },
              {
                emoji: '⏰',
                title: 'Link Scheduling',
                desc: 'Jadwalkan kapan link muncul dan menghilang. Sempurna untuk promo dan kampanye terbatas.',
                from: 'from-amber-500/15',
                to: 'to-orange-500/5',
                border: 'border-amber-500/20',
                accent: 'text-amber-400',
              },
              {
                emoji: '🖼️',
                title: 'Link Thumbnails',
                desc: 'Tambahkan gambar thumbnail untuk setiap link agar halaman lebih menarik dan profesional.',
                from: 'from-emerald-500/15',
                to: 'to-green-500/5',
                border: 'border-emerald-500/20',
                accent: 'text-emerald-400',
              },
              {
                emoji: '🔒',
                title: 'Aman & Terpercaya',
                desc: 'Data kamu aman dengan enkripsi tingkat bank. Hosting Vercel dengan uptime 99.9% global.',
                from: 'from-indigo-500/15',
                to: 'to-blue-500/5',
                border: 'border-indigo-500/20',
                accent: 'text-indigo-400',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`relative group rounded-2xl p-6 bg-gradient-to-br ${feature.from} ${feature.to} border ${feature.border} hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30`}
              >
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-violet-500/30">
                  GRATIS
                </div>
                <div className="text-3xl mb-4">{feature.emoji}</div>
                <h3 className={`text-lg font-bold text-white mb-2`}>{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 border-t border-white/8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-sm font-semibold mb-5 tracking-wide uppercase">
              Cara Kerja
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              3 Langkah, Langsung Jalan
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Daftar Gratis',
                desc: 'Buat akun dalam 30 detik dengan email atau Google. Tidak perlu kartu kredit.',
              },
              {
                step: '02',
                title: 'Tambah Links',
                desc: 'Tambahkan semua link sosial media, portfolio, toko online, dan apapun yang ingin kamu bagikan.',
              },
              {
                step: '03',
                title: 'Share ke Dunia',
                desc: 'Dapatkan link unik dan bagikan ke semua profil sosial media kamu. Selesai!',
              },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 border border-white/10 mb-5 group-hover:border-violet-500/40 transition-all">
                  <span className="text-2xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 px-4 overflow-hidden border-t border-white/8">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Siap{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Memulai?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join ribuan creators yang sudah menggunakan BioLinky untuk mengembangkan audience mereka.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            <span>Mulai Gratis Sekarang</span>
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="mt-6 text-gray-600 text-sm">
            Tidak perlu kartu kredit • Gratis selamanya • Setup 2 menit
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <span className="text-white font-black text-sm">B</span>
                </div>
                <span className="text-xl font-black bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
                  BioLinky
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Platform link-in-bio modern untuk creators, influencers, dan businesses. Semua fitur premium, 100% gratis selamanya.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3">
                <li><Link href="/features" className="text-gray-500 hover:text-violet-400 transition text-sm">Fitur</Link></li>
                <li><Link href="/pricing" className="text-gray-500 hover:text-violet-400 transition text-sm">Harga</Link></li>
                <li><Link href="/about" className="text-gray-500 hover:text-violet-400 transition text-sm">Tentang</Link></li>
                <li><Link href="/cv_saw" className="text-gray-500 hover:text-violet-400 transition text-sm">Lihat Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Account</h4>
              <ul className="space-y-3">
                <li><Link href="/login" className="text-gray-500 hover:text-violet-400 transition text-sm">Login</Link></li>
                <li><Link href="/signup" className="text-gray-500 hover:text-violet-400 transition text-sm">Sign Up</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/8 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2026 BioLinky. Made with ❤️ for creators everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
