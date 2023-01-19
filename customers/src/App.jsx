import React, { useEffect, useState } from "react"
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { changeNavBarState } from "./features/navbar/navbarSlice"
import SplashScreen from "./utils/SplashScreen"
const Welcome = React.lazy(() => import("./pages/Welcome"))
const Signup = React.lazy(() => import("./pages/Signup"))
const Login = React.lazy(() => import("./pages/Login"))
const Verification = React.lazy(() => import("./pages/Verification"))
const Home = React.lazy(() => import("./pages/Home"))
const Wallet = React.lazy(() => import("./pages/Wallet"))
const MyOrders = React.lazy(() => import("./pages/MyOrders"))

import 'animate.css'

function App() {

  const [indexPage, setIndexPage] = useState(<SplashScreen />)
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('customer') !== null) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, []);

  const navigate = useNavigate()

  const dispatch = useDispatch()

  //Splashscreen delay
  useEffect(() => {
    setTimeout(() => {
      setIndexPage(<Welcome />)
    }, 5000);
  }, []);

  //Reset page scroll when navigating to another path
  const { pathname } = useLocation();
  const tabScreenBelow = window.matchMedia("(max-width: 1023px)")
  useEffect(() => {
    window.scrollTo(0, 0);
    if (tabScreenBelow.matches) {
      dispatch(changeNavBarState(true))
    }
  }, [pathname]);

  //Set auth route
  useEffect(() => {
    const checkAuth = setInterval(() => {
      if (localStorage.getItem('customer') === null) {
        setIsAuth(false)
      } else {
        setIsAuth(true)
      }
    }, 1000)

    return () => clearInterval(checkAuth)
  }, [])

  const loggedIn = (
    <>
      <Route path="/" element={
        <React.Suspense fallback={<SplashScreen />}>
          <Home />
        </React.Suspense>
      } />
      <Route path="/wallet" element={
        <React.Suspense fallback={<SplashScreen />}>
          <Wallet />
        </React.Suspense>
      } />
      <Route path="/my-orders" element={
        <React.Suspense fallback={<SplashScreen />}>
          <MyOrders />
        </React.Suspense>
      } />
      <Route path="*" element={
        <React.Suspense fallback={<SplashScreen />}>
          <Navigate to={"/"} />
        </React.Suspense>
      } />
    </>
  )
  const notLoggedIn = (
    <>
      <Route path="/" element={indexPage} />
      <Route path="/signup" element={
        <React.Suspense fallback={<SplashScreen />}>
          <Signup />
        </React.Suspense>
      } />
      <Route path="/login" element={
        <React.Suspense fallback={<SplashScreen />}>
          <Login />
        </React.Suspense>
      } />
      <Route path="/verify" element={
        <React.Suspense fallback={<SplashScreen />}>
          <Verification />
        </React.Suspense>
      } />
      <Route path="*" element={
        <React.Suspense fallback={<SplashScreen />}>
          <Navigate to={"/"} />
        </React.Suspense>
      } />
    </>
  )

  return (
    <Routes>
      {isAuth ? loggedIn : notLoggedIn}
    </Routes>
  )
}

export default App
