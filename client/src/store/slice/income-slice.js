import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { expenseActions } from "./expense-slice";
const initialIncomeState = {
    userIncome: localStorage.getItem('userIncome') || 0
}

const IncomeSlice = createSlice({
    name: 'income',
    initialState: initialIncomeState,
    reducers: {
        handlAddIncome(state, action) {
            state.userIncome = action.payload
        }
    }
})


export const addIncome = (income) => {
    return async (state) => {
        const addInc = async () => {
            let response;
            var email = localStorage.getItem('email')
            let usermail;
            if (email != null) {
                var splitted = email?.split("@");
                usermail = splitted[0]?.replace(/\./g, "");
            }
            if (email != null) {
                response = await axios.post(`https://clone-e78d9-default-rtdb.firebaseio.com/income/${usermail}.json`, income)

            } else {
                response = await axios.post('https://clone-e78d9-default-rtdb.firebaseio.com/income.json', income)

            }
            console.log(response)
        }
        try {
            await addInc()
        } catch (err) {
            console.log(err)
        }

    }
}

export const getUserIncome = () => {
    return async (state, dispatch) => {
        const getIncome = async () => {
            let response;
            var email = localStorage.getItem('email')
            let usermail;
            if (email != null) {
                var splitted = email?.split("@");
                usermail = splitted[0]?.replace(/\./g, "");
            }
            if (email != null) {
                response = await axios.get(`https://clone-e78d9-default-rtdb.firebaseio.com/income/${usermail}.json`)
            } else {
                response = await axios.get('https://clone-e78d9-default-rtdb.firebaseio.com/income.json')

            }
            let res = response.data
            if (res == null) {
                localStorage.setItem('userIncome', 0)
                dispatch(addIncome(0))
            } else {
                let data = {}
                for (let key in res) {
                    res = {
                        id: key,
                        income: res[key]
                    }
                }

                localStorage.setItem('userIncome', JSON.stringify(res))
                dispatch(addIncome(res.income))
            }

        }

        try {
            await getIncome()

        } catch (err) {
            console.log(err)
        }
    }
}

export const updateUserIncome = (data) => {
    return async (dispatch) => {
        const updateIncome = async () => {
            let response;
            var email = localStorage.getItem('email')
            let usermail;
            if (email != null) {
                var splitted = email?.split("@");
                usermail = splitted[0]?.replace(/\./g, "");
            }
            if (email != null) {
                response = await axios.put(`https://clone-e78d9-default-rtdb.firebaseio.com/income/${usermail}/${data.id}.json`, data.income)
                localStorage.setItem('userIncome', JSON.stringify(data))

                dispatch(expenseActions.handleAddIncome(data))

            } else {
                response = await axios.put('https://clone-e78d9-default-rtdb.firebaseio.com/income.json', data.income)

            }
        }

        try {
            await updateIncome().then(() => {
                getUserIncome()
            })

        } catch (err) {
            console.log(err)
        }
    }
}

export const incomeAction = IncomeSlice.actions
export default IncomeSlice.reducer
