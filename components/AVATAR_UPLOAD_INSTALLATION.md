# 📸 PROFILE PICTURE UPLOAD - INSTALLATION GUIDE

## 🎯 OVERVIEW
This feature adds profile picture upload functionality to BioLinky.

## 📋 FILES CREATED:
1. ✅ add_avatar_url_migration.sql - Database migration
2. ✅ setup_avatar_storage.sql - Supabase Storage setup
3. ✅ components/AvatarUpload.tsx - Upload component
4. ✅ bio-page-avatar-update.tsx - Bio page updates
5. ✅ dashboard-avatar-update.tsx - Dashboard updates

---

## 🚀 INSTALLATION STEPS:

### STEP 1: RUN DATABASE MIGRATIONS (Supabase Dashboard)

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select your BioLinky project
   - Go to: SQL Editor (left sidebar)

2. **Run Migration 1 - Add avatar_url column:**
   ```sql
   -- Copy content from: add_avatar_url_migration.sql
   -- Paste in SQL Editor
   -- Click "Run"
   ```

3. **Run Migration 2 - Setup Storage:**
   ```sql
   -- Copy content from: setup_avatar_storage.sql
   -- Paste in SQL Editor
   -- Click "Run"
   ```

4. **Verify Storage Bucket:**
   - Go to: Storage (left sidebar)
   - Should see: "avatars" bucket
   - Status: Public

---

### STEP 2: ADD COMPONENT TO PROJECT

**Terminal commands:**

```bash
# Navigate to project
cd ~/biolinky

# Create components directory if not exists
mkdir -p components

# Copy AvatarUpload component
cp /home/claude/components/AvatarUpload.tsx components/

# Verify
ls -la components/AvatarUpload.tsx
```

---

### STEP 3: UPDATE BIO PAGE

**File:** `app/[slug]/page.tsx`

1. **Add import at top:**
   ```typescript
   import Image from 'next/image';
   ```

2. **Update interface:**
   ```typescript
   interface Page {
     // ... existing fields
     avatar_url: string | null;  // ADD THIS
   }
   ```

3. **Replace avatar section:**
   - Open: bio-page-avatar-update.tsx
   - Copy the avatar section code
   - Replace existing avatar/initial letter code

---

### STEP 4: UPDATE DASHBOARD PAGE

**File:** `app/dashboard/pages/[id]/page.tsx`

1. **Add import at top:**
   ```typescript
   import AvatarUpload from '@/components/AvatarUpload';
   ```

2. **Update interface:**
   ```typescript
   interface Page {
     // ... existing fields
     avatar_url: string | null;  // ADD THIS
   }
   ```

3. **Add upload component:**
   - Open: dashboard-avatar-update.tsx
   - Copy the avatar upload section
   - Add BEFORE "Judul Page" section

---

### STEP 5: INSTALL DEPENDENCIES (if needed)

```bash
cd ~/biolinky

# Check if lucide-react is installed
npm list lucide-react

# If not installed:
npm install lucide-react
```

---

### STEP 6: TEST LOCALLY

```bash
cd ~/biolinky

# Run dev server
npm run dev

# Open: http://localhost:3000/dashboard
# Test:
# 1. Upload avatar
# 2. View bio page
# 3. Change avatar
# 4. Remove avatar
```

---

### STEP 7: DEPLOY TO PRODUCTION

```bash
cd ~/biolinky

# Add all changes
git add .

# Commit
git commit -m "Add profile picture upload feature"

# Push to GitHub
git push origin main

# Vercel will auto-deploy!
```

---

## 🧪 TESTING CHECKLIST:

After deployment, test these scenarios:

### ✅ Upload Avatar:
1. Go to Dashboard → Edit Page
2. Click "Upload Foto"
3. Select image (JPG/PNG, < 2MB)
4. Should see: Loading spinner
5. Should see: ✅ Toast notification
6. Should see: Avatar preview

### ✅ View on Bio Page:
1. Go to bio page (e.g., /cv_saw)
2. Should see: Uploaded avatar (not letter "I")
3. Should be: Round, with shadow

### ✅ Change Avatar:
1. Dashboard → Click "Ganti Foto"
2. Select new image
3. Should replace old avatar
4. Bio page should update

### ✅ Remove Avatar:
1. Dashboard → Click "Hapus"
2. Should see: ✅ Toast notification
3. Should revert to: Letter initial
4. Bio page should show letter again

---

## 🔧 TROUBLESHOOTING:

### ❌ Error: "bucket 'avatars' not found"
**Solution:**
- Go to Supabase Dashboard → Storage
- Manually create bucket "avatars"
- Set to Public

### ❌ Error: "Failed to upload"
**Solution:**
- Check Supabase Storage policies
- Re-run: setup_avatar_storage.sql
- Verify user is authenticated

### ❌ Error: "Image not displaying"
**Solution:**
- Check `next.config.js` has Supabase domain
- Add if missing:
  ```js
  images: {
    domains: ['your-project.supabase.co']
  }
  ```

### ❌ Error: "Module not found: lucide-react"
**Solution:**
```bash
npm install lucide-react
```

---

## 🎨 CUSTOMIZATION OPTIONS:

### Change Max File Size:
In `AvatarUpload.tsx`, line ~35:
```typescript
if (file.size > 2 * 1024 * 1024) {  // Change 2 to desired MB
```

### Change Avatar Size:
In bio page, change:
```typescript
className="w-24 h-24"  // Change to w-32 h-32 for bigger
```

### Add Image Cropping:
Install react-easy-crop:
```bash
npm install react-easy-crop
```

---

## 📊 WHAT'S NEXT?

After avatar upload is working:
1. ✅ SEO Optimization
2. ✅ Content Pages
3. ✅ Social Sharing
4. ✅ Custom Domains

---

## 🎉 THAT'S IT!

Follow the steps above and you'll have:
- ✅ Profile picture upload
- ✅ Image storage (Supabase)
- ✅ Auto-optimization
- ✅ Professional bio pages!

**Estimated Time:** 20-30 minutes total
**Difficulty:** Medium

Good luck! 🚀
