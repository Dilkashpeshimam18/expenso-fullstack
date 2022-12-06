import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth-slice'
import expenseReducer from './slice/expense-slice'
import themeReducer from "./slice/theme-slice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseReducer,
        theme: themeReducer
    }
})

export default store