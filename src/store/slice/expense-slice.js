import { createSlice } from "@reduxjs/toolkit";



const initialExpenseState = {
    expenses: [],
    amount: 0,
    description: '',
    category: 'Food'

}

const ExpenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            state.expenses.push(action.payload)
        },
        addAmount(state, action) {
            state.amount = action.payload
        },
        addDesc(state, action) {
            state.description = action.payload
        },
        addCategory(state, action) {
            state.category = action.payload
        }
    }
})

export const expenseActions = ExpenseSlice.actions
export default ExpenseSlice.reducer