import React from 'react'
import SingleExpense from '../SingleExpense/SingleExpense'

const AllExpense = ({ expenses, getAllExpenses, handleEdit, handleDelete }) => {
    return (
        <div>
            {expenses.map((expense, index) => {
                return <SingleExpense key={index} id={expense.id} amount={expense.amount} desc={expense.description} category={expense.category} getAllExpenses={getAllExpenses} handleEdit={handleEdit} handleDelete={handleDelete} />
            })}

        </div>
    )
}

export default AllExpense