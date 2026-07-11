import LoginForm from '@/features/auth/components/login-form'
import { requireUnauth } from '@/lib/auth-utils'
import Link from 'next/link';
import Image from 'next/image';

const page = async () => {
    await requireUnauth();

    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default page
