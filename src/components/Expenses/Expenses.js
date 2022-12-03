import React, { useState } from 'react'
import AllExpense from './AllExpense/AllExpense'



const Expenses = () => {
    const [expenses, setExpenses] = useState([])
    const [amount, setAmount] = useState(0)
    const [desc, setDesc] = useState('')
    const getInitialState = () => {
        const value = "Food";
        return value;
    };
    const [category, setCategory] = useState(getInitialState)
    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleExpenseForm = (e) => {
        e.preventDefault()
        const data = {
            amount: amount,
            desc: desc,
            category: category
        }
        setExpenses((prevExp) => {
            let allExpense = [...prevExp]
            allExpense.push(data)
            return allExpense
        })
        setAmount(0)
        setDesc('')
        setCategory(getInitialState)
        console.log(expenses)
    }
    return (
        <div className='expenses'>
            <form onSubmit={handleExpenseForm} className="form-container">
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
            </div>
        </div>
    )
}

export default Expenses