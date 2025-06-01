"use client"
import LoginPage from '@/components/common/Login'
import React, { Suspense } from 'react'
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"

export default function Page() {
  return (
    <>
      <Header/>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <LoginPage/>
        </Suspense>
      <Footer/>
    </>
  )
}
