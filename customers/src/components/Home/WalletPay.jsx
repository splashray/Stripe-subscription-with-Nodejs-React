import React from 'react'
import { useSelector } from 'react-redux'
import { priceToNaira } from '../../utils/priceCalc'
import Swal from 'sweetalert2'
import ArrowBack from '../../assets/svgs/arrow-back.svg'

function WalletPay({ closeWindow, success }) {
  const { items: { item1: { price } } } = useSelector(state => state.sendPackage)

  const inputPIN = async () => {

    const { value: password } = await Swal.fire({
      text: 'Enter your Wallet 4-digit PIN',
      input: 'number',
      inputLabel: 'Input PIN',
      inputPlaceholder: 'Enter your PIN',
      inputValidator: result => (result.length < 4 || result.length > 4) && 'You need to input a 4-digit PIN!',
      confirmButtonText: 'Pay now',
      confirmButtonColor: '#3E4095',
      showLoaderOnConfirm: true,
      preConfirm: async (pin) => {
        try {
          const response = await fetch(`//api.github.com/users/${pin}`)
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return await response.json()
        } catch (error) {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        closeWindow('null')
        success()
      }
    })
  }

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
          <span className="text-customBlue font-semibold flex-grow text-center">Wallet Payment</span>
        </div>
        <div className="mx-auto rounded-xl lg:w-[768px]">
          <div className="flex flex-col gap-4 p-2 bg-customOrange">
            <div className="flex items-center gap-4">
              <span className="text-white text-sm font-semibold w-[120px]">Wallet Balance:</span>
              <span className="text-white font-bold inline-block">NGN 25,066.89</span>
            </div>
            <div className="border-t border-dashed border-black"></div>
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold text-sm w-[120px]">Price to pay:</span>
              <span className="text-white font-bold inline-block">{priceToNaira(price)}</span>
            </div>
          </div>
          <div className="mt-10 px-2">
            <button
              onClick={inputPIN}
              className='bg-customBlue rounded-lg p-2 w-full font-bold text-white text-center'>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default WalletPay