import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';
import { changePackageFormWindow, updatePrice } from '../../features/sendPackage/sendPackageSlice'
import { changeRiderWindow } from '../../features/sendPackage/chooseRiderSlice'
import { calculatePrice, nairaToNumber } from '../../utils/priceCalc';
import TempOrder from './TempOrder';
import OrderForm1 from './OrderForm1';
import 'animate.css'
import ArrowBack from '../../assets/svgs/arrow-back.svg'
import fillForm from '../../assets/images/fill-form.png'
import questionMark from '../../assets/svgs/question-mark.svg'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function SendPackageForm() {
  const [priceinNaira, setPriceinNaira] = useState('')

  const {
    packageForm,
    items: { item1 },
    items: { item1: {
      metrics: { distance },
      pickupAddress,
      deliveryAddress,
      description,
      value,
      tel,
      otherTel,
      recieverName,
      recieverTel,
    } }
  } = useSelector(state => state.sendPackage)
  const dispatch = useDispatch()

  useEffect(() => {
    if (packageForm === 'block') {
      setPriceinNaira(calculatePrice(distance))
      dispatch(updatePrice({ itemNo: 'item1', price: nairaToNumber(calculatePrice(distance)) }))
    }
  }, [packageForm]);

  return (
    <>
      <div className={`${packageForm} overflow-y-auto pb-32 z-50 animate__animated animate__slideInUp fixed top-0 left-0 h-screen w-screen bg-white`}>
        <div className="sticky z-10 top-0 left-0 bg-white px-2 py-4 flex justify-center w-full items-center shadow-lg">
          <img onClick={() => dispatch(changePackageFormWindow())} src={ArrowBack} className="cursor-pointer flex-shrink justify-self-start" />
          <span className="text-customBlue font-semibold flex-grow text-center">Send Package</span>
        </div>

        <div className="mt-8 mx-auto px-4 sm:px-4 lg:w-[768px]">
          <div className='flex items-center justify-center gap-2'>
            <div className="border-t-2 border-dashed border-customLightGrey flex-grow"></div>
            <div className='flex items-center justify-center gap-1'>
              <img src={fillForm} alt="" className='w-[24px]' />
              <span className="text-xl font-semibold sm:text-2xl">Kindly fill the form below</span>
            </div>
            <div className="border-t-2 border-dashed border-customLightGrey flex-grow"></div>
          </div>
        </div>

        <OrderForm1 />

        <div className='mt-4 mx-auto px-2 lg:w-[768px]'>
          <div className="mb-6 p-2 bg-customOrange shadow-lg rounded-lg flex gap-4">
            <span className="text-xl font-bold text-white">
              <Popover>
                <PopoverHandler>
                  <img src={questionMark} alt="" className='notification-icon inline-block -mt-1 mr-1 w-[20px] text-customGrey cursor-pointer' />
                </PopoverHandler>
                <PopoverContent className='z-50 bg-customBlue'>
                  <div>
                    <span className="block font-bold text-white">How we calculate your price:</span>
                    <small className="text-sm text-white block">- For orders less than 1km the fixed price is NGN 500.</small>
                    <small className="text-sm text-white block">- For orders between 1km to 20km the price is NGN 100 per km.</small>
                    <small className="text-sm text-white block">- For orders above 20km you will enjoy a discount.</small>
                  </div>
                </PopoverContent>
              </Popover>
              Price:
            </span>
            <div className="flex flex-col gap-1">
              <i className="text-white text-sm">Distance: {distance}</i>
              <span className="text-white font-semibold text-sm">Amount:
                <b className='ml-1 inline-block text-white text-lg'>{priceinNaira}</b>
              </span>
            </div>
          </div>
          <button
            className="bg-customBlue rounded-lg p-2 w-full font-bold text-white text-center"
            onClick={() => {
              const itemInputs = [pickupAddress, deliveryAddress, description, value, tel, otherTel, recieverName, recieverTel,]
              if (itemInputs.every(v => v !== '')) {
                console.log(item1)
                dispatch(changeRiderWindow())
              } else {
                MySwal.fire({
                  title: <p className='text-sm'>Input all the required fields.</p>,
                  icon: 'error',
                })
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  )
}

export default SendPackageForm