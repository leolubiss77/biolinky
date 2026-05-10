import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://uosytrtjxetmsjfuzkoz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvc3l0cnRqeGV0bXNqZnV6a296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTczMDksImV4cCI6MjA5MzkzMzMwOX0.ouraCya11_ObzIlTHSJeARuGlCdfxH4gKXc_lJCosmo'
  )
}