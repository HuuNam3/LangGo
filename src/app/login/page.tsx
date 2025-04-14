"use client"
import { Footer } from '@/components/common/Footer'
import { Header } from '@/components/common/Header'
import LoginPage from '@/components/common/Login'
import React from 'react'

export default function page() {
  return (
    <>
      <Header/>
      <LoginPage/>
      <Footer/>
    </>
  )
}
