"use client"
import { Footer } from '@/components/common/Footer'
import { Header } from '@/components/common/Header'
import { Settings } from '@/components/common/Settings'
import React from 'react'

export default function page() {
  return (
    <>
      <Header/>
      <Settings/>
      <Footer/>
    </>
  )
}
