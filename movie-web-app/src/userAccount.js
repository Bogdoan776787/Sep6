import { createSlice } from '@reduxjs/toolkit'

export const userAccount = createSlice({
  name: 'user',
  initialState:
  {
      data:null
  },
  reducers: {
    setUser: (state,action) => {
      state.data = action.payload
      localStorage.setItem("user",state.data)
    },
    clearUser: (state) => {
      state.data = null
      localStorage.clear()
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser} = userAccount.actions

export default userAccount.reducer