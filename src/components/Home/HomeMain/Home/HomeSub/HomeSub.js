import React, { useEffect } from 'react'
import './HomeSub.css'
import AddIcon from '../../../../assets/plus.png'
import { useSelector, useDispatch } from 'react-redux'
import { expenseActions } from '../../../../../store/slice/expense-slice'

const HomeSub = ({ title, remaining, amount, handleClickOpen }) => {
    const userToken = useSelector(state => state.auth.userToken)
    const userEmail = useSelector(state => state.auth.userEmail)
    const dispatch = useDispatch()
    let income;
    let user;
    useEffect(() => {
        income = localStorage.getItem('userIncome')
        user = localStorage.getItem('userEmail')
        dispatch(expenseActions.handleAddIncome(income))
    }, [income, user])
    return (
        <div className='homeSub'>
            <div className='homeSub__container1'>
                <p className='homeSub__title' >{title}</p>
                {!remaining && userToken && userEmail && <img style={{ height: '20px', width: '20px', cursor: 'pointer', marginRight: '5px', marginTop: '12px' }} onClick={handleClickOpen} src={AddIcon} />}

            </div>
            <div className='homeSub__container2'>
                {userToken && userEmail ? (
                    <p className='homeSub__amount' >Rs {amount} </p>) : <p className='homeSub__amount' >Rs 0</p>}

            </div>
        </div>
    )
}

export default HomeSub