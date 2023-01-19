import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkTrackPage } from '../../features/trackPage/trackPageSlice'
import ArrowBack from '../../assets/svgs/arrow-back.svg'
import trackingIcon from '../../assets/svgs/tracking-icon.svg'
import checkBox from '../../assets/svgs/checkbox.svg'
import activeCheck from '../../assets/svgs/active-check.svg'
import inActiveCheck from '../../assets/svgs/in-active-check.svg'

function TrackingOrder() {

  const { trackPage } = useSelector(state => state.trackPage)
  const dispatch = useDispatch()

  return (
    <div className={`${trackPage} fixed top-0 left-0 pb-32 overflow-y-auto w-screen h-screen z-20 animate__animated animate__slideInRight bg-white lg:pb-8`}>
      <div className="px-2 py-4 flex justify-center w-full items-center shadow-lg">
        <img
          onClick={() => dispatch(checkTrackPage())}
          src={ArrowBack}
          className="cursor-pointer flex-shrink justify-self-start"
        />
        <span className="text-customBlue font-semibold flex-grow text-center">Track Order</span>
      </div>

      <div className='h-[50vh] bg-customVeryLight'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7879.135324468782!2d7.42080763493504!3d9.10308968519465!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf9e219dfb852070f!2sOkada%20NG%20Logistics!5e0!3m2!1sen!2sng!4v1672305334140!5m2!1sen!2sng" style={{ border: 0 }} className="w-full h-full" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div className='py-4 pb-8 px-2 lg:px-4'>
        <span className="font-semibold text-xl">Tracking number</span>
        <div className='text-xl flex items-center gap-2 mt-2'>
          <img src={trackingIcon} alt="" />
          <small className='text-customOrange'>AW-8433-0547-2298</small>
        </div>
        <div className='mt-4'>
          <span className='text-customLightGrey font-semibold'>Package Status</span>
          <div className="mt-4 flex flex-col gap-2">
            <div className="relative flex items-start gap-2">
              <img src={checkBox} alt="" className='relative z-50' />
              <div className="flex flex-col gap-2">
                <span className="text-customLightGrey">Rider requested</span>
                <small className="text-sm font-light text-customOrange">
                  December 23 2022 08:00am
                </small>
              </div>
              <div className="absolute h-[48px] z-10 w-[1px] bg-customBlue top-[13px] left-[6px]"></div>
            </div>
            <div className="relative flex items-start gap-2">
              <img src={checkBox} alt="" className='relative z-50' />
              <div className="flex flex-col gap-2">
                <span className="text-customLightGrey">Rider arrive at pickup</span>
                <small className="text-sm font-light text-customOrange">
                  December 23 2022 08:00am
                </small>
              </div>
              <div className="absolute h-[48px] z-10 w-[1px] bg-customBlue top-[13px] left-[6px]"></div>
            </div>
            <div className="relative flex items-start gap-2">
              <img src={activeCheck} alt="" className='relative z-50' />
              <div className="flex flex-col gap-2">
                <span className="text-customBlue">Package in transit</span>
                <small className="text-sm font-light text-customOrange">
                  December 23 2022 08:00am
                </small>
              </div>
              <div className="absolute h-[48px] z-10 w-[1px] bg-customBlue top-[13px] left-[6px]"></div>
            </div>
            <div className="relative flex items-start gap-2">
              <img src={inActiveCheck} alt="" />
              <div className="flex flex-col gap-2">
                <span className="text-customLightGrey">Package delivered</span>
                <small className="text-sm font-light text-customOrange">
                  December 23 2022 08:00am
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackingOrder