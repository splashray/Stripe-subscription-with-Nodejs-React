import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeNavBarState } from '../../features/navbar/navbarSlice'
import Notification from '../Notification/Notification'
import { notificationToggleFunc } from '../Notification/OpenNotificationFunc'
import LoadingBackdrop from '../../utils/LoadingBackdrop'
import 'animate.css'
import ArrowBack from '../../assets/svgs/arrow-back.svg'
import userAvatar from '../../assets/images/user-avatar.png'
import home from '../../assets/images/home.png'
import myOrders from '../../assets/svgs/my-order-nav.svg'
import notificationPng from '../../assets/images/notification-bell.png'
import support from '../../assets/svgs/support-nav.svg'
import about from '../../assets/svgs/about-nav.svg'
import logout from '../../assets/images/logout.png'
// import wallet from '../../assets/images/wallet.png'
// import payment from '../../assets/svgs/payment-nav.svg'
// import transaction from '../../assets/svgs/transaction-nav.svg'

function NavBar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState("hidden")
  const [isLoading, setIsLoading] = useState(false)

  const { navBarState } = useSelector((state) => state.navBar)
  const dispatch = useDispatch()

  const isOpenFunc = notificationToggleFunc(isNotificationOpen, setIsNotificationOpen)

  const activeClassName = "border-l-4 border-customBlue py-2 px-4 font-bold bg-customVeryLight"

  const firstName = JSON.parse(localStorage.getItem("customer")).name.split(" ")[0]

  return (
    <>
      <div className={`animate__animated animate__slideInLeft overflow-y-auto pb-32 fixed z-20 bg-white top-0 left-0 shadow-xl h-screen ${navBarState} lg:block lg:relative w-[70vw] lg:w-[25vw] lg:pb-8`}>
        <div onClick={() => dispatch(changeNavBarState())} className="cursor-pointer absolute top-2 right-0 text-center p-1 border border-customBlue rounded-full  flex items-center justify-center lg:hidden">
          <img
            src={ArrowBack}
            className="cursor-pointer flex-shrink justify-self-start"
          />
        </div>
        <div className="">
          <Link to="" className="brandName text-2xl text-center py-2 text-customBlue block">Okada NG</Link>

          <div className='flex flex-col h-full gap-4'>
            <div className="flex items-center gap-2 px-4 py-4">
              <img src={userAvatar} alt="" className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <span className="text-base font-bold">{firstName}</span>
                <Link to="" className="text-sm text-customOrange">Edit profile</Link>
              </div>
            </div>

            <div className="p-2 pl-4 border-y-4 border-customVeryLight">
              <Link to='/wallet' className="block w-full mx-auto rounded-lg">
                <div className="flex flex-col justify-between">
                  <span className="text-sm text-customDarkGrey font-semibold">Wallet Balance</span>
                  <span className="text-2xl font-bold inline-block">NGN 25,066.89</span>
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto text-sm">
              <NavLink to="/" className={({ isActive }) =>
                isActive ? activeClassName : 'py-2 px-4 font-bold hover:text-customBlue hover:bg-customVeryLight hover:border-l-4 hover:border-customBlue'}>
                <img src={home} alt="" className="inline-block w-[24px] mr-2" /> Home
              </NavLink>
              {/* <NavLink to="/wallet" className={({ isActive }) =>
              isActive ? activeClassName : 'py-2 px-4 font-bold hover:text-customBlue hover:bg-customVeryLight hover:border-l-4 hover:border-customBlue'}>
              <img src={wallet} alt="" className="inline mr-2" /> Wallet
            </NavLink> */}
              {/* <NavLink to="/payments" className={({ isActive }) =>
              isActive ? activeClassName : 'py-2 px-4 font-bold hover:text-customBlue hover:bg-customVeryLight hover:border-l-4 hover:border-customBlue'}>
              <img src={payment} alt="" className="inline mr-2" /> Payments
            </NavLink> */}
              <NavLink to="/my-orders" className={({ isActive }) =>
                isActive ? activeClassName : 'py-2 px-4 font-bold hover:text-customBlue hover:bg-customVeryLight hover:border-l-4 hover:border-customBlue'}>
                <img src={myOrders} alt="" className="inline-block w-[24px] mr-2" /> My Orders
              </NavLink>
              <span onClick={isOpenFunc}
                className={'cursor-pointer py-2 px-4 font-bold hover:text-customBlue hover:bg-customVeryLight hover:border-l-4 hover:border-customBlue hidden lg:inline-block'}
              >
                <img src={notificationPng} alt="" className="inline-block w-[24px] mr-2" /> Notification
              </span>
              {/* <NavLink to="/transactions" className={({ isActive }) =>
              isActive ? activeClassName : 'py-2 px-4 font-bold hover:text-customBlue hover:bg-customVeryLight hover:border-l-4 hover:border-customBlue'}>
              <img src={transaction} alt="" className="inline mr-2" /> Transactions
            </NavLink> */}
              <NavLink to="/support" className={({ isActive }) =>
                isActive ? activeClassName : 'py-2 px-4 font-bold hover:text-customBlue hover:bg-customVeryLight hover:border-l-4 hover:border-customBlue'}>
                <img src={support} alt="" className="inline-block w-[24px] mr-2" /> Support
              </NavLink>
              <NavLink to="/about" className={({ isActive }) =>
                isActive ? activeClassName : 'py-2 px-4 font-bold hover:text-customBlue hover:bg-customVeryLight hover:border-l-4 hover:border-customBlue'}>
                <img src={about} alt="" className="inline-block w-[24px] mr-2" /> About
              </NavLink>
              <span
                onClick={() => {
                  setIsLoading(true)
                  setTimeout(() => {
                    localStorage.removeItem("customer")
                  }, 2000);
                }}
                className={'cursor-pointer py-2 px-4 font-bold hover:text-customBlue hover:bg-customVeryLight hover:border-l-4 hover:border-customBlue'}
              >
                <img src={logout} alt="" className="inline w-[24px] mr-2" /> Logout
              </span>

              <a href="https://okadang.com" target="_blank" rel='noopener noreferrer' id='ridersLink' className="bg-customBlue block mx-auto text-sm text-center px-4 w-11/12 block py-2 rounded-lg justify-self-end fixed bottom-20 left-2">
                <span className="block text-white font-semibold">Register as Owner/Rider</span>
                <span style={{ fontSize: '.7rem' }} className="block text-white font-light">Earn money on your schedule</span>
              </a>
            </div>
          </div>
        </div>

      </div>
      <Notification showNotification={isOpenFunc} isNotificationOpen={isNotificationOpen} />

      {isLoading && <LoadingBackdrop />}
    </>
  )
}

export default NavBar
