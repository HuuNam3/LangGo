"use client"
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="container mt-2">
      <h1 className='text-2xl font-bold'>Khóa học của tôi</h1>
      <p>bạn chưa học bài học nào <Link href="/"><span className='text-blue-700'>quay lại home</span></Link></p>
    </div>
  )
}
