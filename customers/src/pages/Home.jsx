import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changePackageFormWindow, updateItemForm, updateItemMetrics } from '../features/sendPackage/sendPackageSlice'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import Layout from '../components/Layout/Layout'
import { Skeleton } from '@mui/material'
import sendPackage from '../assets/svgs/send-package.svg'
import searchIcon from '../assets/svgs/search.svg'
import loadingLocation from '../assets/svgs/loading-address-icon.svg'
import reCenter from '../assets/images/minimize-arrows.png'
import clear from '../assets/images/clear.png'
import locationPin from '../assets/svgs/location-pin.svg'
import calculate from '../assets/images/calculate.png'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const center = { lat: 9.0765, lng: 7.3986 }
const bounds = {
  north: center.lat + 0.5,
  south: center.lat - 0.5,
  east: center.lng + 0.5,
  west: center.lng - 0.5,
};
const restrictions = {
  country: 'ng',
}
const options = {
  strictBounds: true,
};
const libraries = ['places'];

function Home() {
  //Google map setup
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY || 'AIzaSyB5ne_jZBOBXesxk29n_Q-V7itCPltC56I',
    libraries: libraries,
  })

  //Map usestates
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionResponse, setDirectionResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const pickupRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const deliveryRef = useRef()

  const [addressHeight, setAddressHeight] = useState({ mobile: '25vh', desktop: '30vh' })
  const [locationInput, setLocationInput] = useState({ pickup: '', destination: '' })
  const [inputAppend, setInputAppend] = useState({
    pickupSuffix: <img src={loadingLocation} className='h-[15px] w-[15px] absolute bottom-4 right-2' />,
    deliverySuffix: <img src={loadingLocation} className='h-[15px] w-[15px] absolute bottom-4 right-2' />
  })
  const [nextBtn, setNextBtn] = useState(<button onClick={calculateRoute} className="block py-2 w-full rounded-md mx-auto bg-customBlue font-bold text-white text-center">
    <img src={calculate} alt="" className='inline-block mr-2' />Calculate Route
  </button>)

  async function calculateRoute() {
    setDirectionResponse(null)
    setDistance('')
    setDuration('')

    if (pickupRef.current.value === '' && deliveryRef.current.value === '') {
      MySwal.fire({
        title: <p className='text-sm'>Pickup and Delivery location is required.</p>,
        icon: 'error',
      })
      return
    }

    if (pickupRef.current.value === '' || deliveryRef.current.value === '') {
      if (pickupRef.current.value === '') {
        MySwal.fire({
          title: <p className='text-sm'>Pickup location is required.</p>,
          icon: 'error',
        })
      } else {
        MySwal.fire({
          title: <p className='text-sm'>Delivery location is required.</p>,
          icon: 'error',
        })
      }
      return
    }
    try {
      const directionService = new google.maps.DirectionsService
      const results = await directionService.route({
        origin: pickupRef.current.value,
        destination: deliveryRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING
      })
      setDirectionResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
      setNextBtn(
        <button
          onClick={() => {
            dispatch(changePackageFormWindow())
            dispatch(updateItemMetrics({
              itemNo: 'item1',
              distance: results.routes[0].legs[0].distance.text,
              duration: results.routes[0].legs[0].duration.text
            }))
            dispatch(updateItemForm({ itemNo: 'item1', inputType: 'pickup', inputValue: pickupRef.current.value }))
            dispatch(updateItemForm({ itemNo: 'item1', inputType: 'delivery', inputValue: deliveryRef.current.value }))
          }}
          className="block py-2 w-full rounded-md mx-auto bg-customBlue font-bold text-white text-center"
        >
          <img src={sendPackage} alt="" className='inline-block mr-2' />Send a package
        </button>
      )
    } catch (e) {
      MySwal.fire({
        title: <p className='text-sm'>We are unable to calculate your route.</p>,
        icon: 'error',
      }).then(() => {
        return MySwal.fire({
          title: <p className='text-sm'>You can use the suggestion while typing to get your nearest address</p>,
          icon: 'info'
        })
      })
    }
  }

  function clearRoute() {
    setDirectionResponse(null)
    setDistance('')
    setDuration('')
    pickupRef.current.value = ''
    deliveryRef.current.value = ''
  }

  const mainScreen = useRef()

  // const navigate = useNavigate()
  const dispatch = useDispatch()

  const increaseHeight = (inputType) => {
    switch (inputType) {
      case 'pickup':
        if (locationInput.pickup) {
          setAddressHeight(prevState => ({ ...prevState, mobile: '40vh', desktop: '45vh' }))
          setInputAppend(prevState => ({
            ...prevState,
            pickupSuffix: <img src={clear} onClick={() => {
              pickupRef.current.value = ''
              setLocationInput(prevState => ({ ...prevState, pickup: '' }))
              setNextBtn(
                <button onClick={calculateRoute} className="block py-2 w-full rounded-md mx-auto bg-customBlue font-bold text-white text-center">
                  <img src={calculate} alt="" className='inline-block mr-2' />Calculate Route
                </button>
              )
            }}
              className='cursor-pointer h-[25px] w-[25px] z-10 absolute bottom-2 right-2' />
          }))
        } else {
          initialHeight()
          setInputAppend(prevState => ({
            ...prevState,
            pickupSuffix: <img src={loadingLocation} className='h-[15px] w-[15px] absolute bottom-4 right-2' />
          }))
        }
        break;
      case 'destination':
        if (locationInput.destination) {
          setAddressHeight(prevState => ({ ...prevState, mobile: '40vh', desktop: '45vh' }))
          setInputAppend(prevState => ({
            ...prevState,
            deliverySuffix: <img src={clear} onClick={() => {
              deliveryRef.current.value = ''
              setLocationInput(prevState => ({ ...prevState, destination: '' }))
              setNextBtn(<button onClick={calculateRoute} className="py-2 block w-full rounded-md mx-auto bg-customBlue font-bold text-white text-center">
                <img src={calculate} alt="" className='inline-block mr-2' />Calculate Route
              </button>)
            }}
              className='h-[25px] w-[25px] absolute bottom-2 right-2' />
          }))
        } else {
          initialHeight()
          setInputAppend(prevState => ({
            ...prevState,
            deliverySuffix: <img src={loadingLocation} className='h-[15px] w-[15px] absolute bottom-4 right-2' />
          }))
        }
        break;

      default:
        break;
    }
  }
  useEffect(() => {
    isLoaded && mainScreen.current.scrollIntoView()
  }, [addressHeight])

  const initialHeight = () => {
    setAddressHeight(prevState => ({ ...prevState, mobile: '25vh', desktop: '30vh' }))
  }

  return (
    <Layout>
      {
        !isLoaded ?
          <Skeleton animation={"wave"} height={'50vh'} />
          :
          <div className='bg-customVeryLight animate__animated animate__fadeIn lg:h-screen'>
            <div className='relative h-[60vh] lg:h-[70vh]'>
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false
                }}
                onLoad={(map) => setMap(map)}
              >
                <Marker
                  icon={{
                    url: `${locationPin}`,
                    anchor: new google.maps.Point(17, 46),
                    scaledSize: new google.maps.Size(20, 20)
                  }}
                  position={center}
                  title="Abuja"
                />
                {directionResponse && <DirectionsRenderer directions={directionResponse} />}
              </GoogleMap>
              <div className='cursor-pointer absolute z-10 top-0 left-0 p-2 bg-white/70 w-full flex items-center justify-around text-sm'>
                <span>Distance: <span className="font-semibold text-customBlue">{distance ? distance : '0 km'}</span></span>
                <span>Duration: <span className="font-semibold text-customBlue">{duration ? duration : '0 mins'}</span></span>
              </div>
              <img
                onClick={() => map.panTo(center)}
                src={reCenter}
                className='cursor-pointer absolute z-10 bottom-2 right-2 p-2 bg-customBlue'
              />
            </div>
            <div className={`transition duration-300 flex flex-col gap-4 shadow-3xl bg-white rounded-t-3xl px-4 pt-4 h-[${addressHeight.mobile}] sm:px-4 lg:h-[${addressHeight.desktop}]`}>
              <div className='relative flex flex-col gap-2'>
                <Autocomplete className='w-full'
                  bounds={bounds}
                  restrictions={restrictions}
                  options={options}
                >
                  <input
                    type="text" id='pickup'
                    placeholder='Pickup location?'
                    ref={pickupRef}
                    onBlur={initialHeight}
                    onFocus={() => increaseHeight('pickup')}
                    onKeyUp={(e) => {
                      increaseHeight('pickup')
                      setLocationInput(prev => ({ ...prev, pickup: e.target.value }))
                    }}
                    onChange={(e) => {
                      setLocationInput(prev => ({ ...prev, pickup: e.target.value }))
                      setNextBtn(<button onClick={calculateRoute} className="block py-2 w-full rounded-md mx-auto bg-customBlue font-bold text-white text-center">
                        <img src={calculate} alt="" className='inline-block mr-2' />Calculate Route
                      </button>)
                    }}
                    className={`bg-customVeryLight w-full pl-10 pr-8 py-2 rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
                  />
                </Autocomplete>
                {/* Absolutes/ */}
                <img src={searchIcon} className='h-[25px] w-[25px] cursor-pointer pt-2 absolute bottom-3 left-2' />
                {inputAppend.pickupSuffix}
              </div>
              <div className='relative flex flex-col gap-2'>
                <Autocomplete className='w-full'
                  bounds={bounds}
                  restrictions={restrictions}
                  options={options}
                >
                  <input
                    type="text" id='delivery'
                    placeholder='Delivery location?'
                    ref={deliveryRef}
                    onBlur={initialHeight}
                    onFocus={() => increaseHeight('destination')}
                    onKeyUp={(e) => {
                      increaseHeight('destination')
                      setLocationInput(prev => ({ ...prev, destination: e.target.value }))
                    }}
                    onChange={(e) => {
                      setLocationInput(prev => ({ ...prev, destination: e.target.value }))
                      setNextBtn(<button onClick={calculateRoute} className="block py-2 w-full rounded-md mx-auto bg-customBlue font-bold text-white text-center">
                        <img src={calculate} alt="" className='inline-block mr-2' />Calculate Route
                      </button>)
                    }}
                    className={`bg-customVeryLight w-full pl-10 pr-8 py-2 rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
                  />
                </Autocomplete>
                {/* Absolutes */}
                <img src={searchIcon} className='h-[25px] w-[25px] cursor-pointer pt-2 absolute bottom-3 left-2' />
                {inputAppend.deliverySuffix}
              </div>
              {nextBtn}
            </div>
            <div ref={mainScreen}></div>
          </div>}
    </Layout>
  )
}

export default Home