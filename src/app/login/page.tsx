"use client"
import { Footer } from '@/components/common/Footer'
import { Header } from '@/components/common/Header'
import LoginPage from '@/components/common/Login'
import React, { Suspense } from 'react'

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
