import React, { useState, useEffect } from 'react'
import HomeCategory from './Home/HomeCategory/HomeCategory'
import HomeGraph from './Home/HomeGraph/HomeGraph'
import HomeSub from './Home/HomeSub/HomeSub'
import IncomeModal from './Home/IncomeModal/IncomeModal'
import { useSelector } from 'react-redux'
import './HomeMain.css'

const HomeMain = () => {
    const [remaining, setRemaining] = useState(true)
    const [open, setOpen] = useState(false);
    const [income, setIncome] = useState(() => {
        return localStorage.getItem('userIncome') || 0
    })
    const [userIncome, setUserIncome] = useState(() => {
        return localStorage.getItem('userIncome')
    })
    const allExpenses = useSelector(state => state.expenses.expenses)
    let totalExpense = allExpenses.reduce((curr, expense) => {
        return curr + Number(expense.amount)
    }, 0)
    let remainingAmount = income - totalExpense

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleIncome = () => {

        localStorage.setItem('userIncome', income)
        let Income = localStorage.getItem('userIncome')
        setUserIncome(Income)
    }
    const handleChange = (e) => {
        setIncome(e.target.value)
    }

    return (
        <div className='homeMain'>
            <div className='home__subContainer'>
                <HomeSub title='Income' amount={userIncome} handleClickOpen={handleClickOpen} />
                <HomeSub title='Expense' remaining={remaining} amount={totalExpense} />
                <HomeSub title='Remaining' remaining={remaining} amount={remainingAmount} />
            </div>
            <div className='home__graphContainer'>
                <HomeGraph />
            </div>
            <div className='home__catContainer'>
                <HomeCategory />
                <HomeCategory />
                <HomeCategory />
                <HomeCategory />
                <HomeCategory />


            </div>
            <IncomeModal handleClose={handleClose} open={open} handleIncome={handleIncome} handleChange={handleChange} />
        </div>
    )
}

export default HomeMain