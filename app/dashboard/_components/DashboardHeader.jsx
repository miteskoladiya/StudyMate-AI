import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const DashboardHeader = () => {
  return (
    <div className='p-5 shadow-md flex justify-end gap-4'>
      <UserButton/>
      <Link href="/dashboard">
        <Button 
          variant="outline" 
          className="bg-primary text-white hover:bg-primary/80 transition-colors duration-300"
        >
          Dashboard
        </Button>
      </Link>
    </div>
  )
}

export default DashboardHeader