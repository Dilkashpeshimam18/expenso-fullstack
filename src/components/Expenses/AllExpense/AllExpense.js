import React, { useEffect } from 'react'
import SingleExpense from '../SingleExpense/SingleExpense'
import { useSelector } from 'react-redux'

const AllExpense = ({ expenses, getAllExpenses, handleEdit, handleDelete }) => {
    const allExpenses = useSelector(state => state.expenses.expenses[0])
    useEffect(() => {
        console.log(allExpenses)
    }, [])
    return (
        <div>

            {expenses?.map((expense, index) => {
                return <SingleExpense key={index} id={expense.id} amount={expense.amount} desc={expense.description} category={expense.category} getAllExpenses={getAllExpenses} handleEdit={handleEdit} handleDelete={handleDelete} />
            })}



        </div >
    )
}

export default AllExpense