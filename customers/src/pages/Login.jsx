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

function Login({ signInUser }) {
  const eye = <EyeIcon onClick={showPwdFunc} className='h-[44px] cursor-pointer text-customBlue w-6 absolute bottom-0.5 right-2' />
  const eyeSlash = <EyeSlashIcon onClick={showPwdFunc} className='h-[44px] cursor-pointer text-customBlue w-6 absolute bottom-0.5 right-2' />

  const [showPwd, setShowPwd] = useState(eye)
  const [signinData, setSigninData] = useState({
    mail: '',
    pwd: ''
  })
  const [inputAlert, setInputAlert] = useState({
    mail: '',
    mailState: false,
    pwd: '',
    pwdState: false,
  })
  const [signinBtnState, setSigninBtnState] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const pwdRef = useRef()

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
      case 'mail':
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setInputAlert(prevState => ({ ...prevState, mail: '', mailState: true }))
        } else {
          setInputAlert(prevState => ({ ...prevState, mail: 'border-2 border-red-500', mailState: false }))
        }

        setSigninData(prevState => ({ ...prevState, mail: value }))
        break;
      case 'pwd':
        if (value.length < 8) {
          setInputAlert(prevState => ({ ...prevState, pwd: 'border-2 border-red-500', pwdState: false }))
        } else {
          setInputAlert(prevState => ({ ...prevState, pwd: '', pwdState: true }))
        }

        setSigninData(prevState => ({ ...prevState, pwd: value }))
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    let inputStates = [inputAlert.mailState, inputAlert.pwdState]
    const formTrue = inputStates.every(value => value === true)
    if (formTrue) {
      setSigninBtnState(false)
    } else {
      setSigninBtnState(true)
    }
  }, [signinData]);

  const navigate = useNavigate()

  function signInUserFunc() {
    // signInUser()
    var data = JSON.stringify({
      "api_key": import.meta.env.VITE_BASE_API_KEY,
      "call": "Web-Login",
      "action": "Start-Login",
      "password": signinData.pwd,
      "email": signinData.mail
    });

    var config = {
      method: 'post',
      url: `${import.meta.env.VITE_BASE_LINK}start-point-web.php`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.data.includes("Valid")) {
          let timerInterval
          MySwal.fire({
            icon: 'success',
            title: <p>Login successfully</p>,
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500
          })

          localStorage.setItem("customer", JSON.stringify({
            name: response.data.split("-")[1],
            email: response.data.split("-")[3]
          }))

          setTimeout(() => {
            navigate("/")
          }, 2000);
        } else if (response.data.includes("Wrong")) {
          setIsLoading(false)
          MySwal.fire({
            title: <p className='text-sm'>Wrong email or passowrd</p>,
            icon: 'error',
          })
        } else {
          MySwal.fire({
            title: <p className='text-sm'>{response.data}</p>,
            icon: 'error',
          })
        }
      })
      .catch(function (error) {
        setIsLoading(false)
        MySwal.fire({
          title: <p className='text-sm'>{response.data}</p>,
          icon: 'error',
        })
      });
  }

  return (
    <div className='relative animate__animated animate__fadeIn px-2 py-4 mx-auto sm:w-[500px] md:px-4'>
      <div className='pt-12'>
        <h2 className="font-bold text-2xl text-customBlue">Welcome Back</h2>
        <span className="mt-2 text-customGrey font-semibold text-sm sm:text-base">Fill in your email and password to login</span>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <div className='flex flex-col gap-2'>
          <label htmlFor="fname">Email Address</label>
          <input
            type="email" id='mail'
            placeholder='*****@mail.com'
            onKeyUp={(e) => validateForm('mail', e.target.value)}
            className={`bg-customVeryLight ${inputAlert.mail} px-4 py-2 rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
          />
        </div>
        <div className='pwd relative flex flex-col gap-2'>
          <label htmlFor="pwd">Password</label>
          <input ref={pwdRef}
            type="password" id='pwd'
            placeholder='********'
            onKeyUp={(e) => validateForm('pwd', e.target.value)}
            className={`bg-customVeryLight pl-4 pr-10 py-2 ${inputAlert.pwd} rounded-lg font-semibold h-[44px] transition duration-500 caret-customOrange focus:bg-transparent focus:outline-1 focus:outline-customOrange`}
          />
          {showPwd}
        </div>
        <div className="text-end">
          <Link to="" className='text-customOrange font-semibold'>Forgot Password?</Link>
        </div>
        <div className="mt-4 w-full">
          <button
            disabled={signinBtnState}
            onClick={() => {
              setIsLoading(true)
              signInUserFunc()
            }}
            className='transition duration-500 font-bold flex items-center justify-center gap-2 text-xl bg-customBlue rounded-md w-full text-center py-2 text-white disabled:bg-customLightGrey disabled:cursor-not-allowed'
          >
            Log In {isLoading && <ButtonLoader />}
          </button>
          <div className='mt-2 text-center'>
            <small className="text-base text-center text-customLightGrey">Don't have an account?</small>
            <Link to="/signup" className='font-bold text-customBlue'> Sign Up</Link>
          </div>
        </div>
        <div className="mt-4 flex items-center flex-col gap-2">
          <span>or sign in using</span>
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

export default Login