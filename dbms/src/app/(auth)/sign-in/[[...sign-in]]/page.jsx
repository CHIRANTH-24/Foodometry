import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return <div className='flex justify-center mt-40'>
        <SignIn />
    </div>
}