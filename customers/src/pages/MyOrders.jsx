import React from 'react'
import { useDispatch } from 'react-redux'
import { checkTrackPage } from '../features/trackPage/trackPageSlice'
import Layout from '../components/Layout/Layout'
import calculate from '../assets/images/calculate.png'

function MyOrders() {
  const dispatch = useDispatch()

  return (
    <Layout>
      <div className='animate__animated animate__fadeIn pt-8'>
        <h2 className='font-bold text-center text-2xl'>My Orders</h2>
        <div className="mt-4 flex items-center justify-center flex-wrap">
          <div
            onClick={() => dispatch(checkTrackPage())}
            className="p-2 mx-auto w-full sm:w-[300px]"
          >
            <div
              style={{ backgroundImage: 'linear-gradient(#000000b9, #000000b9), url("https://media.istockphoto.com/id/1167766111/photo/internet-shopping-online-purchases-e-commerce-and-express-package-door-to-door-delivery.jpg?s=612x612&w=0&k=20&c=Id2GFKBXz5_sRwel-EXGUKpVixfRUImp0yBVsLHnFo8=")' }}
              className='relative overflow-hidden cursor-pointer shadow-lg rounded-lg w-full h-[150px] p-2 bg-center bg-cover bg-no-repeat sm:w-[300px]'
            >
              <small className={`absolute top-0 left-0 text-white p-0.5 font-bold bg-green-700`}>Completed</small>
              <div className='flex flex-col space-y-2 pt-5 font-semibold'>
                <span className='text-white text-sm'>DB-BATURE ENTERPRISE Aleita Between...</span>
                <img src={calculate} alt="" className='w-[24px]' />
                <span className='text-white text-sm'>Grand Palazzo Hotel, 69 Road, Abuja, N..</span>
              </div>
              <small className="absolute bottom-1 right-1 text-white">22-09-2022</small>
            </div>
          </div>
          <div
            onClick={() => dispatch(checkTrackPage())}
            className="p-2 mx-auto w-full sm:w-[300px]"
          >
            <div
              style={{ backgroundImage: 'linear-gradient(#000000b9, #000000b9), url("https://media.istockphoto.com/id/1167766111/photo/internet-shopping-online-purchases-e-commerce-and-express-package-door-to-door-delivery.jpg?s=612x612&w=0&k=20&c=Id2GFKBXz5_sRwel-EXGUKpVixfRUImp0yBVsLHnFo8=")' }}
              className='relative overflow-hidden cursor-pointer shadow-lg rounded-lg w-full h-[150px] p-2 bg-center bg-cover bg-no-repeat sm:w-[300px]'
            >
              <small className={`absolute top-0 left-0 text-white p-0.5 font-bold bg-green-700`}>Completed</small>
              <div className='flex flex-col space-y-2 pt-5 font-semibold'>
                <span className='text-white text-sm'>DB-BATURE ENTERPRISE Aleita Between...</span>
                <img src={calculate} alt="" className='w-[24px]' />
                <span className='text-white text-sm'>Grand Palazzo Hotel, 69 Road, Abuja, N..</span>
              </div>
              <small className="absolute bottom-1 right-1 text-white">22-09-2022</small>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyOrders