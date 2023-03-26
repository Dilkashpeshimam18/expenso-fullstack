import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { initialAuthState } from "./auth-slice";

const initialExpenseState = {
    expenses: [],
    isEdit: false,
    isfetching: false,
    userIncome: localStorage.getItem('userIncome') || 0


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
        deleteExpense(state, action) {
            let filterExp = state.expenses.filter((exp) => {
                return exp.id != action.payload
            })
            state.expenses = filterExp
        },
        editExpense(state, action) {
            state.isEdit = true
            state.expenseId = action.payload
        },
        isNotEditExpense(state) {
            state.isEdit = false
            state.expenseId = null
        },
        setIsFetching(state, action) {
            state.isfetching = action.payload
        },
        handleAddIncome(state, action) {
            state.userIncome = action.payload
        }

    }
})

export const updateExpenseData = (data) => {
    return async () => {

        const putRequest = async () => {
            var email = localStorage.getItem('email')
            let usermail;
            if (email != null) {
                var splitted = email?.split("@");
                usermail = splitted[0]?.replace(/\./g, "");
            }
            if (email != null) {
                const response = await axios.put(`https://clone-e78d9-default-rtdb.firebaseio.com/expenses/${usermail}/${data.id}.json`, data.expense)

            } else {
                const response = await axios.put(`https://clone-e78d9-default-rtdb.firebaseio.com/expenses/${data.id}.json`, data.expense)

            }



        }

        try {
            await putRequest().then(() => {
                getExpenseData()
                alert('Updated Successfully!')
            })

        } catch (err) {
            console.log(err)
        }
    }
}
export const postExpenseData = (expense) => {
    return async (state) => {

        const postRequest = async () => {
            var email = localStorage.getItem('email')
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            // let usermail;
            // if (email != null) {
            //     var splitted = email?.split("@");
            //     usermail = splitted[0]?.replace(/\./g, "");
            // }
            // if (email != null) {
            //     const response = await axios.post(`https://clone-e78d9-default-rtdb.firebaseio.com/expenses/${usermail}.json`, expense)

            // } else {
            //     const response = await axios.post('https://clone-e78d9-default-rtdb.firebaseio.com/expenses.json', expense)

            // }

            const response = await reqInstance.post('http://localhost:4000/expense/add-expense', expense)
            console.log(response)


        }

        try {
            await postRequest().then(() => {
                getExpenseData()
                alert('Added Successfully!')
            })

        } catch (err) {
            console.log(err)
        }



    }

}

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
export const getExpenseData = () => {
    return async (dispatch, state) => {
        const getRequest = async () => {
            // let response;
            const token = localStorage.getItem('token')
            // let usermail;
            // if (email != null) {
            //     var splitted = email?.split("@");
            //     usermail = splitted[0]?.replace(/\./g, "");
            // }
            // if (email != null) {
            //     response = await axios.get(`https://clone-e78d9-default-rtdb.firebaseio.com/expenses/${usermail}.json`)

            // } else {
            //     response = await axios.get('https://clone-e78d9-default-rtdb.firebaseio.com/expenses.json')

            // }



            // if (response.status == 200) {
            //     let res = response.data
            //     let data = []
            //     for (let key in res) {
            //         data.push({
            //             id: key,
            //             description: res[key].description,
            //             amount: res[key].amount,
            //             category: res[key].category
            //         })
            //     }


            // }
            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const response = await reqInstance.get('http://localhost:4000/expense/get-expense')
            console.log(response)
            const data = response.data.expenses
            dispatch(expenseActions.addExpense(data))

        }
        try {
            if (localStorage.getItem('token')) {
                await getRequest()

            }
        } catch (err) {
            console.log(err)
        }

    }
}

export const deleteExpenseData = (id) => {
    return async () => {
        const deleteRequest = async () => {
         console.log(id)
         const token = localStorage.getItem('token')

         let reqInstance = await axios.create({
            headers: {
                Authorization: token
            }
        })
            // let usermail;
            // if (email != null) {
            //     var splitted = email?.split("@");
            //     usermail = splitted[0]?.replace(/\./g, "");
            // }
            // if (email != null) {
            //     const response = await axios.delete(`https://clone-e78d9-default-rtdb.firebaseio.com/expenses/${usermail}/${id}.json`)

            // } else {
            //     const response = await axios.delete(`https://clone-e78d9-default-rtdb.firebaseio.com/expenses${id}.json`)

            // }
            const response = await reqInstance.delete(`http://localhost:4000/expense/delete-expense/${id}`)
            console.log(response)

        }
        try {
            await deleteRequest().then(() => {
                getExpenseData()
                alert('Deleted successfully!')

            })
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
}

export const expenseActions = ExpenseSlice.actions
export default ExpenseSlice.reducer