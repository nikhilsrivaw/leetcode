import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import { z } from 'zod';

// Schema validation for signup form 

const signupSchema = z.object({
    firstName:z.string().min(3,"Name Should contain at;east 3 characters"),
    emailId:z.string().email(),
    password:z.string().min(8,"Password should contain at least 8 characters")
})

function Signup(){

    const {register, handleSubmit,formState: { errors },} = useForm({resolver:zodResolver(signupSchema)});


    const submittedData = (data) => {
        console.log(data)

    }

    return(
        <>
        <form onSubmit={handleSubmit(submittedData)}>
        <input {...register('firstName')} 
        placeholder='Enter Name'/>
        <input {...register('emailId')} 
        placeholder="Enter Email"/>
        
        <input {...register('password')} 
        placeholder="Enter Password" type ="password"/>
        <button type='submut' className='btn btn-lg'>Submit</button>
        </form>
        </>
    )
}





export default Signup

