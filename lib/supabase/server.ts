import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    'https://uosytrtjxetmsjfuzkoz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvc3l0cnRqeGV0bXNqZnV6a296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTczMDksImV4cCI6MjA5MzkzMzMwOX0.ouraCya11_ObzIlTHSJeARuGlCdfxH4gKXc_lJCosmo',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
          }
        },
      },
    }
  )
}