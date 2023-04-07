import React, { useState, useEffect } from 'react'
import HomeCategory from './Home/HomeCategory/HomeCategory'
import HomeLineGraph from './Home/HomeLineGraph/HomeLineGraph'
import HomeSub from './Home/HomeSub/HomeSub'
import IncomeModal from './Home/IncomeModal/IncomeModal'
import { useSelector, useDispatch } from 'react-redux'
import './HomeMain.css'
import HomePieChart from './Home/HomePieChart/HomePieChart'
import HomeBar from './Home/HomeBar/HomeBar'
import { addIncome, getUserIncome, updateUserIncome } from '../../../store/slice/expense-slice'
import Leaderboard from './Home/HomeLeaderboard/Leaderboard'
import ExpenseYearlyGrid from '../../Expenses/ExpenseDataGrid/ExpenseYearlyGrid'
import ExpenseMonthlyGrid from '../../Expenses/ExpenseDataGrid/ExpenseMonthlyGrid'

const HomeMain = () => {
    const [remaining, setRemaining] = useState(true)
    const [open, setOpen] = useState(false);
    const [income, setIncome] = useState(() => {
        return 0 || localStorage.getItem('userIncome')
    })
    const [inputIncome, setInputIncome] = useState(0)
    const Income = JSON.parse(localStorage.getItem('userIncome'))
    const [userIncome, setUserIncome] = useState(() => {
        return localStorage.getItem('userIncome') || 0
    })
    const isSelected = useSelector(state => state.dashboard.isSelected)
    const allExpenses = useSelector(state => state.expenses.expenses)
    const dispatch = useDispatch()
    const userEmail = useSelector(state => state.auth.userEmail)
    let map = new Map()
    let map2 = new Map()

    for (let exp of allExpenses) {
        let category = exp?.category
        let amount = Number(exp?.amount)
        map.set(category, map.get(category) + amount || amount)
    }

    let allKeys = [...map.keys()]
    let allValues = [...map.values()]
    let barData = {
        labels: allKeys,
        datasets: [{
            barThickness: 45,
            label: 'Total Expense By Category',
            data: allValues,
            // backgroundColor: ['rgb(1, 140, 140)', '#3bc4d4',]
            backgroundColor: [
                // 'rgb(255, 99, 132)',
                'rgb(255, 205, 86)',
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)'],
        }]
    }

    for (let exp of allExpenses) {
        let desc = exp?.description?.toLowerCase()
        let amount = Number(exp?.amount)
        map2.set(desc, map2.get(desc) + amount || amount)
    }

    let allDescKey = [...map2.keys()]
    let allDescValue = [...map2.values()]
    let totalexp = localStorage.getItem('totalExpense') || 0
    let totalExpense = totalexp

    totalExpense = allExpenses.reduce((curr, expense) => {
        return curr + Number(expense?.amount)
    }, 0)

    let balance = localStorage.getItem('remainingBalance') || 0
    let remainingAmount = balance;

    remainingAmount = Income?.income - totalExpense;



    let lineData = {
        labels: allDescKey,
        datasets: [{
            barThickness: 40,
            label: 'All Expense',
            data: allDescValue,
            backgroundColor: ['rgb(1, 140, 140)', '#3bc4d4',],
            animations: {
                y: {
                    duration: 2000,
                    delay: 500
                }
            },
            tension: 0.5
        }]
    }

    let pieData = {
        labels: ['Income', 'Expense', 'Balance'],
        datasets: [{
            barThickness: 40,
            label: 'Income vs Expense vs Balance',
            data: [userIncome, totalExpense, remainingAmount],
            backgroundColor: [
                'rgb(1, 140, 140)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
        }]
    }

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
        let Income = localStorage.getItem('userIncome')

        setUserIncome(Income)
    };

    const handleChange = (e) => {
        setIncome(e.target.value)
    }

    const handleIncome = () => {
        totalExpense = allExpenses.reduce((curr, expense) => {
            return curr + Number(expense.amount)
        }, 0)
        let userIncome = localStorage.getItem('userIncome')

        if (userIncome && userIncome != undefined && userIncome != null) {
            if (income != null) {
                let data = {
                    id: Income?.id,
                    income: income
                }
                dispatch(updateUserIncome(data))
            }

        } else {
            if (income != null) {
                dispatch(addIncome(income))

            }

        }
        localStorage.setItem('totalExpense', totalExpense)

        remainingAmount = income - totalExpense;
        localStorage.setItem('remainingBalance', remainingAmount)
        handleClose()
    }


    useEffect(() => {
        dispatch(getUserIncome())

    }, [])
    return (
        <div className='homeMain'>
            <div className='home__subContainer'>

                <HomeSub title='Income' amount={Income?.income} handleClickOpen={handleClickOpen} />
                <HomeSub title='Expense' remaining={remaining} amount={totalExpense} />
                <HomeSub title='Remaining' remaining={remaining} amount={remainingAmount} />
            </div>
            {isSelected == 'Dashboard' &&
                <>
                    <div className='home__graphContainer'>
                        <HomeLineGraph chartData={lineData} />
                    </div>
                    <div className='home__chartContainer'>
                        <HomePieChart chartData={pieData} />
                        <HomeBar chartData={barData} />
                    </div>
                </>
            }
            {
                isSelected == 'Bar' &&
                <div className='home__barContainer'>
                    <HomeBar chartData={barData} />
                </div>
            }
            {
                isSelected == 'Line' &&
                <div className='home__graphContainer'>
                    <HomeLineGraph chartData={lineData} />
                </div>
            }
            {
                isSelected == 'Pie' &&
                <div className='home__graphContainer'>
                    <HomePieChart chartData={pieData} />
                </div>
            }
            {
                isSelected == 'Leaderboard' &&
                <div className='home__graphContainer'>
                    <Leaderboard />
                </div>
            }
             {
                isSelected == 'Expenses' &&
                <div className='home__graphContainer'>
                    <ExpenseMonthlyGrid />
                    <ExpenseYearlyGrid/>
                    
                </div>
            }

            <IncomeModal handleClose={handleClose} open={open} handleIncome={handleIncome} handleChange={handleChange} />
        </div>
    )
}

export default HomeMain