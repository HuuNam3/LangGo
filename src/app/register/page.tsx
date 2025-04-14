"use client"
import { Footer } from '@/components/common/Footer'
import { Header } from '@/components/common/Header'
import RegisterPage from '@/components/common/Register'
import React from 'react'

export default function page() {
  return (
    <>
      <Header/>
      <RegisterPage/>
      <Footer/>
    </>
  )
}
