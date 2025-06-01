"use client"
import LoginPage from '@/components/common/Login'
import React, { Suspense } from 'react'

export default function Page() {
  return (
    <>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <LoginPage/>
        </Suspense>
    </>
  )
}
