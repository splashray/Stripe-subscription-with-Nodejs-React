import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkTrackPage } from '../../features/trackPage/trackPageSlice'
import { priceToNaira } from '../../utils/priceCalc'
import ArrowBack from '../../assets/svgs/arrow-back.svg'

function CashPay({ closeWindow, success }) {
  const { items: { item1: { price } } } = useSelector(state => state.sendPackage)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  return (
    <>
      <div
        onClick={() => closeWindow('null')}
        className={`cursor-pointer fixed z-[35] top-0 left-0 w-screen h-screen bg-customGrey/50`}
      >
      </div>

      <div className={`animate__animated animate__slideInLeft fixed z-40 bottom-0 overflow-hidden left-0 w-screen h-[60vh] bg-white rounded-t-2xl`}>
        <div className="sticky top-0 left-0 z-10 bg-white px-2 py-4 flex justify-center w-full items-center shadow-lg">
          <img
            onClick={() => closeWindow('null')}
            src={ArrowBack} className="cursor-pointer flex-shrink justify-self-start"
          />
          <span className="text-customBlue font-semibold flex-grow text-center">Card Payment</span>
        </div>
        <div className="mx-auto rounded-xl lg:w-[768px]">
          <div className="flex flex-col gap-4 p-2 bg-customOrange">
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold text-sm w-[120px]">Price to pay:</span>
              <span className="text-white font-bold inline-block">{priceToNaira(price)}</span>
            </div>
          </div>
          <span className="my-3 block p-2 bg-customBlue/50 text-sm font-semibold">The rider will be informed to collect cash at the destination point</span>
          <div className="mt-10 px-2">
            <button
              onClick={() => {
                navigate("/my-orders")
                success('cash')
                setTimeout(() => {
                  dispatch(checkTrackPage())
                }, 200);
              }}
              className='bg-customBlue rounded-lg p-2 w-full font-bold text-white text-center'>
              Continue order
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CashPay