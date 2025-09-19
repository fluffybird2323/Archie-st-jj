"use client"

import { useState } from "react"
import { Share2, Twitter, Facebook, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateShareURL } from "@/lib/og-image"

interface SocialShareProps {
  title: string
  description: string
  url?: string
  className?: string
}

export function SocialShare({ title, description, url, className = "" }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = `${title} - ${description}`

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: generateShareURL('twitter', currentUrl, shareText),
      color: 'hover:bg-blue-50 hover:text-blue-600'
    },
    {
      name: 'Facebook', 
      icon: Facebook,
      url: generateShareURL('facebook', currentUrl),
      color: 'hover:bg-blue-50 hover:text-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: generateShareURL('whatsapp', currentUrl, shareText),
      color: 'hover:bg-green-50 hover:text-green-600'
    },
    {
      name: 'LINE',
      icon: MessageCircle,
      url: generateShareURL('line', currentUrl, shareText),
      color: 'hover:bg-green-50 hover:text-green-500'
    }
  ]

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: currentUrl
        })
      } catch (error) {
        console.log('Error sharing:', error)
        setIsOpen(!isOpen)
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      // You could add a toast notification here
      alert('Link copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNativeShare}
        className="flex items-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Share Menu */}
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border p-2 z-20 min-w-[160px]">
            <div className="space-y-1">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${link.color}`}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </a>
              ))}
              
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-50 w-full text-left"
              >
                <Share2 className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
