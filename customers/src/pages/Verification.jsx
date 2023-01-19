import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import useQuery from '../utils/useQuery';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import LoadingBackdrop, { ButtonLoader } from '../utils/LoadingBackdrop';

const MySwal = withReactContent(Swal)

function Verification() {
  const [isPageValid, setIsPageValid] = useState(true)
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  let query = useQuery();

  useEffect(() => {
    if (!query.get("authorize")) {
      setIsPageValid(false)
    } else {
      return
    }
  }, [])

  const handleChange = (code) => setOtp(code);

  const navigate = useNavigate()

  const verifyUser = () => {
    setIsLoading(true)
    if (otp.length === 4) {
      var data = JSON.stringify({
        call: 'Verify-Register',
        action: 'Prove-Register',
        'api_key': import.meta.env.VITE_BASE_API_KEY,
        verifykey: otp
      });
      var config = {
        method: 'post',
        url: `${import.meta.env.VITE_BASE_LINK}verify-point-web.php`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          if (response.data === 'User Verified') {
            MySwal.fire({
              title: <p className='text-sm'>Your account has been verified successfully</p>,
              icon: 'success',
            })

            setTimeout(() => {
              navigate("/login")
            }, 2000);
          } else {
            MySwal.fire({
              title: <p className='text-sm'>{response.data}</p>,
              icon: 'error',
            })
            setIsLoading(false)
          }
          console.log(response);
        }).catch(function (error) {
          MySwal.fire({
            title: <p className='text-sm'>Incorrect OTP</p>,
            icon: 'error',
          })
        });
    } else {
      MySwal.fire({
        title: <p className='text-sm'>Input a valid number</p>,
        icon: 'error',
      })
      setIsLoading(false)
    }
  }

  return isPageValid && (
    <div className='relative animate__animated animate__fadeIn flex items-center justify-center px-2 py-4 mx-auto sm:w-[500px] md:px-4'>
      <div>
        <h2 className="font-bold text-2xl text-customBlue">Verify your account</h2>
        <span className="mt-2 text-customGrey text-sm sm:text-base">
          Input the 4 digits sent to your email <b>{query.get("authorize")}</b>
        </span>
        <div className="mt-10 mx-auto w-fit">
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={4}
            placeholder="...."
            shouldAutoFocus={true}
          />
        </div>
        <button
          onClick={verifyUser}
          className='mt-14 flex items-center gap-2 justify-center transition duration-500 font-bold bg-customBlue rounded-md w-full py-2 text-white text-sm'
        >
          Proceed to Login {isLoading && <ButtonLoader />}
        </button>
      </div>

      {isLoading && <LoadingBackdrop />}
    </div>
  )
}

export default Verification