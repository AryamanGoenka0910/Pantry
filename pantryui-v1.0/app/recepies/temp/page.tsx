import { View, Text } from 'react-native'
import React from 'react'

export default function page() {
  return (
    <div className='p-6 bg-gray-50 pt-28 px-40'>
        <header className="flex flex-col justify-between items-start border-b pb-4 mb-6">
            <h1 className='text-3xl font-bold text-gray-800'>Carbonara</h1>
            <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">Italian</span>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">Quick & Easy</span>
                <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">30 Minutes</span>
            </div>
        </header>
    </div>
  )
}