import React, { useEffect } from 'react'
import SingleExpense from '../SingleExpense/SingleExpense'
import { useSelector } from 'react-redux'
import Divider from '@mui/material/Divider';
import './AllExpense.css'
let isIntial = true
const AllExpense = ({ handleEdit }) => {
    const allExpenses = useSelector(state => state.expenses.expenses)

    return (
        <div className='allExpenses'>


            {allExpenses?.map((expense, index) => {
                return <>
                    <SingleExpense key={index} id={expense.id} amount={expense.amount} desc={expense.description} category={expense.category} handleEdit={handleEdit} />
                    <Divider />
                </>
            })}



        </div >
    )
}

export default AllExpense