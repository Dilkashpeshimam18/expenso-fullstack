import React, { useState, useEffect } from 'react'
import AllExpense from './AllExpense/AllExpense'
import axios from 'axios'
import { expenseActions } from '../../store/slice/expense-slice'
import { useDispatch, useSelector } from 'react-redux'
import './Expense.css'
import { CSVLink } from "react-csv";
import { postExpenseData } from '../../store/slice/expense-slice'
import { getExpenseData } from '../../store/slice/expense-slice'
let isInitial = true

const Expenses = () => {
    const [expenses, setExpenses] = useState([])
    const [amount, setAmount] = useState(0)
    const [desc, setDesc] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [expId, setExpId] = useState(null)
    const dispatch = useDispatch()
    const getInitialState = () => {
        const value = "Food";
        return value;
    };
    const [category, setCategory] = useState(getInitialState)
    const expense = useSelector(state => state.expenses.expenses)
    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    // const getAllExpenses = async () => {
    //     try {
    //         const response = await axios.get('https://clone-e78d9-default-rtdb.firebaseio.com/expenses.json')
    //         if (response.status == 200) {
    //             let data = []
    //             let res = response.data
    //             for (let key in res) {
    //                 data.push({
    //                     id: key,
    //                     description: res[key].description,
    //                     amount: res[key].amount,
    //                     category: res[key].category
    //                 })
    //             }


    //             setExpenses(data)
    //             localStorage.setItem('allExpense', JSON.stringify(data))
    //             dispatch(expenseActions.addExpense(data))



    //         }

    //     } catch (err) {
    //         console.log(err)
    //         alert(err)
    //     }
    // }
    // const handleAddExpenseForm = async (e) => {
    //     e.preventDefault()
    //     try {
    //         if (isEdit == true) {
    //             const data = {
    //                 amount: amount,
    //                 description: desc,
    //                 category: category
    //             }

    //             const response = await axios.put(`https://clone-e78d9-default-rtdb.firebaseio.com/expenses/${expId}.json`, data)
    //             setAmount(0)
    //             setDesc('')
    //             setCategory(getInitialState)
    //             getAllExpenses()
    //         } else {
    //             const data = {
    //                 amount: amount,
    //                 description: desc,
    //                 category: category
    //             }

    //             const response = await axios.post('https://clone-e78d9-default-rtdb.firebaseio.com/expenses.json', data)
    //             setAmount(0)
    //             setDesc('')
    //             setCategory(getInitialState)
    //             getAllExpenses()

    //         }

    //     } catch (err) {
    //         console.log(err)
    //         alert(err)
    //     }
    // }

    // const handleEdit = (id) => {
    //     let editExp = expenses.filter((expense) => {
    //         return expense.id == id
    //     })
    //     let ID = id
    //     setExpId(ID)
    //     setIsEdit(true)
    //     setAmount(editExp[0].amount)
    //     setCategory(editExp[0].category)
    //     setDesc(editExp[0].description)
    // }
    // const handleDelete = async (id) => {
    //     try {
    //         const response = await axios.delete(`https://clone-e78d9-default-rtdb.firebaseio.com/expenses/${id}.json`)
    //         getAllExpenses()
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    const handleAddExpenseForm = (e) => {
        e.preventDefault();
        const data = {
            amount: amount,
            description: desc,
            category: category
        }
        dispatch(expenseActions.addExpense(data))
        dispatch(postExpenseData(data))

        setAmount(0)
        setDesc('')
        setCategory(getInitialState)
    }
    let headers = [
        {
            label: 'Id', key: 'id'
        },
        {
            label: 'Amount', key: 'amount'
        },
        {
            label: 'Description', key: 'description'

        },
        {
            label: 'Category', key: 'category'

        },

    ]
    const csvLink = {
        filename: 'expenses.csv',
        headers: headers,
        data: expenses
    }
    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        dispatch(getExpenseData())
    }, [dispatch, expense])
    return (
        <div className='expenses'>
            <form onSubmit={handleAddExpenseForm} className="form-container">
                <div className="allInput">
                    <div className="form-input">
                        <h5>ADD EXPENSE</h5>
                        <input placeholder="Enter expense value..." type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="expense-input" />
                    </div>
                    <div className="form-input">
                        <h5>ADD DESCRIPTION</h5>
                        <input placeholder="Enter description..." type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="expense-description" />
                    </div>
                    <div className="form-input">
                        <h5>ADD CATEGORY</h5>
                        <select className="select-category" id="category" onChange={handleCategory}>
                            <option value="Food">Food</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Daily Need">Daily Need</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Accessories">Accessories</option>


                        </select>

                    </div>
                </div>

                <div className="form-input">
                    <input className="btn" type="submit" value="Add Expense" />

                </div>

            </form>

            <div>
                <AllExpense expenses={expenses} />
                <CSVLink {...csvLink}>Download Expense Csv</CSVLink>;

            </div>
        </div>
    )
}

export default Expenses