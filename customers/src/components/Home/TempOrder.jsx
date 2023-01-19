import React from 'react'
import { useSelector } from 'react-redux'
import phone from '../../assets/images/phone-call.png'
import whatsapp from '../../assets/images/whatsapp.png'

function TempOrder() {
  const name = JSON.parse(localStorage.getItem("customer")).name

  const {
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
      additionalAddress,
      price
    } }
  } = useSelector(state => state.sendPackage)

  return (
    <div className={`overflow-y-auto pb-32 z-[55] bg-white rounded-t-3xl`}>
      <div className="mt-8 mx-auto px-4 sm:px-4 lg:w-[768px]">
        <h2 className="text-xl font-bold text-center text-customBlue mb-8">Select mode to Order</h2>
        <div className="flex flex-col gap-10 items-center justify-center">
          <a href="tel:+2349164790000" target={'_blank'} className="relative block w-full p-2 rounded-xl bg-customBlue font-semibold">
            <span className='text-white'>Call to order</span>
            <img src={phone} className="absolute -top-3 -right-2 p-4 bg-customBlue w-[60px] h-[60px] rounded-full" />
          </a>
          <a
            href={`https://wa.me/+2349164790000?text=[Distance: ${distance}, Price: NGN${price}]: My name is ${name} and I want to order for a rider to pick up my *item: ${description} worth NGN${value} at ${pickupAddress} and deliver it to ${deliveryAddress}, my telephone number is ${tel} and my alternative number is ${otherTel}. The recipient name is ${recieverName} and phone number is ${recieverTel}*. Additional address is ${additionalAddress || 'Not given'}.`}
            target={'_blank'} className="relative block w-full p-2 rounded-xl bg-green-500 font-semibold">
            <span className='text-white'>Order via whatsapp</span>
            <img src={whatsapp} className="absolute -top-3 -right-2 p-4 bg-green-500 w-[60px] h-[60px] rounded-full" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default TempOrder