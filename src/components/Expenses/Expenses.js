import React, { useState, useEffect } from 'react'
import AllExpense from './AllExpense/AllExpense'
import axios from 'axios'
import { expenseActions } from '../../store/slice/expense-slice'
import { useDispatch, useSelector } from 'react-redux'
import './Expense.css'
import { CSVLink } from "react-csv";
import { postExpenseData } from '../../store/slice/expense-slice'
import { getExpenseData } from '../../store/slice/expense-slice'
import { updateExpenseData } from '../../store/slice/expense-slice'
let isInitial = true

const Expenses = () => {
    const [expenses, setExpenses] = useState([])
    const [amount, setAmount] = useState(0)
    const [desc, setDesc] = useState('')
    const isEdit = useSelector(state => state.expenses.isEdit)
    const expId = useSelector(state => state.expenses.expenseId)
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



    const handleEdit = (id) => {
        let editExp = expense.filter((expense) => {
            return expense.id == id
        })
        let ID = id
        dispatch(expenseActions.editExpense(ID))
        setAmount(editExp[0].amount)
        setCategory(editExp[0].category)
        setDesc(editExp[0].description)

    }


    const handleAddExpenseForm = (e) => {
        e.preventDefault();

        if (isEdit == true) {
            const data = {
                amount: amount,
                description: desc,
                category: category
            }
            let editexp = {
                id: expId,
                expense: data
            }
            dispatch(updateExpenseData(editexp))


            setAmount(0)
            setDesc('')
            setCategory(getInitialState)

            dispatch(expenseActions.isNotEditExpense())


        } else {
            const data = {
                amount: amount,
                description: desc,
                category: category
            }
            dispatch(postExpenseData(data))

            setAmount(0)
            setDesc('')
            setCategory(getInitialState)

        }


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
                <AllExpense handleEdit={handleEdit} />
                <CSVLink {...csvLink}>Download Expense Csv</CSVLink>;

            </div>
        </div>
    )
}

export default Expenses