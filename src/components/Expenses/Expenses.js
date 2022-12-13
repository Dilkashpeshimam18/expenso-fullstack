import React, { useState, useEffect } from 'react'
import AllExpense from './AllExpense/AllExpense'
import axios from 'axios'
import { expenseActions } from '../../store/slice/expense-slice'
import { useDispatch, useSelector } from 'react-redux'
import './Expense.css'
import { CSVLink } from "react-csv";
import { getExpenseData } from '../../store/slice/expense-slice'
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
            <div>
                <AllExpense handleEdit={handleEdit} />

                <CSVLink className='expensesDownload__link' {...csvLink}>Download expense csv</CSVLink>;




            </div>
        </div>
    )
}

export default Expenses