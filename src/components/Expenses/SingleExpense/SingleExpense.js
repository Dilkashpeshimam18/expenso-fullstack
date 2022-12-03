import React from 'react'
import axios from 'axios'
const SingleExpense = ({ id, amount, desc, category, getAllExpenses, handleEdit, handleDelete }) => {

    return (
        <div>
            <div>
                <p>{desc}-{amount}-{category}</p>
                <button onClick={() => handleEdit(id)}>Edit</button><button onClick={() => handleDelete(id)}>Delete</button>
            </div>
        </div>
    )
}

export default SingleExpense