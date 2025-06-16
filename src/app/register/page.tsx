"use client"
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
    <div>Register</div>
  )
}

export default Register