import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Radio } from "@material-tailwind/react";
import { priceToNaira } from '../../utils/priceCalc';
import WalletPay from './WalletPay';
import CardPay from './CardPay';
import CashPay from './CashPay';
import 'animate.css'

function PaymentMethod({ show, showToggle, paymentSuccess }) {
  const [payOption, setPayOption] = useState('wallet')
  const [paymentPage, setPaymentPage] = useState('')

  const { items: { item1: { price } } } = useSelector(state => state.sendPackage)

  const walletRef = useRef()
  const cardRef = useRef()
  const cashRef = useRef()

  const paymentPageFunc = (payParam) => {
    switch (payParam) {
      case 'wallet':
        setPaymentPage(<WalletPay closeWindow={paymentPageFunc} success={() => paymentSuccess()} />)
        break;
      case 'card':
        setPaymentPage(<CardPay closeWindow={paymentPageFunc} success={() => paymentSuccess()} />)
        break;
      case 'cash':
        setPaymentPage(<CashPay closeWindow={paymentPageFunc} success={(param) => paymentSuccess(param)} />)
        break;


      case 'null':
        setPaymentPage('')
        break;

      default:
        break;
    }
  }

  return (
    <>
      <div onClick={showToggle} className={`${show} cursor-pointer fixed z-20 top-0 left-0 w-screen h-screen bg-customGrey/50`}></div>

      <>
        <div className={`${show} animate__animated animate__slideInUp fixed z-30 bottom-0 left-0 w-screen h-[60vh] bg-white rounded-t-2xl`}>
          <div className="mx-auto p-2 rounded-xl sm:p-4 lg:w-[768px]">
            <div className="mt-2 mb-6 p-2 pl-4 bg-customOrange rounded-lg flex items-center gap-2">
              <span className='text-white font-semibold'>Price:</span>
              <span className="text-xl text-white font-bold">{priceToNaira(price)}</span>
            </div>
            <h2 className="text-xl font-bold">Choose payment method:</h2>
            <div className="flex flex-col">
              <Radio inputRef={walletRef}
                id='wallet' name='payment' color="blue" label='Pay using Okada ng wallet'
                onChange={() => walletRef.current.checked && setPayOption('wallet')}
                defaultChecked
              />
              <Radio inputRef={cardRef}
                id='card' name='payment' color="blue" label='Pay with card'
                onChange={() => cardRef.current.checked && setPayOption('card')}
              />
              <Radio inputRef={cashRef}
                id='cash' name='payment' color="blue" label='Pay with cash on delivery'
                onChange={() => cashRef.current.checked && setPayOption('cash')}
              />
            </div>
            <button
              onClick={() => paymentPageFunc(payOption)}
              className='mt-4 bg-customBlue rounded-lg p-2 w-full font-bold text-white text-center'>
              Continue payment
            </button>
          </div>
        </div>

        {paymentPage}
      </>
    </>
  )
}

export default PaymentMethod