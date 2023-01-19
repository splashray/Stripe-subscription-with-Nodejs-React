import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navBarState: 'hidden'
}

const navBarSlice = createSlice({
  name: 'navBar',
  initialState,
  reducers: {
    changeNavBarState: (state, { payload }) => {
      switch (payload) {
        case true:
          state.navBarState = 'hidden'
          break;

        default:
          if (state.navBarState === 'hidden') {
            state.navBarState = 'block'
          } else {
            state.navBarState = 'hidden'
          }
          break;
      }
    }
  }
})

export const { changeNavBarState } = navBarSlice.actions

export default navBarSlice.reducer