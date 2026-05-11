// UPDATE FOR: app/dashboard/pages/[id]/page.tsx
// Add avatar upload to page settings

// ADD THIS IMPORT at the top:
import AvatarUpload from '@/components/AvatarUpload';

// ADD THIS inside the "Pengaturan Page" section, BEFORE "Judul Page":

{/* Profile Picture Upload */}
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
    onUploadComplete={(url) => {
      // Refresh page data after upload
      window.location.reload();
    }}
  />
</div>

// ALSO UPDATE the TypeScript interface to include avatar_url:
interface Page {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  theme_color: string;
  background: string;
  hide_branding: boolean;
  avatar_url: string | null;  // ADD THIS LINE
  user_id: string;
}
