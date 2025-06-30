"use client"
import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if(password!== confirmPassword){
          setError("Password is not matchs")
      }
      try {
           const res = await fetch("/api/auth/register",{
                method:"POSt",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({email,password}),
           })
           const data = res.json();
           if(!res.ok){
            setError("Registration failed")
           }
           router.push('/login')
                 
      } catch (error) {
        
      }
    }
   
  return (
    <div className='max-w-md mx-auto'>
        <h1 className='text-2xl font-bold mb-4 '> Register</h1>
       <form onSubmit={handleSubmit} className='space-y-4'>
       <div>
        <label htmlFor='email' className='block mb-1'>Email</label>
        <input type="email" 
        id='email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
        className='w-full px-3 py-2 border rounded'/>
       </div>
       <div>
        <label htmlFor='password' className='block mb-1'>Password</label>
        <input type="password" 
        id='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        className='w-full px-3 py-2 border rounded'/>
       </div>
       <div>
        <label htmlFor='confirmPassword' className='block mb-2'>ConfirmPassword</label>
        <input type="confirmPassword" 
        id='confirmPassword'
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        required
        className='w-full px-3 py-2 border rounded'/>
       </div>
       <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 '>
          Register
       </button>
       <p className='text-center mt-4'>Already have an account?{" "}</p>
       <Link href='/login' className='text-blue-600 hover:text-blue-700 '>Login</Link>
       </form>

    </div>
  );
}

export default Register