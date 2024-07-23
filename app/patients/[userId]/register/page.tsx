import Image from 'next/image'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import RegisterForm from '@/components/forms/RegisterForm'
import { getPatient, getUser } from '@/lib/actions/patient.actions'

import * as Sentry from '@sentry/nextjs'

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId)
  const patient = await getPatient(userId)

  Sentry.metrics.set('user_view_register', user.name)

  if (patient) redirect(`/patients/${userId}/new-appointment`)

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
          <Link
            href='/'
            className='cursor-pointer flex gap-2 items-center'
          >
            <Image
              src='/assets/icons/logo-icon.svg'
              height={1000}
              width={1000}
              alt='patient'
              className='mb-12 h-10 w-fit'
            />
            <span className='text-24-bold mb-12'>Doctor Plus</span>
          </Link>

          <RegisterForm user={user} />

          <p className='copyright py-12'>© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src='/assets/images/register-img.png'
        height={1000}
        width={1000}
        alt='patient'
        className='side-img max-w-[390px]'
      />
    </div>
  )
}

export default Register
