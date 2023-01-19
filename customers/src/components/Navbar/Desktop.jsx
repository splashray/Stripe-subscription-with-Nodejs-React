import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Notification from '../Notification/Notification'
import MenuIcon from '../../assets/images/menu.png'
import notificationBell from '../../assets/svgs/notification-bell.svg'
import payment from '../../assets/svgs/payment-nav.svg'
import myOrders from '../../assets/svgs/my-order-nav.svg'
import transaction from '../../assets/svgs/transaction-nav.svg'
import support from '../../assets/svgs/support-nav.svg'
import about from '../../assets/svgs/about-nav.svg'
import DesktopDropdown from './DesktopDropdown'
import { notificationToggleFunc } from '../Notification/OpenNotificationFunc'

function Desktop() {
  const [hideMenu, setHideMenu] = useState("hidden")
  const [isNotificationOpen, setIsNotificationOpen] = useState("hidden")

  const isOpenFunc = notificationToggleFunc(isNotificationOpen, setIsNotificationOpen)

  return (
    <>
      <div className='relative px-4 py-1 border-b-2 border-customBlue items-center justify-between hidden sm:flex'>
        <Link to="" className="brandName text-3xl text-customBlue">Okada NG</Link>
        <NavLink id='desktopMenu'
          to="" onMouseOver={() => setHideMenu("")}
          onMouseLeave={() => setHideMenu("hidden")}
          className="transition duration-300 hover:text-customBlue hover:font-bold"
        >
          Menu <img src={MenuIcon} alt="" id='menuIcon' className='inline w-5 transition duration-300' />
        </NavLink>
        <div className="flex items-center gap-12">
          <button onClick={isOpenFunc}
            className='py-1 px-2 bg-customBlue rounded-lg flex gap-2 items-center hover:bg-customLightGrey'
          >
            <img src={notificationBell} alt="" className='notification-icon inline' />
            <span className='text-white text-sm hidden lg:inline'>Notification</span>
          </button>
          {/* <Link to="" className="flex items-center gap-2 px-4 py-1 hover:bg-customLightGrey">
            <img src={userAvatar} alt="" className="w-8 h-8 rounded-full" />
            <span className="text-base font-bold">Dominic</span>
          </Link> */}
          <DesktopDropdown />
        </div>

        <div className={`${hideMenu} animate__animated animate__fadeIn absolute top-10 left-0 z-10 w-full`}>
          <div onMouseOver={() => setHideMenu("")}
            onMouseLeave={() => setHideMenu("hidden")}
            className="mx-auto w-fit bg-white shadow-lg"
          >
            <div className='p-2 flex flex-wrap gap-4'>
              <NavLink to="" className="p-2 font-bold hover:text-customBlue">
                <img src={payment} alt="" className="inline" /> Payments
              </NavLink>
              <NavLink to="" className="p-2 font-bold hover:text-customBlue">
                <img src={myOrders} alt="" className="inline" /> My Orders
              </NavLink>
              <NavLink to="" className="p-2 font-bold hover:text-customBlue">
                <img src={transaction} alt="" className="inline" /> Transactions
              </NavLink>
              <NavLink to="" className="p-2 font-bold hover:text-customBlue">
                <img src={support} alt="" className="inline" /> Support
              </NavLink>
              <NavLink to="" className="p-2 font-bold hover:text-customBlue">
                <img src={about} alt="" className="inline" /> About
              </NavLink>
            </div>
            <div className="mx-auto p-2">
              <NavLink to="" className="bg-customBlue block mx-auto text-sm font-semibold text-center transition duration-300 hover:bg-customGrey">
                <span className="block text-white">Register as Owner/Rider</span>
                <span style={{ fontSize: '.7rem' }} className="block text-white font-light">Earn money on your schedule</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <Notification showNotification={isOpenFunc} isNotificationOpen={isNotificationOpen} />
    </>
  )
}

export default Desktop