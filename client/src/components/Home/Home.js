import React from 'react'
import './Home.css'
import Expenses from '../Expenses/Expenses'
import { useSelector } from 'react-redux'
import HomeLeft from './HomeLeft/HomeLeft'
import HomeMain from './HomeMain/HomeMain'
import HomeRight from './HomeRight/HomeRight'

const Home = () => {
    const userToken = useSelector(state => state.auth.userToken)

    return (
        <div className='home'>
            <HomeLeft />
            <HomeMain />
            <HomeRight />


        </div>
    )
}

export default Home