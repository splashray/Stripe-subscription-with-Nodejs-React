import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePackageFormWindow } from '../../features/sendPackage/sendPackageSlice'
import { changeRiderWindow } from '../../features/sendPackage/chooseRiderSlice'
import { changePaymentSuccessWindow } from '../../features/sendPackage/paymentSuccessSlice'
import PaymentMethod from './PaymentMethod'
import TempOrder from './TempOrder'
import 'animate.css'
import ArrowBack from '../../assets/svgs/arrow-back.svg'
import UserAvatar from '../../assets/images/user-avatar.png'
import starRating from '../../assets/svgs/star.ico'
import comingSoon from '../../assets/images/coming-soon.png'

function Riders() {
  const { chooseRider } = useSelector(state => state.chooseRider)
  const dispatch = useDispatch()

  const [showPayment, setShowPayment] = useState('hidden')

  const showPaymentFunc = () => {
    if (showPayment === 'hidden') {
      setShowPayment('block')
    } else {
      setShowPayment('hidden')
    }
  }

  const togglePaymentSuccess = (params) => {
    !params && dispatch(changePaymentSuccessWindow())

    //Clear backlogs
    dispatch(changePackageFormWindow())
    dispatch(changeRiderWindow())
    setShowPayment('hidden')
  }

  // const toTempRef = useRef()

  // useEffect(() => {
  //   if (chooseRider === 'block') {
  //     setTimeout(() => {
  //       toTempRef.current.scrollIntoView({ behavior: 'smooth' })
  //     }, 1000);
  //   }
  // }, [chooseRider]);

  return (
    <div className={`${chooseRider} overflow-y-auto pb-32 z-[60] animate__animated animate__zoomIn fixed top-0 left-0 h-screen w-screen bg-white`}>
      <div className="sticky top-0 left-0 z-10 bg-white px-2 py-4 flex justify-center w-full items-center shadow-lg">
        <img
          onClick={() => dispatch(changeRiderWindow())}
          src={ArrowBack} className="cursor-pointer flex-shrink justify-self-start"
        />
        <span className="text-customBlue font-semibold flex-grow text-center"><s>Choose Riders</s> <i>Coming soon</i></span>
      </div>

      <TempOrder />

      <div className="relative overflow-hidden mt-[50vh] mx-auto p-2 bg-gray-100 rounded-xl sm:p-4 lg:w-[768px]">
        <h2 className="text-base text-center font-semibold text-customBlue pb-4 md:text-xl">Riders closest to your pick-up location</h2>
        <div className="flex flex-col gap-4">
          <div className="p-2 border shadow-lg bg-white rounded-lg flex flex-wrap justify-between items-center">
            <div className='flex gap-2'>
              <img src={UserAvatar} alt="" className='w-[40px] h-[40px] rounded-full' />
              <div className='flex flex-col gap-1'>
                <span className='font-semibold'>Dauda Oyebami</span>
                <div className='flex items-center gap-1'>
                  <small className="text-[.7rem] font-semibold">Rider rating:</small>
                  <div className='flex items-center'>
                    {[0, 0].map((_, itr) => <img key={itr} src={starRating} alt="" className='w-[12px]' />)}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm'>Distance: <b>2km</b></span>
              <button
                onClick={showPaymentFunc}
                className="text-sm p-1 rounded-sm font-semibold bg-customBlue text-white hover:bg-customBlue/50 md:p-2"
              >
                Choose Rider
              </button>
            </div>
          </div>
          <div className="p-2 border shadow-lg bg-white rounded-lg flex flex-wrap justify-between items-center">
            <div className='flex gap-2'>
              <img src={UserAvatar} alt="" className='w-[40px] h-[40px] rounded-full' />
              <div className='flex flex-col gap-1'>
                <span className='font-semibold'>Ibrahim Musa</span>
                <div className='flex items-center gap-1'>
                  <small className="text-[.7rem] font-semibold">Rider rating:</small>
                  <div className='flex items-center'>
                    {[0, 0, 0, 0, 0].map((_, itr) => <img key={itr} src={starRating} alt="" className='w-[12px]' />)}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm'>Distance: <b>5km</b></span>
              <button className="text-sm p-1 rounded-sm font-semibold bg-customBlue text-white hover:bg-customBlue/50 md:p-2">
                Choose Rider
              </button>
            </div>
          </div>
          <div className="p-2 border shadow-lg bg-white rounded-lg flex flex-wrap justify-between items-center">
            <div className='flex gap-2'>
              <img src={UserAvatar} alt="" className='w-[40px] h-[40px] rounded-full' />
              <div className='flex flex-col gap-1'>
                <span className='font-semibold'>Ezekwe Chijoke</span>
                <div className='flex items-center gap-1'>
                  <small className="text-[.7rem] font-semibold">Rider rating:</small>
                  <div className='flex items-center'>
                    {[0, 0, 0].map((_, itr) => <img key={itr} src={starRating} alt="" className='w-[12px]' />)}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm'>Distance: <b>700m</b></span>
              <button className="text-sm p-1 rounded-sm font-semibold bg-customBlue text-white hover:bg-customBlue/50 md:p-2">
                Choose Rider
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 bg-customGrey/50 w-full h-full flex items-center justify-center">
          <img src={comingSoon} alt="" className='' />
        </div>
      </div>
      <PaymentMethod show={showPayment} showToggle={showPaymentFunc} paymentSuccess={togglePaymentSuccess} />

    </div>
  )
}

export default Riders