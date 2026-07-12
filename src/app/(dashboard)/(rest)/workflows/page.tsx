import { requireAuth } from "@/lib/auth-utils"

const page = async () => {
    await requireAuth();
    
    return (
        <div className=''>
            
        </div>
    )
}

export default page
