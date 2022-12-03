import React from 'react'

const SingleExpense = ({ amount, desc, category }) => {
    return (
        <div>
            <div>
                <p>{desc}-{amount}-{category}</p>
            </div>
        </div>
    )
}

export default SingleExpense