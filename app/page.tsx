import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                BioLinky
              </h1>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition font-medium"
              >
                Mulai Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                Gratis Selamanya • Tanpa Iklan • Unlimited Links
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Satu Link untuk
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                Semua yang Kamu Bagikan
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Platform link-in-bio modern untuk creators, influencers, dan businesses. 
              Kumpulkan semua link sosial media kamu dalam satu halaman yang cantik.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/signup"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <span>🚀 Mulai Gratis Sekarang</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/cv_saw"
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition shadow-sm hover:shadow-md"
              >
                <span>👀 Lihat Demo</span>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Tidak perlu kartu kredit</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Setup dalam 2 menit</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Gratis selamanya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fitur Premium, 100% Gratis
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Semua yang kamu butuhkan untuk membuat link-in-bio profesional
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-blue-100">
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                GRATIS
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Analytics Real-time
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track setiap klik, lihat link mana yang paling populer, dan pahami audience kamu dengan analytics lengkap.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-purple-100">
              <div className="absolute -top-4 -right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                GRATIS
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                QR Code Generator
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate QR code dengan custom warna, download PNG, dan cetak untuk kartu nama atau poster event kamu.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-pink-100">
              <div className="absolute -top-4 -right-4 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                GRATIS
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Custom Theme & Gradient
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Pilih warna brand kamu, buat gradient background yang unik, dan customize halaman sesuai personality kamu.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Setup Super Cepat
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Daftar, tambah link, dan publish dalam 2 menit. Tidak ada setup rumit atau konfigurasi yang membingungkan.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-yellow-100">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Link Thumbnails
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tambahkan gambar thumbnail untuk setiap link supaya halaman kamu lebih menarik dan profesional.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-indigo-100">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Aman & Terpercaya
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Data kamu aman dengan enkripsi tingkat bank. Hosting di Vercel dengan uptime 99.9% dan performance global.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              💰 Harga Terbaik di Pasaran
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pilih Paket yang Sesuai
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mulai gratis, upgrade kapan saja. Semua paket tanpa biaya tersembunyi.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gratis</h3>
                <p className="text-gray-600 text-sm">Sempurna untuk memulai</p>
              </div>
              
              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900">Rp 0</p>
                <p className="text-gray-600 text-sm mt-2">Selamanya</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Unlimited links</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Basic analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Custom theme</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">QR code generator</span>
                </li>
              </ul>

              <Link
                href="/signup"
                className="block w-full text-center bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Mulai Gratis
              </Link>
            </div>

            {/* Pro Plan - Featured */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl border-2 border-blue-500 p-8 shadow-2xl transform md:scale-105 relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 text-gray-900 font-bold px-6 py-2 rounded-full text-sm shadow-lg">
                  ⭐ PALING POPULER
                </div>
              </div>

              <div className="mb-6 pt-4">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-blue-100 text-sm">Untuk creators serius</p>
              </div>
              
              <div className="mb-6">
                <p className="text-5xl font-bold text-white">Rp 49.000</p>
                <p className="text-blue-100 text-sm mt-2">/bulan atau Rp 490.000/tahun (hemat 17%)</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Semua fitur Gratis</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Advanced analytics & insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Custom domain</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Remove BioLinky branding</span>
                </li>
              </ul>

              <Link
                href="/signup"
                className="block w-full text-center bg-yellow-400 text-gray-900 py-3 rounded-xl font-bold hover:bg-yellow-300 transition shadow-lg"
              >
                Upgrade ke Pro
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
                <p className="text-gray-600 text-sm">Untuk brand & agency</p>
              </div>
              
              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900">Rp 149.000</p>
                <p className="text-gray-600 text-sm mt-2">/bulan</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Semua fitur Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Multiple profiles</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Team collaboration</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">API access</span>
                </li>
              </ul>

              <Link
                href="/signup"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Upgrade ke Business
              </Link>
            </div>
          </div>

          {/* Comparison vs Linktree */}
          <div className="mt-16 p-8 bg-white rounded-2xl border-2 border-green-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              💪 BioLinky vs Linktree
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <tbody className="divide-y">
                  <tr>
                    <td className="py-4 font-semibold text-gray-900">Harga Pro Plan</td>
                    <td className="py-4 text-center text-green-600 font-bold">Rp 49.000/bulan</td>
                    <td className="py-4 text-center text-red-600">$5 (~Rp 75.000)/bulan</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="py-4 font-semibold text-gray-900">Penghematan/tahun</td>
                    <td className="py-4 text-center text-green-600 font-bold">Hemat 34% 🎉</td>
                    <td className="py-4 text-center">-</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-gray-900">Plan Gratis</td>
                    <td className="py-4 text-center text-green-600 font-bold">✓ Semua fitur premium</td>
                    <td className="py-4 text-center text-red-600">✗ Limited</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="py-4 font-semibold text-gray-900">Analytics</td>
                    <td className="py-4 text-center text-green-600 font-bold">✓ Gratis</td>
                    <td className="py-4 text-center text-red-600">✗ Pro only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Dipercaya oleh Ribuan Creators
            </h2>
            <p className="text-xl text-gray-600">
              Lihat apa kata mereka tentang BioLinky
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "BioLinky mengubah cara saya share link. Setup cepat, analytics jelas, dan harganya jauh lebih murah dari Linktree!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  AS
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Aia Sabrina</p>
                  <p className="text-sm text-gray-600">Content Creator</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "QR code generator dan custom theme-nya luar biasa! Semua fitur yang dibutuhkan ada di satu tempat. Recommended!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rudi Kirana</p>
                  <p className="text-sm text-gray-600">YouTuber</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border border-pink-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Analytics yang real-time sangat membantu saya track performa setiap link. BioLinky adalah game changer!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  NP
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Nova Putri</p>
                  <p className="text-sm text-gray-600">Influencer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNHYyYzAgMi0yIDQtMiA0cy0yLTItMi00di0yem0wLTMwYzAtMiAyLTQgMi00czIgMiAyIDR2MmMwIDItMiA0LTIgNHMtMi0yLTItNFY0ek00IDM2YzItMCA0LTIgNC0yczItMiA0LTJoMmMyIDAgNCAyIDQgMnMyIDIgMiA0djJjMCAyLTIgNC0yIDRzLTItMi00LTJoLTJjLTIgMC00IDItNCAycy0yIDItNCAydjJjMCAyLTIgNC0yIDRzLTItMi0yLTR2LTJjMC0yIDItNCAyLTRzMi0yIDItNHYtMmMwLTItMi00LTItNHMtMi0yLTItNHYtMmMwLTIgMi00IDItNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Jangan Bayar Mahal untuk Link-in-Bio
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Daftar sekarang dan dapatkan akses gratis ke semua fitur premium. 
            Upgrade ke Pro kapan saja dengan harga termurah di Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-5 rounded-xl hover:bg-gray-50 transition font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <span>🚀 Mulai Gratis Sekarang</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/cv_saw"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-10 py-5 rounded-xl hover:bg-white/10 transition font-bold text-xl"
            >
              👀 Lihat Demo
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-75">
            ✨ Gratis selamanya • 💳 Tidak perlu kartu kredit • ⚡ Setup 2 menit
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
                BioLinky
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Platform link-in-bio modern untuk creators, influencers, dan businesses. 
                Semua fitur premium, 100% gratis selamanya.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/signup" className="text-gray-600 hover:text-blue-600 transition">
                    Mulai Gratis
                  </Link>
                </li>
                <li>
                  <Link href="/cv_saw" className="text-gray-600 hover:text-blue-600 transition">
                    Lihat Demo
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Account</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-gray-600 hover:text-blue-600 transition">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-gray-600 hover:text-blue-600 transition">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 BioLinky. Made with <span className="text-red-500">❤️</span> for creators everywhere.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}