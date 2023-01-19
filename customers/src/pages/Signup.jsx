import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import LoadingBackdrop, { ButtonLoader } from '../utils/LoadingBackdrop'
import googleMini from '../assets/svgs/google-mini-icon.svg'
import facebookMini from '../assets/svgs/facebook-mini-icon.svg'

const MySwal = withReactContent(Swal)

const Signup = () => {
  const eye = <EyeIcon onClick={showPwdFunc} className='h-[44px] cursor-pointer text-customBlue w-6 absolute bottom-0.5 right-2' />
  const eyeSlash = <EyeSlashIcon onClick={showPwdFunc} className='h-[44px] cursor-pointer text-customBlue w-6 absolute bottom-0.5 right-2' />

  const [showPwd, setShowPwd] = useState(eye)
  const [signupData, setSignupData] = useState({
    "api_key": import.meta.env.VITE_BASE_API_KEY,
    "role": "customer",
    "call": "Web-Register",
    "action": "Start-Register",
    "country": "Nigeria",
    "fname": '',
    "phone": '',
    "email": '',
    "address": 'undefined',
    "password": ''
  })
  const [inputAlert, setInputAlert] = useState({
    fname: '',
    fnameState: false,
    phone: '',
    phoneState: false,
    mail: '',
    mailState: false,
    pwd: '',
    pwdState: false,
  })
  const [signupBtnState, setSignupBtnState] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const pwdRef = useRef()
  const tAndCRef = useRef()

  function showPwdFunc() {
    if (pwdRef.current.type === 'password') {
      pwdRef.current.type = 'text'
      setShowPwd(eyeSlash)
    } else {
      pwdRef.current.type = 'password'
      setShowPwd(eye)
    }
  }

  function validateForm(params, value) {
    switch (params) {
      case 'fname':
        if (value.length < 2) {
          setInputAlert(prevState => ({ ...prevState, fname: 'border-2 border-red-500', fnameState: false }))
        } else {
          setInputAlert(prevState => ({ ...prevState, fname: '', fnameState: true }))
        }

        setSignupData(prevState => ({ ...prevState, fname: value }))
        break;
      case 'phone':
        if (value.length < 8) {
          setInputAlert(prevState => ({ ...prevState, phone: 'border-2 border-red-500', phoneState: false }))
        } else {
          setInputAlert(prevState => ({ ...prevState, phone: '', phoneState: true }))
        }

        setSignupData(prevState => ({ ...prevState, phone: value }))
        break;
      case 'mail':
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setInputAlert(prevState => ({ ...prevState, mail: '', mailState: true }))
        } else {
          setInputAlert(prevState => ({ ...prevState, mail: 'border-2 border-red-500', mailState: false }))
        }

        setSignupData(prevState => ({ ...prevState, email: value }))
        break;
      case 'address':
        setSignupData(prevState => ({ ...prevState, address: value }))
        break;
      case 'pwd':
        if (value.length < 8) {
          setInputAlert(prevState => ({ ...prevState, pwd: 'border-2 border-red-500', pwdState: false }))
        } else {
          setInputAlert(prevState => ({ ...prevState, pwd: '', pwdState: true }))
        }

        setSignupData(prevState => ({ ...prevState, password: value }))
        break;

      //Hack to call useEffect below if T and C is checked
      default:
        setSignupData(prevState => ({ ...prevState }))
        break;
    }
  }

  useEffect(() => {
    let inputStates = [inputAlert.fnameState, inputAlert.phoneState, inputAlert.mailState, inputAlert.pwdState]
    const formTrue = inputStates.every(value => value === true)
    if (formTrue && tAndCRef.current.checked) {
      setSignupBtnState(false)
    } else {
      setSignupBtnState(true)
    }
  }, [signupData]);

  const navigate = useNavigate()

  function signUpUserFunc() {
    setIsLoading(true)
    var data = JSON.stringify(signupData);
    // console.log(signupData)

    var config = {
      method: 'post',
      url: `${import.meta.env.VITE_BASE_LINK}entry-point-web.php`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        let email = response.data.split("-")[2]
        if (email) {
          setIsLoading(false)
          MySwal.fire({
            title: <div className='text-sm flex flex-col gap-2 items-center justify-center'>
              <p>Your account has been created successfully</p>
              <p className='font-light'>We've sent a 4 digit code to your email to verify your account</p>
            </div>,
            icon: 'success',
            allowEscapeKey: false,
            allowOutsideClick: false,
            confirmButtonText: 'Continue',
            confirmButtonColor: '#3E4095',
            showLoaderOnConfirm: true,
            preConfirm: async () => navigate(`/verify?authorize=${email}`)
          })
        } else {
          setIsLoading(false)
          MySwal.fire({
            title: <p className='text-sm'>{response.data}</p>,
            icon: 'error',
          })
        }
      })
      .catch(function (error) {
        setIsLoading(false)
        MySwal.fire({
          title: <p className='text-sm'>Error creating account</p>,
          icon: 'error',
        })
      });
  }

  return (
    <div className='relative animate__animated animate__fadeIn px-2 py-4 mx-auto sm:w-[500px] md:px-4'>
      <div>
        <h2 className="font-bold text-2xl text-customBlue">Create Account</h2>
        <span className="mt-2 text-customGrey font-semibold text-sm sm:text-base">Complete the sign up process to get started</span>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <div className='flex flex-col gap-2'>
          <label htmlFor="fname">Full Name</label>
          <input
            type="text" id='fname'
            placeholder='John Doe'
            onKeyUp={(e) => validateForm('fname', e.target.value)}
            className={`bg-customVeryLight ${inputAlert.fname} px-4 py-2 rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel" id='phone'
            placeholder='+2349000000000'
            onKeyUp={(e) => validateForm('phone', e.target.value)}
            className={`bg-customVeryLight ${inputAlert.phone} px-4 py-2 rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="mail">Email Address</label>
          <input
            type="email" id='mail'
            placeholder='*****@mail.com'
            onKeyUp={(e) => validateForm('mail', e.target.value)}
            className={`bg-customVeryLight ${inputAlert.mail} px-4 py-2 rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="address">Your Address <small>(optional)</small></label>
          <input
            type="text" id='address'
            placeholder='Wuse II' autoComplete='off'
            onKeyUp={(e) => validateForm('address', e.target.value)}
            className={`bg-customVeryLight ${inputAlert.mail} px-4 py-2 rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
          />
        </div>
        <div className='pwd relative flex flex-col gap-2'>
          <label htmlFor="pwd">Password</label>
          <small className='text-sm text-customOrange'>Your password must have at least 8 characters.</small>
          <input ref={pwdRef}
            type="password" id='pwd'
            placeholder='********'
            onKeyUp={(e) => validateForm('pwd', e.target.value)}
            className={`bg-customVeryLight pl-4 pr-10 py-2 ${inputAlert.pwd} rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
          />
          {showPwd}
        </div>
        <div className='flex gap-2'>
          <input ref={tAndCRef}
            type="checkbox"
            onChange={validateForm}
            className='cursor-pointer self-start text-customBlue w-8'
          />
          <small className="text-sm text-center">
            By ticking this box, you agree to our <Link to="" className="text-customOrange">Terms and conditions and our privacy policy</Link>
          </small>
        </div>
        <div className="mt-4 w-full">
          <button
            disabled={signupBtnState}
            onClick={signUpUserFunc}
            className='flex items-center gap-2 justify-center transition duration-500 font-bold text-xl bg-customBlue rounded-md w-full py-2 text-white disabled:bg-customLightGrey disabled:cursor-not-allowed'
          >
            Sign Up {isLoading && <ButtonLoader />}
          </button>
          <div className='mt-2 text-center'>
            <small className="text-base text-center text-customLightGrey">Already have an account?</small>
            <Link to="/login" className='font-bold text-customBlue'> Log in</Link>
          </div>
        </div>
        <div className="mt-4 flex items-center flex-col gap-2">
          <span>or sign up using</span>
          <div className="flex items-center justify-center gap-4">
            <img src={googleMini} alt="" className='w-6 cursor-pointer' />
            <img src={facebookMini} alt="" className='w-6 cursor-pointer' />
          </div>
        </div>
      </div>

      {isLoading && <LoadingBackdrop />}
    </div>
  )
}

export default Signup