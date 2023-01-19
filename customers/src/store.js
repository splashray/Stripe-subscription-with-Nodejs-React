import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./features/navbar/navbarSlice";
import sendPackageReducer from "./features/sendPackage/sendPackageSlice";
import chooseRiderReducer from "./features/sendPackage/chooseRiderSlice";
import paymentSuccessReducer from "./features/sendPackage/paymentSuccessSlice";
import trackPageReducer from "./features/trackPage/trackPageSlice";

export const store = configureStore({
  reducer: {
    navBar: navbarReducer,
    sendPackage: sendPackageReducer,
    chooseRider: chooseRiderReducer,
    paymentSuccess: paymentSuccessReducer,
    trackPage: trackPageReducer,
  },
})