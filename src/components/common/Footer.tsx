"use client"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white">
      <div className="h-full w-full flex justify-center">

        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                    ML
                  </span>
                </div>
                <span className="font-bold text-white text-xl">Mandarin Learning</span>
              </Link>
              <p className="text-white/80 text-sm">Creating beautiful digital experiences that inspire and connect.</p>
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

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-white/80 hover:text-white transition-colors text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-white/80 hover:text-white transition-colors text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white/80 hover:text-white transition-colors text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-white/80 hover:text-white transition-colors text-sm">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/support" className="text-white/80 hover:text-white transition-colors text-sm">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-white/80 hover:text-white transition-colors text-sm">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-white/80 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/80 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Subscribe</h3>
              <p className="text-white/80 text-sm">Stay updated with our latest news and offers.</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© {new Date().getFullYear()} Nam Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-white/60 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
