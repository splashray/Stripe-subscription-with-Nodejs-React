import React from 'react'

export function ButtonLoader() {
  return (
    <div className="lds-dual-ring after:w-[20px] after:h-[20px]"></div>
  )
}

function LoadingBackdrop() {
  return (
    <div className='cursor-not-allowed z-[999] bg-gray-200/50 w-screen h-screen fixed top-0 left-0'></div>
  )
}

export default LoadingBackdrop