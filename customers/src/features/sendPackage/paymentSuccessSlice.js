import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentSuccessWindow: 'hidden'
}

const paymentSuccessSlice = createSlice({
  name: 'paymentSuccess',
  initialState,
  reducers: {
    changePaymentSuccessWindow: (state) => {
      if (state.paymentSuccessWindow === 'hidden') {
        state.paymentSuccessWindow = 'block'
      } else {
        state.paymentSuccessWindow = 'hidden'
      }
    }
  }
})

export const { changePaymentSuccessWindow } = paymentSuccessSlice.actions

export default paymentSuccessSlice.reducer