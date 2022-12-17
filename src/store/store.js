import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth-slice'
import expenseReducer from './slice/expense-slice'
import themeReducer from "./slice/theme-slice";
import modalReducer from './slice/modal-slice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseReducer,
        theme: themeReducer,
        modal: modalReducer
    }
})

export default store