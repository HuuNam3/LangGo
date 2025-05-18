"use client"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                  LG
                </span>
              </div>
              <span className="font-bold text-white text-xl">LangGo</span>
            </Link>
            <p className="text-white/80">{t.footer.title}</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white/80 hover:text-white">{t.footer.about}</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-white">{t.footer.contact}</Link></li>
              <li><Link href="/terms" className="text-white/80 hover:text-white">{t.footer.terms}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-white/80 hover:text-white">{t.footer.courses}</Link></li>
              <li><Link href="/tutorials" className="text-white/80 hover:text-white">{t.footer.tutorials}</Link></li>
              <li><Link href="/dictionary" className="text-white/80 hover:text-white">{t.footer.dictionary}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Mandarin Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
