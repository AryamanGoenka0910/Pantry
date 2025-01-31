import { View, Text } from 'react-native'
import React from 'react'



export default function HomePageCard({title, message}: {title: string, message: string}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
        <div className="w-16 h-16 sm:w-12 sm:h-12 bg-black text-white rounded-full items-center justify-center mb-4 mx-auto inline-flex">
            🍽️
        </div>
        <h4 className="font-kalice text-2xl mb-4 text-center font-semibold text-black">
            {title}
        </h4>
        <p className="font-geist-sans text-gray-600 text-center">
            {message}
        </p>
    </div>
  );
}