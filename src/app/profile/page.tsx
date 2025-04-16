import { Footer } from '@/components/common/Footer'
import { Header } from '@/components/common/Header'
import UserProfile from '@/components/common/Profile'
import React from 'react'

export default function page() {
  return (
    <>
        <Header/>
        <UserProfile/>
        <Footer/>
    </>
  )
}
