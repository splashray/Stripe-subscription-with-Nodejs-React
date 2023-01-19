import React from "react"
import splashLogo from '../assets/images/splash-logo.png'

function SplashScreen() {

  return (
    <div id="splashScreen" className="h-screen bg-customBlue flex items-center justify-center">
      <img src={splashLogo} alt="Loading..." className="animate-pulse w-[305px]" />
    </div>
  )
}

export default SplashScreen
