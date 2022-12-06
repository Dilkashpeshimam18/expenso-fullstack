import { createSlice } from "@reduxjs/toolkit";


const getInitialCategory = () => {
    const value = "Food";
    return value;
};
const initialExpenseState = {
    expenses: [],
    amount: 0,
    description: '',
    category: getInitialCategory

}

const ExpenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            state.expenses.push(action.payload)
        },
        // addAmount(state, action) {
        //     state.amount = action.payload
        // },
        // addDesc(state, action) {
        //     state.description = action.payload
        // }
    }
})

export const expenseActions = ExpenseSlice.actions
export default ExpenseSlice.reducer