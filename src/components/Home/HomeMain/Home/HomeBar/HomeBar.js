import React from 'react'
import './HomeBar.css'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
const HomeBar = ({ chartData }) => {
    return (
        <div className='homeBar'><Bar data={chartData} /></div>
    )
}

export default HomeBar