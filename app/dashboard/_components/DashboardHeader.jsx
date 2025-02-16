import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const DashboardHeader = ({ onMenuClick }) => {
  return (
    <div className='bg-white h-16 shadow-sm flex items-center px-5'>
      
      <button 
        onClick={onMenuClick}
        className="md:hidden mr-4 p-2 hover:bg-gray-100 rounded-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

     
      <div className="ml-auto flex items-center space-x-4">
        <UserButton />
        <Link href="/dashboard">
          <Button 
            variant="outline" 
            className="bg-primary text-white hover:bg-primary/80 transition-colors duration-300"
          >
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default DashboardHeader
