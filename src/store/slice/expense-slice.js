import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialExpenseState = {
    expenses: [],
    isEdit: false,


}

const ExpenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            if (Array.isArray(action.payload)) {
                state.expenses = action.payload
            } else {
                state.expenses.push(action.payload)

            }

        },

    }
})

export const postExpenseData = (expense) => {
    return async () => {
        const postRequest = async () => {
            const response = await axios.post('https://clone-e78d9-default-rtdb.firebaseio.com/expenses.json', expense)

        }

        try {
            await postRequest()

        } catch (err) {
            console.log(err)
        }

    }

}

export const getExpenseData = () => {
    return async (dispatch, state) => {
        const getRequest = async () => {
            const response = await axios.get('https://clone-e78d9-default-rtdb.firebaseio.com/expenses.json')
            if (response.status == 200) {
                let res = response.data
                let data = []
                for (let key in res) {
                    data.push({
                        id: key,
                        description: res[key].description,
                        amount: res[key].amount,
                        category: res[key].category
                    })
                }

                dispatch(expenseActions.addExpense(data))

            }
        }
        try {
            await getRequest()
        } catch (err) {
            console.log(err)
        }

    }
}
export const expenseActions = ExpenseSlice.actions
export default ExpenseSlice.reducer