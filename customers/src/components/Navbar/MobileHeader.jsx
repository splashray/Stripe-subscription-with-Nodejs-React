import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeNavBarState } from '../../features/navbar/navbarSlice'
import { notificationToggleFunc } from '../Notification/OpenNotificationFunc'
import Notification from '../Notification/Notification'
import menuPop from '../../assets/svgs/menu-pop.svg'
import notificationBell from '../../assets/svgs/notification-bell.svg'

function MobileHeader() {
  const [isNotificationOpen, setIsNotificationOpen] = useState("hidden")

  const { navBarState } = useSelector((state) => state.navBar)
  const dispatch = useDispatch()

  const isOpenFunc = notificationToggleFunc(isNotificationOpen, setIsNotificationOpen)

  return (
    <>
      <div className='border-b-2 border-customBlue lg:hidden'>
        <div className='flex items-center justify-between p-2'>
          <img src={menuPop} alt="" onClick={() => dispatch(changeNavBarState())} className='p-2' />
          <Link to="" className="brandName text-2xl text-customBlue">Okada NG</Link>
          <img src={notificationBell} onClick={isOpenFunc} alt="" className='p-2' />
        </div>
      </div>

      <div onClick={() => dispatch(changeNavBarState())} className={`${navBarState} z-10 cursor-pointer absolute top-0 left-0 w-screen h-screen backdrop-blur-sm bg-white/30`}></div>
      <Notification showNotification={isOpenFunc} isNotificationOpen={isNotificationOpen} />
    </>
  )
}

export default MobileHeader