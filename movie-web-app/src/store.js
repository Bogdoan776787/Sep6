import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userAccount"

export default configureStore({
  reducer: {
      user:userReducer
  },
})