import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverHandler, PopoverContent, Textarea } from "@material-tailwind/react";
import { changePackageSize, updateItemForm } from '../../features/sendPackage/sendPackageSlice'
import DocumentUploadIcon from '../../assets/svgs/image-upload.svg'
import ShoppingBag from '../../assets/svgs/shopping-bag.svg'
import questionMark from '../../assets/svgs/question-mark.svg'

function OrderForm1() {
  const [uploadText, setUploadText] = useState({
    item1: <div className='flex items-center gap-1 p-1 bg-white/80'>
      <img src={DocumentUploadIcon} alt="" className='w-[24px]' /> <span>Upload Item Image</span>
    </div>
  })
  const [bgImage, setBgImage] = useState('')

  const smallPackageRef = useRef()
  const mediumPackageRef = useRef()
  const heavyPackageRef = useRef()

  const {
    items: {
      item1: {
        packageSizeChoice: { small, medium, heavy },
        pickupAddress,
        deliveryAddress,
      },
    }
  } = useSelector(state => state.sendPackage)
  const dispatch = useDispatch()

  const uploadImageFunc = (image) => {
    let reformedImg = URL.createObjectURL(image)
    dispatch(updateItemForm({
      itemNo: 'item1', inputType: 'image', inputValue: reformedImg
    }))
    setBgImage(reformedImg)
  }

  return (
    <div className="mt-8 mx-auto p-2 bg-gray-100 rounded-xl shadow-lg sm:p-4 lg:w-[768px]">
      <div className='flex items-center gap-1'>
        <img src={ShoppingBag} alt="" />
        <span className="text-xl font-semibold sm:text-2xl">Select Package Size</span>
      </div>
      <div className="mt-6 flex gap-2 justify-center sm:gap-4">
        <div ref={smallPackageRef}
          onClick={() => dispatch(changePackageSize({ itemNo: 'item1', packageSize: 'small' }))}
          className={`packageSize ${small ? 'active' : ''} cursor-pointer w-[96px] h-[112px] rounded-lg p-2 bg-gray-300 shadow-md text-center flex flex-col gap-2 justify-around transition`}>
          <span className="font-bold">Small</span>
          <div className="w-full border-t border-customLightGrey"></div>
          <span className="text-sm">
            Item weight 10kg and below
          </span>
        </div>
        <div ref={mediumPackageRef}
          onClick={() => dispatch(changePackageSize({ itemNo: 'item1', packageSize: 'medium' }))}
          className={`packageSize ${medium ? 'active' : ''} cursor-pointer w-[96px] h-[112px] rounded-lg p-2 bg-gray-300 shadow-md text-center flex flex-col gap-2 justify-around transition`}>
          <span className="font-bold">Medium</span>
          <div className="w-full border-t border-customLightGrey"></div>
          <span className="text-sm">
            Item weight 25kg and below
          </span>
        </div>
        <div ref={heavyPackageRef}
          onClick={() => dispatch(changePackageSize({ itemNo: 'item1', packageSize: 'heavy' }))}
          className={`packageSize ${heavy ? 'active' : ''} cursor-pointer w-[96px] h-[112px] rounded-lg p-2 bg-gray-300 shadow-md text-center flex flex-col gap-2 justify-around transition`}>
          <span className="font-bold">Heavy</span>
          <div className="w-full border-t border-customLightGrey"></div>
          <span className="text-sm">
            Item weight 50kg and below
          </span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-y-4">
        <div className='px-2 flex flex-col w-full md:w-1/2'>
          <label htmlFor="pickup1">Pickup Address</label>
          <input type="text" id='pickup1'
            value={pickupAddress}
            className={`bg-transparent border border-customLightGrey p-2 rounded-lg font-semibold h-[40px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange disabled:border-green-500 disabled:bg-white disabled:text-sm`}
            readOnly
          />
        </div>
        <div className='px-2 flex flex-col w-full md:w-1/2'>
          <label htmlFor="delivery1">Delivery Address</label>
          <input type="text" id='delivery1'
            value={deliveryAddress}
            className={`bg-transparent border border-customLightGrey p-2 rounded-lg font-semibold h-[40px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange disabled:border-green-500 disabled:bg-white disabled:text-sm`}
            readOnly
          />
        </div>
        <div className='px-2 flex flex-col w-full md:w-1/2'>
          <div className="flex items-center gap-2">
            <label htmlFor="desc1">Additional Address <small className='text-sm font-light'>(optional)</small></label>
            <Popover>
              <PopoverHandler>
                <img src={questionMark} alt="" className='w-[20px] text-customGrey cursor-pointer' />
              </PopoverHandler>
              <PopoverContent className='z-50 bg-customBlue text-white'>
                You can specify your accurate address here, if you can't get the accurate address from the suggestion on the previous page.
              </PopoverContent>
            </Popover>
          </div>
          <Textarea label="Address" id='desc1'
            onChange={e => dispatch(updateItemForm({
              itemNo: 'item1', inputType: 'addAddress', inputValue: e.target.value
            }))} color='orange'
          />
        </div>
        <div className='px-2 flex flex-col w-full md:w-1/2'>
          <label htmlFor="desc1">Description of Item(s)</label>
          <Textarea label="Description" id='desc1'
            onChange={e => dispatch(updateItemForm({
              itemNo: 'item1', inputType: 'description', inputValue: e.target.value
            }))} color='orange'
          />
        </div>
        <div className='px-2 flex flex-col w-full md:w-1/2'>
          <label htmlFor="value1">Value of Item(s) in Naira</label>
          <input type="number" id='value1'
            onChange={e => dispatch(updateItemForm({
              itemNo: 'item1', inputType: 'value', inputValue: e.target.value
            }))}
            className={`bg-transparent border border-customLightGrey p-2 rounded-lg font-semibold h-[40px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`} />
        </div>
        <div className='px-2 flex flex-col w-full md:w-1/2'>
          <label htmlFor="tel1">Your Telephone Number</label>
          <input type="tel" id='tel1'
            onChange={e => dispatch(updateItemForm({
              itemNo: 'item1', inputType: 'tel', inputValue: e.target.value
            }))}
            className={`bg-transparent border border-customLightGrey p-2 rounded-lg font-semibold h-[40px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`} />
        </div>
        <div className='px-2 flex flex-col w-full md:w-1/2'>
          <label htmlFor="tel1">Your Alternative Telephone Number</label>
          <input type="tel" id='tel1'
            onChange={e => dispatch(updateItemForm({
              itemNo: 'item1', inputType: 'otherTel', inputValue: e.target.value
            }))}
            className={`bg-transparent border border-customLightGrey p-2 rounded-lg font-semibold h-[40px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`} />
        </div>
        <div className='relative px-2 flex flex-col w-full md:w-1/2'>
          <label
            htmlFor="image1"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
            className='bg-center bg-cover block rounded-lg cursor-pointer h-[150px] border-dashed border-2 border-customLightGrey flex items-center justify-center'>
            {uploadText.item1}
          </label>
          <input type="file" id="image1"
            accept="image/png, image/jpg, image/jpeg"
            onChange={e => uploadImageFunc(e.target.files[0])}
            className={`w-0 h-0`} />
        </div>
        <div className='px-2 flex flex-col w-full md:w-1/2'>
          <label htmlFor="recieverName1">Reciever Name</label>
          <input type="text" id='recieverName1'
            onChange={e => dispatch(updateItemForm({
              itemNo: 'item1', inputType: 'recieverName', inputValue: e.target.value
            }))}
            className={`bg-transparent border border-customLightGrey p-2 rounded-lg font-semibold h-[40px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`} />
        </div>
        <div className='px-2 flex flex-col w-full md:w-1/2'>
          <label htmlFor="recieverTel1">Reciever Telephone Number</label>
          <input type="tel" id='recieverTel1'
            onChange={e => dispatch(updateItemForm({
              itemNo: 'item1', inputType: 'recieverTel', inputValue: e.target.value
            }))}
            className={`bg-transparent border border-customLightGrey p-2 rounded-lg font-semibold h-[40px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`} />
        </div>
      </div>
      {/* <span className='mt-6 block text-sm'>Do you have an additional item at a different location to pick up?</span>
      <button className="font-semibold text-customBlue block rounded-lg">
        Click here to add it to your order.
      </button>
      <span className='text-sm text-customLightGrey'>You can send up to 3 items per order.</span> */}
    </div>
  )
}

export default OrderForm1