'use client';

import { useState, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  pageId: string;
  onUploadComplete?: (url: string) => void;
}

export default function AvatarUpload({ 
  currentAvatarUrl, 
  pageId,
  onUploadComplete 
}: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient();

  const uploadAvatar = async (file: File) => {
    try {
      setUploading(true);

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('File harus berupa gambar!');
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 2MB!');
        return;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Anda harus login terlebih dahulu!');
        return;
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${pageId}-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update page with new avatar URL
      const { error: updateError } = await supabase
        .from('pages')
        .update({ avatar_url: publicUrl })
        .eq('id', pageId);

      if (updateError) {
        throw updateError;
      }

      // Update preview
      setPreviewUrl(publicUrl);
      
      // Callback
      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }

      toast.success('✅ Foto profil berhasil diupload!');

    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`❌ Upload gagal: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload
      uploadAvatar(file);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      setUploading(true);

      // Update page to remove avatar URL
      const { error } = await supabase
        .from('pages')
        .update({ avatar_url: null })
        .eq('id', pageId);

      if (error) throw error;

      setPreviewUrl(null);
      toast.success('✅ Foto profil berhasil dihapus!');
      
      if (onUploadComplete) {
        onUploadComplete('');
      }

    } catch (error: any) {
      console.error('Remove error:', error);
      toast.error(`❌ Hapus gagal: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Preview */}
        <div className="relative">
          {previewUrl ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={previewUrl}
                alt="Avatar preview"
                fill
                className="object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {uploading ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                'I'
              )}
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
          
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {previewUrl ? 'Ganti Foto' : 'Upload Foto'}
            </button>

            {previewUrl && (
              <button
                onClick={handleRemoveAvatar}
                disabled={uploading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Hapus
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500">
            Format: JPG, PNG, GIF • Maksimal 2MB
          </p>
        </div>
      </div>
    </div>
  );
}
