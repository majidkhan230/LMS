import { LoginForm } from '@/components/login-form'
import { Button } from '@/components/ui/button'
import React from 'react'

function Login() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <LoginForm />
    </div>
  )
}

export default Login