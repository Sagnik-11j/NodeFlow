import LoginForm from '@/features/auth/components/login-form'
import { requireUnauth } from '@/lib/auth-utils'
import React from 'react'

const page = async () => {
    await requireUnauth();
    
    return (
        <div className='flex items-center justify-center w-full min-h-screen'>
            <LoginForm />
        </div>
    )
}

export default page
