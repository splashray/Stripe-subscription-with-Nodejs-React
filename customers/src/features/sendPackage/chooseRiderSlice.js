import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chooseRider: 'hidden'
}

const chooseRiderSlice = createSlice({
  name: 'sendPackage',
  initialState,
  reducers: {
    changeRiderWindow: (state) => {
      if (state.chooseRider === 'hidden') {
        state.chooseRider = 'block'
      } else {
        state.chooseRider = 'hidden'
      }
    }
  }
})

export const { changeRiderWindow } = chooseRiderSlice.actions

export default chooseRiderSlice.reducer