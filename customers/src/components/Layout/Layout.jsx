import React from 'react'
import MobileHeader from '../Navbar/MobileHeader'
import NavBar from '../Navbar/Navbar'
import Riders from '../Home/Riders'
import SendPackageForm from '../Home/SendPackageForm'
import TrackingOrder from '../MyOrders/TrackingOrder'
import PaymentSuccess from '../Home/PaymentSuccess'

function Layout({ children }) {
  return (
    <>
      <MobileHeader />
      <div className='relative flex 3xl:container 3xl:mx-auto'>
        <NavBar />
        <div className='flex-grow overflow-y-auto'>
          {children}
        </div>
      </div>
      {/* Home components */}
      <SendPackageForm />
      <Riders />
      {/* My Orders components */}
      <TrackingOrder />
      <PaymentSuccess />
    </>
  )
}

export default Layout