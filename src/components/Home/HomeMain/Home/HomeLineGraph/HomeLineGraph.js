import React from 'react'
import './HomeLineGraph.css'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
const HomeLineGraph = ({ chartData }) => {
    return (
        <div className='homeGraph'><Line data={chartData} /></div>
    )
}

export default HomeLineGraph