// UPDATE FOR: app/[slug]/page.tsx
// Add this to show avatar on bio page

// ADD THIS IMPORT at the top:
import Image from 'next/image';

// REPLACE the avatar section (around line 80-90) with this:

{/* Profile Section */}
<motion.div 
  className="text-center mb-8"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4 }}
>
  {/* Avatar */}
  <div className="mb-4 flex justify-center">
    {page.avatar_url ? (
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
        <Image
          src={page.avatar_url}
          alt={page.title}
          fill
          className="object-cover"
          priority
        />
      </div>
    ) : (
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        {page.title.charAt(0).toUpperCase()}
      </div>
    )}
  </div>
  
  <h1 className="text-3xl font-bold mb-2">{page.title}</h1>
  {page.description && (
    <p className="text-lg opacity-90">{page.description}</p>
  )}
</motion.div>

// ALSO UPDATE the TypeScript interface at the top:
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
