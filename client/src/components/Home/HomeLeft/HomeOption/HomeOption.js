import React from 'react'
import './HomeOption.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import EditIcon from '@mui/icons-material/Edit';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { dashboardActions } from '../../../../store/slice/dashboard-slice';
const HomeOption = () => {
    const dispatch = useDispatch()
    const isSelected = useSelector(state => state.dashboard.isSelected)
    const userToken = useSelector(state => state.auth.userToken)
    const userEmail = useSelector(state => state.auth.userEmail)


    return (
        <div className='homeOption'>
            <ul className='homeOption__container' style={{ listStyle: 'none' }}>
                <li onClick={() => dispatch(dashboardActions.handleIsSelected('Dashboard'))} className={isSelected != 'Dashboard' ? 'homeOption__list' : 'homeOption__listSelected'}><DashboardIcon className='homeOption__icon' /><p>Dashboard</p> </li>
                {userToken && userEmail && <Link style={{ textDecoration: 'none' }} to='update-profile'><li className='homeOption__list'><EditIcon className='homeOption__icon' /><p>Edit Profile</p></li></Link>
                }
                <li onClick={() => dispatch(dashboardActions.handleIsSelected('Bar'))} className={isSelected != 'Bar' ? 'homeOption__list' : 'homeOption__listSelected'}><BarChartIcon className='homeOption__icon' /><p>Bar Chart</p></li>
                <li onClick={() => dispatch(dashboardActions.handleIsSelected('Line'))} className={isSelected != 'Line' ? 'homeOption__list' : 'homeOption__listSelected'}><ShowChartIcon className='homeOption__icon' /><p>Line Chart</p></li>
                <li onClick={() => dispatch(dashboardActions.handleIsSelected('Pie'))} className={isSelected != 'Pie' ? 'homeOption__list' : 'homeOption__listSelected'}><DonutLargeIcon className='homeOption__icon' /><p>Pie Chart</p></li>

            </ul>
        </div >
    )
}

export default HomeOption