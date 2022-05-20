import { createSlice } from '@reduxjs/toolkit'

export const userAccount = createSlice({
  name: 'user',
  initialState:
  {
      data:null
  },
  reducers: {
    setUser: (state,action) => {
    console.log(action)
      state.data = action.payload
    },
    clearUser: (state) => {
      state.data = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser} = userAccount.actions

export default userAccount.reducer