import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackPage: 'hidden'
}

const trackPageSlice = createSlice({
  name: 'trackPage',
  initialState,
  reducers: {
    checkTrackPage: (state) => {
      switch (state.trackPage) {
        case 'hidden':
          state.trackPage = 'block'
          break;

        default:
          state.trackPage = 'hidden'
          break;
      }
    }
  }
})

export const { checkTrackPage } = trackPageSlice.actions

export default trackPageSlice.reducer