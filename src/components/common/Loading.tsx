"use client"
import React from 'react'

export default function Loading({text}:{text?:string}) {
  return (
    <div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        {text && <p className="text-gray-600">{text}</p>}
    </div>
  )
}
