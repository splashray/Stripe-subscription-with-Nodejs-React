import React from 'react'
import Layout from '../components/Layout/Layout'
import 'animate.css'
import { Link } from 'react-router-dom'
import sendPackage from '../assets/svgs/send-package.svg'

function Wallet() {
  return (
    <Layout>
      <div className="animate__animated animate__fadeIn px-2 py-4 sm:pt-10 lg:pt-20 sm:px-4">
        <div className="mx-auto sm:w-[300px] flex flex-col gap-4">
          <div className='p-2 border border-customOrange rounded-lg shadow-lg'>
            <div className="flex items-center justify-between">
              <span className="text-sm text-customDarkGrey font-semibold">Wallet Balance</span>
              <button className="p-2 mt-2 text-sm font-bold text-white bg-customOrange rounded-md">FUND WALLET</button>
            </div>
            <span className="text-2xl font-bold inline-block">NGN 25,066.89</span>
          </div>
          <Link to="/" className='block p-2 bg-customBlue text-white font-bold text-base text-center rounded-lg'>
            <img src={sendPackage} alt="" className='inline-block mr-1' /> Send a package
          </Link>
        </div>
        <div className="mt-6 py-4 border-t border-customVeryLight overflow-y-auto">
          <div>
            <span className='text-xl font-semibold text-black'>Transaction History</span>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between py-2 px-1 sm:px-4 shadow-lg">
                <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold text-customDarkGrey">Delivery fee</span>
                  <small className="text-sm font-light text-customLightGrey">July 7, 2022</small>
                </div>
                <span className="text-red-500 font-semibold">-NGN 500</span>
              </div>
              <div className="flex items-center justify-between py-2 px-1 sm:px-4 shadow-lg">
                <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold text-customDarkGrey">Delivery fee</span>
                  <small className="text-sm font-light text-customLightGrey">July 7, 2022</small>
                </div>
                <span className="text-red-500 font-semibold">-NGN 500</span>
              </div>
              <div className="flex items-center justify-between py-2 px-1 sm:px-4 shadow-lg">
                <div className="flex flex-col gap-2">
                  <span className="text-base font-semibold text-customDarkGrey">Top up</span>
                  <small className="text-sm font-light text-customLightGrey">June 27, 2022</small>
                </div>
                <span className="text-green-500 font-semibold">-NGN 12,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Wallet