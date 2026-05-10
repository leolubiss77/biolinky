import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">BioLinky</h1>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Mulai Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            🎉 100% Gratis. Tanpa Iklan. Selamanya.
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Satu Link untuk
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Semua Profile Kamu
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Bagikan Instagram, YouTube, TikTok, dan semua link sosial media kamu dalam satu halaman cantik. Gratis selamanya dengan fitur premium!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🚀 Mulai Gratis Sekarang
            </Link>
            <Link
              href="/cv_saw"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-400 transition font-semibold text-lg"
            >
              👀 Lihat Contoh
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            ✨ Tidak perlu kartu kredit • ⚡ Setup 2 menit • 🎨 Customize sesuka hati
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kenapa Pilih BioLinky?
            </h2>
            <p className="text-xl text-gray-600">
              Fitur premium yang biasanya berbayar, di BioLinky 100% GRATIS!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Analytics Lengkap
              </h3>
              <p className="text-gray-600 mb-4">
                Track clicks per link, lihat top performing links, dan analytics real-time.
              </p>
              <div className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Premium di Linktree ($5/bulan)
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                QR Code Generator
              </h3>
              <p className="text-gray-600 mb-4">
                Generate & download QR code dengan custom warna untuk kartu nama atau poster.
              </p>
              <div className="inline-block bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Premium di Linktree ($5/bulan)
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Custom Theme & Gradient
              </h3>
              <p className="text-gray-600 mb-4">
                Pilih warna tema, gradient background, dan customize sesuai brand kamu.
              </p>
              <div className="inline-block bg-pink-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Premium di Linktree ($5/bulan)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              BioLinky vs Linktree
            </h2>
            <p className="text-xl text-gray-600">
              Fitur premium tanpa biaya premium
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Fitur
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    BioLinky
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Linktree Free
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Linktree Pro ($5/mo)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Unlimited Links</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Analytics</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓ GRATIS</td>
                  <td className="px-6 py-4 text-center text-red-600 font-bold">✗</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">QR Code</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓ GRATIS</td>
                  <td className="px-6 py-4 text-center text-red-600 font-bold">✗</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓</td>
                </tr>
                <tr className="bg-pink-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Custom Theme</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓ GRATIS</td>
                  <td className="px-6 py-4 text-center text-red-600 font-bold">✗</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Link Thumbnails</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓</td>
                  <td className="px-6 py-4 text-center text-red-600 font-bold">✗</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">✓</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">Harga</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-bold text-lg">GRATIS</td>
                  <td className="px-6 py-4 text-center text-gray-600 font-bold">$0</td>
                  <td className="px-6 py-4 text-center text-gray-600 font-bold">$5/bulan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Siap Mulai?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Buat link-in-bio kamu dalam 2 menit. Gratis selamanya.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-600 px-10 py-5 rounded-xl hover:bg-gray-100 transition font-bold text-xl shadow-2xl"
          >
            🚀 Mulai Gratis Sekarang
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">BioLinky</h3>
              <p className="text-gray-400">
                Platform link-in-bio terbaik dengan fitur premium gratis selamanya.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/signup" className="hover:text-white">Mulai Gratis</Link></li>
                <li><Link href="/cv_saw" className="hover:text-white">Lihat Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white">Login</Link></li>
                <li><Link href="/signup" className="hover:text-white">Sign Up</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 BioLinky. Made with ❤️ for creators.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
