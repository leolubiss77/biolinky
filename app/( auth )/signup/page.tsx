'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      if (error) throw error
      toast.success('Cek email kamu untuk verifikasi!')
      router.push('/login')
    } catch (error: any) {
      setError(error.message || 'Signup gagal')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${location.origin}/auth/callback` },
      })
      if (error) throw error
    } catch (error: any) {
      setError(error.message || 'Google signup gagal')
    }
  }

  return (
    <div className="min-h-screen bg-[#060912] flex">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e1b2e', color: '#fff', border: '1px solid rgba(139,92,246,0.3)' } }} />

      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-[#060912] to-violet-900/40" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-violet-500/40">
              <span className="text-white font-black text-xl">B</span>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
              BioLinky
            </span>
          </div>

          <h2 className="text-4xl font-black text-white mb-4 leading-tight tracking-tight">
            Buat Halaman
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Bio Kamu!
            </span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            Bergabung dengan ribuan creators yang sudah menggunakan BioLinky untuk berkembang.
          </p>

          {/* Testimonial */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <div className="text-white font-semibold text-sm">@andi_creator</div>
                <div className="text-gray-500 text-xs">Content Creator</div>
              </div>
              <div className="ml-auto text-yellow-400 text-sm">★★★★★</div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed italic">
              "BioLinky mengubah cara aku share konten. Semua link di satu tempat, keren dan gratis!"
            </p>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2.5 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-white font-black">B</span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
              BioLinky
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight">Buat Akun Gratis</h1>
            <p className="text-gray-500 mt-2">Sudah punya akun?{' '}
              <Link href="/login" className="text-violet-400 hover:text-violet-300 font-semibold transition">
                Masuk di sini
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Google Button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 bg-white/8 border border-white/12 text-white py-3.5 rounded-xl font-semibold hover:bg-white/12 hover:border-white/20 transition-all duration-200 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Daftar dengan Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-600 text-sm font-medium">atau</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Nama Lengkap</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-white/12 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition placeholder-gray-600"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-white/12 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition placeholder-gray-600"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/12 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition placeholder-gray-600"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-600 mt-1.5">Minimal 6 karakter</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 hover:-translate-y-px"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Mendaftar...
                </span>
              ) : 'Buat Akun Gratis'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-600">
            Dengan mendaftar, kamu menyetujui syarat & ketentuan BioLinky.
          </p>
        </div>
      </div>
    </div>
  )
}
