import React from 'react'
import SingleExpense from '../SingleExpense/SingleExpense'

const AllExpense = ({ expenses }) => {
    return (
        <div>
            {expenses.map((expense, index) => {
                return <SingleExpense key={index} amount={expense.amount} desc={expense.desc} category={expense.category} />
            })}

        </div>
    )
}

export default AllExpense