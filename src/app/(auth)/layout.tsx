import { requireUnauth } from '@/lib/auth-utils'
import Link from 'next/link';
import Image from 'next/image';


interface authLayoutProps {
    children: React.ReactNode;
}

const authLayout = ({ children }: authLayoutProps) => {
    return (
        <>
            <div className='flex flex-col gap-6 p-6 md:p-10 items-center justify-center w-full min-h-svh bg-muted'>
                <div className='flex w-full max-w-sm flex-col gap-6'>
                    <Link href={"/"} className='flex justify-center items-center gap-2 self-center font-medium'>
                        <Image src={"/logos/logo.png"} alt='Nodeflow' width={30} height={30} />
                        Nodeflow
                    </Link>
                    {children}
                </div>
            </div>
        </>
    )
}

export default authLayout
