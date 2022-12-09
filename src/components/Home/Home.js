import React from 'react'
import './Home.css'
import Expenses from '../Expenses/Expenses'
import { useSelector } from 'react-redux'

const Home = () => {
    const userToken = useSelector(state => state.auth.userToken)

    return (
        <div className='home'>
            <h1>Welcome to Expense Tracker</h1>


            {userToken && <Expenses />}


        </div>
    )
}

export default Home