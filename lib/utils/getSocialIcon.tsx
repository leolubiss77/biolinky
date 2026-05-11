import {
  Camera,
  Play,
  Radio,
  Briefcase,
  Code,
  Globe,
  Music,
  Mail
} from 'lucide-react'

export function getSocialIcon(url: string) {
  const urlLower = url.toLowerCase()

  // Instagram
  if (urlLower.includes('instagram.com')) {
    return { icon: Camera, color: '#E4405F', name: 'Instagram' }
  }

  // YouTube
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return { icon: Play, color: '#FF0000', name: 'YouTube' }
  }

  // TikTok
  if (urlLower.includes('tiktok.com')) {
    return { icon: Music, color: '#000000', name: 'TikTok' }
  }

  // Twitter/X
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
    return { icon: Radio, color: '#1DA1F2', name: 'Twitter' }
  }

  // LinkedIn
  if (urlLower.includes('linkedin.com')) {
    return { icon: Briefcase, color: '#0A66C2', name: 'LinkedIn' }
  }

  // Facebook
  if (urlLower.includes('facebook.com') || urlLower.includes('fb.com')) {
    return { icon: Globe, color: '#1877F2', name: 'Facebook' }
  }

  // GitHub
  if (urlLower.includes('github.com')) {
    return { icon: Code, color: '#181717', name: 'GitHub' }
  }

  // Email
  if (urlLower.includes('mailto:')) {
    return { icon: Mail, color: '#EA4335', name: 'Email' }
  }

  // Default: Website
  return { icon: Globe, color: '#6B7280', name: 'Website' }
}