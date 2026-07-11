import RegisterForm from '@/features/auth/components/register-form'
import { requireUnauth } from '@/lib/auth-utils'
import React from 'react'

const page = async () => {
    await requireUnauth();
    
    return (
        <div className='flex items-center justify-center w-full min-h-screen'>
            <RegisterForm />
        </div>
    )
}

export default page