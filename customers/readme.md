Pickup
delivery
Bolt page

<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7879.135324468782!2d7.42080763493504!3d9.10308968519465!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf9e219dfb852070f!2sOkada%20NG%20Logistics!5e0!3m2!1sen!2sng!4v1672305334140!5m2!1sen!2sng" style={{ border: 0 }} className="w-full h-full" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

<input
  type="text" id='pickup'
  placeholder='Pickup location?'
  value={locationInput.pickup}
  onBlur={initialHeight}
  onFocus={() => increaseHeight('pickup')}
  onKeyUp={(e) => {
    increaseHeight('pickup')
    setLocationInput(prev => ({ ...prev, pickup: e.target.value }))
  }}
  onChange={(e) => setLocationInput(prev => ({ ...prev, pickup: e.target.value }))}
  className={`bg-customVeryLight pl-10 pr-4 py-2 rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
/>

{/*
  <div className={`${locationInput.pickup ? 'block' : 'hidden'} absolute top-[44px] left-0 w-full p-2 z-10 h-[175px] bg-white overflow-y-auto`}>
    <div className="flex flex-col gap-2">
      <div className="cursor-pointer border-b-1 border-veryLight flex gap-2 items-center">
        <img src={locationPin} alt="" />
        <div className="flex flex-col gap-1">
          <span className='font-semibold'>National Orthopedic Hospital</span>
          <small className="text-sm text-customLightGrey">1st Avenue, Gwarinpa</small>
        </div>
      </div>
      <div className="cursor-pointer border-b-1 border-veryLight flex gap-2 items-center">
        <img src={locationPin} alt="" />
        <div className="flex flex-col gap-1">
          <span className='font-semibold'>DBB Plaza</span>
          <small className="text-sm text-customLightGrey">1st Avenue, Gwarinpa</small>
        </div>
      </div>
      <div className="cursor-pointer border-b-1 border-veryLight flex gap-2 items-center">
        <img src={locationPin} alt="" />
        <div className="flex flex-col gap-1">
          <span className='font-semibold'>Perfect Trust</span>
          <small className="text-sm text-customLightGrey">1st Avenue, Gwarinpa</small>
        </div>
      </div>
    </div>
  </div> 
*/}

<input
  type="text" id='pickup'
  placeholder='Delivery location?'
  value={locationInput.destination}
  onBlur={initialHeight}
  onFocus={() => increaseHeight('destination')}
  onKeyUp={(e) => {
    increaseHeight('destination')
    setLocationInput(prev => ({ ...prev, destination: e.target.value }))
  }}
  onChange={(e) => setLocationInput(prev => ({ ...prev, destination: e.target.value }))}
  className={`bg-customVeryLight pl-10 pr-4 py-2 rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
/>

{/*
  <div className={`${locationInput.destination ? 'block' : 'hidden'} absolute top-[44px] left-0 w-full p-2 z-10 h-[175px] bg-white overflow-y-auto`}>
    <div className="flex flex-col gap-2">
      <div className="cursor-pointer border-b-1 border-veryLight flex gap-2 items-center">
        <img src={locationPin} alt="" />
        <div className="flex flex-col gap-1">
          <span className='font-semibold'>National Orthopedic Hospital</span>
          <small className="text-sm text-customLightGrey">1st Avenue, Gwarinpa</small>
        </div>
      </div>
      <div className="cursor-pointer border-b-1 border-veryLight flex gap-2 items-center">
        <img src={locationPin} alt="" />
        <div className="flex flex-col gap-1">
          <span className='font-semibold'>DBB Plaza</span>
          <small className="text-sm text-customLightGrey">1st Avenue, Gwarinpa</small>
        </div>
      </div>
      <div className="cursor-pointer border-b-1 border-veryLight flex gap-2 items-center">
        <img src={locationPin} alt="" />
        <div className="flex flex-col gap-1">
          <span className='font-semibold'>Perfect Trust</span>
          <small className="text-sm text-customLightGrey">1st Avenue, Gwarinpa</small>
        </div>
      </div>
    </div>
  </div> 
*/}

() => dispatch(changePackageFormWindow())
<button onClick={() => dispatch(changePackageFormWindow())} className="block py-2 block w-full rounded-md mx-auto bg-customBlue font-bold text-white text-center">
  <img src={sendPackage} alt="" className='inline-block mr-2' />Send a package
</button>

//Get user location
// const apiURL = import.meta.env.VITE_GET_LOCATION_URL
// const apiKey = import.meta.env.VITE_GET_LOCATION_KEY
// const getUserLocationFromAPI = async () => {
//   try {
//     const response = await axios.get(`${apiURL}api_key=${apiKey}`);
//     const { latitude, longitude } = response.data
//     center.lat = latitude
//     center.lng = longitude
//   } catch (error) {
//     console.log('Something went wrong getting Geolocation from API!')
//   }
// }
// useEffect(() => {
//   getUserLocationFromAPI()
// }, [])