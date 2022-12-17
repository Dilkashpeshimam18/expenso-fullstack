import React from 'react'
import './HomePieChart.css'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
const HomePieChart = ({ chartData }) => {
    return (
        <div className='homeChart'><Doughnut data={chartData} /></div>
    )
}

export default HomePieChart