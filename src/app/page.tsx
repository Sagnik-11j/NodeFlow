"use client"

import { requireAuth } from "@/lib/auth-utils"


const page = async () => {
  await requireAuth();

  return (
    <div className='min-h-screen min-w-screen flex tiems-center justify-center'>
      
    </div>
  )
}

export default page
