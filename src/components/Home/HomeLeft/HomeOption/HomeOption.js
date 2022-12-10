import React from 'react'
import './HomeOption.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
const HomeOption = () => {
    return (
        <div className='homeOption'>
            <ul className='homeOption__container' style={{ listStyle: 'none' }}>
                <li className='homeOption__list'><DashboardIcon className='homeOption__icon' /><p>Dashboard</p> </li>
                <li className='homeOption__list'><BarChartIcon className='homeOption__icon' /><p>Expense</p></li>
                <li className='homeOption__list'><SettingsIcon className='homeOption__icon' /><p>Setting</p></li>
                <li className='homeOption__list'><HelpIcon className='homeOption__icon' /><p>Get Help</p></li>
            </ul>
        </div>
    )
}

export default HomeOption