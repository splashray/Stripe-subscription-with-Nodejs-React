import React from 'react'
import { Link } from 'react-router-dom'
import signupImage from '../assets/svgs/signup-image.svg'
import google from '../assets/svgs/google.svg'
import facebook from '../assets/svgs/facebook.svg'

function Welcome() {
  return (
    <div className='mx-auto px-4 sm:w-[500px] md:px-8'>
      <div className='py-4 md:py-6'>
        <img src={signupImage} alt="" className='mx-auto' />
        <div className='mt-4 flex flex-col items-center'>
          <h3 className='text-customGrey font-bold text-2xl text-center'>On the dot Delivery and Real Time Tracking</h3>
          <div className="mt-4 w-full">
            <Link to="/signup" className='font-bold text-xl bg-customBlue rounded-md block w-full text-center py-2 text-white'>
              Sign Up
            </Link>
            <div className='mt-2 text-center'>
              <small className="text-sm text-center text-customLightGrey lg:text-base">Already have an account?</small>
              <Link to="/login" className='font-bold text-customBlue'> Log in</Link>
            </div>
          </div>
          <div className="mt-4 w-full flex gap-2 items-center justify-center">
            <div className="h-[1px] w-4/12 bg-customLightGrey"></div>
            <span className='text-customLightGrey'>or</span>
            <div className="h-[1px] w-4/12 bg-customLightGrey"></div>
          </div>
          <div className="w-full mt-4 flex flex-col gap-4">
            <button className='py-3 border border-customLightGrey rounded-2xl flex items-center justify-center gap-2'>
              <img src={google} alt="" />
              <span>Sign up with Google</span>
            </button>
            <button className='py-3 border border-customLightGrey rounded-2xl flex items-center justify-center gap-2'>
              <img src={facebook} alt="" />
              <span>Sign up with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome