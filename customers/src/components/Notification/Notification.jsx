import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkTrackPage } from '../../features/trackPage/trackPageSlice'
import ArrowBack from '../../assets/svgs/arrow-back.svg'
import ReadAll from '../../assets/svgs/check.svg'
import noNotification from '../../assets/images/no-notification.png'
import riding from '../../assets/images/ride-in-progress.png'
import packageDelivered from '../../assets/images/package-delivered.png'

function Notification({ showNotification, isNotificationOpen }) {
  const [messages, setMessages] = useState(false)

  const dispatch = useDispatch()

  return (
    <div className={`${isNotificationOpen} fixed top-0 right-0 z-20 w-screen h-screen flex justify-end`}>
      <div onClick={showNotification} className='cursor-pointer absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-white/30'>
      </div>
      <div className="animate__animated animate__slideInRight py-4 bg-white h-full shadow-2xl w-[90vw] md:w-[75vw] lg:w-[40vw]">
        <div className="flex items-center justify-between px-1 pb-2 border-b-2">
          <div className="flex items-center gap-1">
            <img
              onClick={showNotification}
              src={ArrowBack}
              className="cursor-pointer flex-shrink justify-self-start"
            />
            <h2 className="text-xl lg:text-2xl text-customBlue font-bold">Notification</h2>
          </div>
          <div onClick={null} className="flex items-center gap-4">
            <button className="text-sm p-1 font-semibold text-white bg-customBlue">
              <img
                src={ReadAll} alt=""
                className="notification-icon inline-block mr-1 w-4"
              />
              Read All
            </button>
          </div>
        </div>
        <div className="mt-4 p-2 flex flex-col gap-3 lg:p-4">
          {
            !messages ?
              <div className='text-center'>
                <img src={noNotification} alt="" className='pt-10 h-[200px] mx-auto' />
                <span className="text-customLightGrey font-semibold text-xl">You have no notifications</span>
              </div>

              :
              <>
                <div
                  onClick={() => dispatch(checkTrackPage())}
                  className="cursor-pointer relative p-2 border rounded-lg shadow-lg flex gap-4"
                >
                  <img src={riding} alt="" className='w-8 h-8' />
                  <div className='flex flex-grow flex-col'>
                    <h2 className='font-semibold text- sm:text-xl'>Your Rider has arrived</h2>
                    <div className="flex flex-grow justify-between items-center flex-wrap">
                      <small className='text-customOrange text-sm cursor-pointer'>Click here to track your package</small>
                      <small className='items-end justify-self-end pt-3 text-end w-full'>22/07/2022 at 7:45pm</small>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500"></div>
                </div>
                <div
                  onClick={() => dispatch(checkTrackPage())}
                  className="cursor-pointer relative p-2 border rounded-lg shadow-lg flex gap-4"
                >
                  <img src={packageDelivered} alt="" className='w-8 h-8' />
                  <div className='flex flex-grow flex-col'>
                    <h2 className='font-semibold text- sm:text-xl'>Your Package has been delivered</h2>
                    <div className="flex flex-grow justify-between items-center flex-wrap">
                      <small className='text-customOrange text-sm cursor-pointer'>Click here to track your package</small>
                      <small className='items-end justify-self-end pt-3 text-end w-full'>22/07/2022 at 7:45pm</small>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500"></div>
                </div>
              </>
          }
        </div>
      </div>
    </div >
  )
}

export default Notification