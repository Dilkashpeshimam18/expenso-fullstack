import React from 'react'
import './ExpenseModal.css'
import { useDispatch } from 'react-redux'
import { expenseActions } from '../../../store/slice/expense-slice'
import { updateExpenseData, postExpenseData } from '../../../store/slice/expense-slice'
const ExpenseModal = () => {
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
    return (
        <div>
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
        </div>
    )
}

export default ExpenseModal