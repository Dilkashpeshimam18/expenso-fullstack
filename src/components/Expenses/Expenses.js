import React, { useState, useEffect } from 'react'
import AllExpense from './AllExpense/AllExpense'
import axios from 'axios'
import { expenseActions } from '../../store/slice/expense-slice'
import { useDispatch, useSelector } from 'react-redux'
import './Expense.css'
import { CSVLink } from "react-csv";
import { getExpenseData } from '../../store/slice/expense-slice'
import { modalActions } from '../../store/slice/modal-slice'

let isInitial = true

const Expenses = ({ handleEdit }) => {
    const [expenses, setExpenses] = useState([])
    const isEdit = useSelector(state => state.expenses.isEdit)
    const expId = useSelector(state => state.expenses.expenseId)
    const dispatch = useDispatch()
    const expense = useSelector(state => state.expenses.expenses)
    const userEmail = useSelector(state => state.auth.userEmail)


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

        dispatch(getExpenseData())
    }, [dispatch, expense, userEmail])
    return (
        <div className='expenses'>
            {
                localStorage.getItem('email') != null && localStorage.getItem('token') != null ? (
                    expense.length != 0 ? <div>
                        <AllExpense handleEdit={handleEdit} />
                        <CSVLink className='expensesDownload__link' {...csvLink}>Download expense csv</CSVLink>;
                    </div> : <h5 style={{ paddingLeft: '10px' }}>There is no expense yet!</h5>
                ) : (
                    <div>
                        <h5 style={{ marginLeft: '10px' }}>To use this application you need to login first!</h5>
                    </div>
                )
            }




        </div>
    )
}

export default Expenses