import React from 'react'
import { themeActions } from '../../../store/slice/theme-slice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExpenseData } from '../../../store/slice/expense-slice'

const SingleExpense = ({ id, amount, desc, category }) => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme.theme)
    const handlePremium = () => {
        dispatch(themeActions.activatePremium())
    }
    return (
        <div>
            <div>
                <p>{desc}-{amount}-{category}</p>
                <button>Edit</button><button onClick={() => dispatch(deleteExpenseData(id))}>Delete</button>
                {amount > 1000 && <button onClick={handlePremium}>Premium</button>}
            </div>
        </div>
    )
}

export default SingleExpense