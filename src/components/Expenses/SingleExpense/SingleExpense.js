import React from 'react'
import './SingleExpense.css'
import { themeActions } from '../../../store/slice/theme-slice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExpenseData } from '../../../store/slice/expense-slice'
import EditIcon from '../../assets/edit.png'
import DeleteIcon from '../../assets/delete.png'
import PremiumIcon from '../../assets/premium.png'
const SingleExpense = ({ id, amount, desc, category, handleEdit }) => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme.theme)
    const handlePremium = () => {
        dispatch(themeActions.activatePremium())
    }

    return (
        <div className='singleExpense'>
            <div className='singleExpense__container'>
                <div className='singleExpense__container1'>
                    <div className='singleExpense__subContainer'>
                        <p className='singleExpense__subTitle'>{desc}</p>

                    </div>

                    <div className='singleExpense__subContainer'>
                        <p className='singleExpense__subAmmount'>Rs</p>
                        <p className='singleExpense__subAmmount'>{amount}</p>

                    </div>
                    <div className='singleExpense__buttonContainer'>
                        <img src={EditIcon} style={{ height: '25px', width: '25px', cursor: 'pointer', margin: '3px' }} onClick={() => handleEdit(id)}></img>
                        <img src={DeleteIcon} style={{ height: '25px', width: '25px', cursor: 'pointer', margin: '3px' }} onClick={() => dispatch(deleteExpenseData(id))}></img>
                        {amount > 1000 && <img style={{ height: '25px', width: '25px', cursor: 'pointer', margin: '3px' }} src={PremiumIcon} onClick={handlePremium}></img>}
                    </div>
                </div>

                <div className='singleExpense__subCatContainer'>
                    <p className='singleExpense__subCategory'>{category}</p>

                </div>

            </div>
        </div>
    )
}

export default SingleExpense