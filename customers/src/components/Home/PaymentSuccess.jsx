import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changePaymentSuccessWindow } from '../../features/sendPackage/paymentSuccessSlice'
import { checkTrackPage } from '../../features/trackPage/trackPageSlice'
import 'animate.css'
import paymentIcon from '../../assets/svgs/payment-success.svg'

function PaymentSuccess() {
  const { paymentSuccessWindow } = useSelector(state => state.paymentSuccess)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const resetValuesHack = () => {
    navigate("/my-orders")
    setTimeout(() => {
      navigate("/")
    }, 200);
  }

  return (
    <div className={`${paymentSuccessWindow} fixed z-[70] top-0 left-0 w-screen h-screen bg-white`}>
      <div className='w-screen h-screen flex flex-col items-center justify-center gap-4 mx-auto p-2 rounded-xl sm:p-4 lg:w-[768px]'>
        <img src={paymentIcon} alt="" />
        <div className="flex flex-col gap-2 text-center">
          <span className="text-2xl font-semibold">Payment Successful</span>
          <span>Your rider is on the way</span>
          <span>Tracking Number <span className='text-customOrange'>AW-8433-0547-2298</span></span>
        </div>
        <div className="mt-6 flex flex-col gap-2 w-full">
          <button
            onClick={() => {
              navigate("/my-orders")
              dispatch(changePaymentSuccessWindow())
              dispatch(checkTrackPage())
            }}
            className='bg-customBlue rounded-lg p-2 w-full font-bold text-white text-center'>Track my item</button>
          <button
            onClick={() => {
              resetValuesHack()
              setTimeout(() => {
                dispatch(changePaymentSuccessWindow())
              }, 250);
            }}
            className='text-customBlue rounded-lg p-2 w-full font-bold bg-white text-center border border-customBlue'
          >
            Go back to homepage
          </button>
        </div>
      </div>
    </div >
  )
}

export default PaymentSuccess