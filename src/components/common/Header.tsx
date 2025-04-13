"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, BookOpen, Menu, Search, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface HeaderProps {
  isLoggedIn?: boolean
  username?: string
  avatarUrl?: string
  notificationCount?: number
}

export function Header({ isLoggedIn = false, username = "", avatarUrl = "", notificationCount = 0 }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-md">
      <div className="h-full w-full flex justify-center">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo and Name */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                  ML
                </span>
              </div>
              <span className="font-bold text-white text-xl hidden sm:inline-block">Mandarin Learning</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search Mandarin lessons..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white focus:text-black focus:placeholder:text-gray-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/lessons"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              Lessons Learned
            </Link>

            <div className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative cursor-pointer">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-[10px]">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </Badge>
                )}
              </Button>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-white/20">
                  <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={username} />
                  <AvatarFallback className="bg-violet-700 text-white">
                    {username.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Button className="bg-white text-violet-600 hover:bg-white/90 cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden flex-1 items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="h-5 w-5" />
        </Button>

        <div className="relative">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-[10px]">
                {notificationCount > 9 ? "9+" : notificationCount}
              </Badge>
            )}
          </Button>
        </div>

        {isLoggedIn ? (
          <Avatar className="h-8 w-8 border-2 border-white/20">
            <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={username} />
            <AvatarFallback className="bg-violet-700 text-white">{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        ) : (
          <Button size="sm" className="bg-white text-violet-600 hover:bg-white/90">
            Login
          </Button>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-6">
              <Link
                href="/lessons"
                className="text-lg font-medium hover:text-violet-500 transition-colors flex items-center gap-2"
              >
                <BookOpen className="h-5 w-5" />
                Lessons Learned
              </Link>
              <Link
                href="/notifications"
                className="text-lg font-medium hover:text-violet-500 transition-colors flex items-center gap-2"
              >
                <Bell className="h-5 w-5" />
                Notifications
                {notificationCount > 0 && <Badge className="bg-red-500 ml-2">{notificationCount}</Badge>}
              </Link>
              {!isLoggedIn && (
                <Link
                  href="/login"
                  className="text-lg font-medium hover:text-violet-500 transition-colors flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  Login
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Search Bar (Expandable) */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          showSearch ? "max-h-16 py-2 border-t border-white/10" : "max-h-0",
        )}
      >
        <div className="container">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search Mandarin lessons..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white focus:text-black focus:placeholder:text-gray-500"
              autoFocus={showSearch}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-white/60"
              onClick={() => setShowSearch(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
