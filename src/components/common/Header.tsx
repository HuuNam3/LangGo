"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { Bell, BookOpen, Menu, Search, User, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthRedux } from "@/hooks/useAuthRedux";

export function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const { t } = useLanguage();
  const { user: userData, isLoading, logout } = useAuthRedux();
  const showAdmin = (role: string): ReactNode => {
    if (role === "admin") {
      return(
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="cursor-pointer flex items-center"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>dashboard</span>
            </Link>
          </DropdownMenuItem>
        </>
      )
    } else return
  }

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-md">
        <div className="h-full w-full flex justify-center">
          <div className="container flex h-16 items-center justify-between">
            {/* Logo skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-24 hidden sm:block" />
            </div>

            {/* Search skeleton */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Navigation items skeleton */}
            <nav className="hidden md:flex items-center gap-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-md">
      <div className="h-full w-full flex justify-center">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo and Name */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                  LG
                </span>
              </div>
              <span className="font-bold text-white text-xl hidden sm:inline-block">
                LangGo
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <Input
                type="search"
                placeholder={t.header.searchPlaceholder}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white focus:text-black focus:placeholder:text-gray-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60 transition-colors duration-200 group-focus-within:text-black" />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/my-courses"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              {t.header.myCourses}
            </Link>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 relative cursor-pointer"
                >
                  <Bell className="h-5 w-5" />
                  {/* <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-[10px]">
                    5
                  </Badge> */}
                </Button>
              </div>
            </div>
            <ThemeToggle />
            <LanguageSwitcher />

            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : userData ? (
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 border-2 border-white/20 cursor-pointer hover:ring-2 hover:ring-white/30">
                      <AvatarImage
                        src={userData.image}
                        alt={userData.name || ""}
                      />
                      <AvatarFallback className="bg-violet-700 text-white">
                        {userData.name?.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-auto p-2">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {userData.name && (
                          <p className="font-medium">{userData.name}</p>
                        )}
                        {userData.email && (
                          <p className="text-sm text-muted-foreground">
                            {userData.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="cursor-pointer flex items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>{t.header.profile}</span>
                      </Link>
                    </DropdownMenuItem>
                    {showAdmin(userData.role)}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => logout()}
                      className="cursor-pointer text-red-500 focus:text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t.header.logout}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-white text-violet-600 hover:bg-white/90 cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  {t.header.login}
                </Button>
              </Link>
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
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 relative"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-[10px]">
              5
            </Badge>
          </Button>
        </div>

        <LanguageSwitcher />

        {isLoading ? (
          <LoadingSpinner size="sm" />
        ) : userData ? (
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 border-2 border-white/20 cursor-pointer hover:ring-2 hover:ring-white/30">
                  <AvatarImage
                    src={userData.image}
                    alt={userData.name || ""}
                  />
                  <AvatarFallback className="bg-violet-700 text-white">
                    {userData.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {userData.name && (
                      <p className="font-medium">{userData.name}</p>
                    )}
                    {userData.email && (
                      <p className="text-sm text-muted-foreground">
                        {userData.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="cursor-pointer flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>{t.header.profile}</span>
                  </Link>
                </DropdownMenuItem>
                {showAdmin(userData.role)}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.header.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link href="/login">
            <Button
              size="sm"
              className="bg-white text-violet-600 hover:bg-white/90"
            >
              {t.header.login}
            </Button>
          </Link>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 ml-2"
            >
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
                {t.header.myCourses}
              </Link>
              <Link
                href="/notifications"
                className="text-lg font-medium hover:text-violet-500 transition-colors flex items-center gap-2"
              >
                <Bell className="h-5 w-5" />
                {t.header.notifications}
                {55 > 0 && <Badge className="bg-red-500 ml-2">{55}</Badge>}
              </Link>
              {!userData && (
                <Link
                  href="/login"
                  className="text-lg font-medium hover:text-violet-500 transition-colors flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  {t.header.login}
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
          showSearch ? "max-h-16 py-2 border-t border-white/10" : "max-h-0"
        )}
      >
        <div className="container">
          <div className="relative">
            <Input
              type="search"
              placeholder={t.header.searchPlaceholder}
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
  );
}
