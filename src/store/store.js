import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth-slice'
import expenseReducer from './slice/expense-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseReducer
    }
})

export default store