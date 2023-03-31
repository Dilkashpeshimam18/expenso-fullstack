import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Leaderboard = () => {
    const [leaderBoardData, setLeaderBoardData] = useState([])
    const fetchLeaderboard = async () => {
        try {
            const token = localStorage.getItem('token')

            let reqInstance = await axios.create({
                headers: {
                    Authorization: token
                }
            })
            const data = await reqInstance.get('http://localhost:4000/premium/show-leaderboard')
            setLeaderBoardData(data.data.data)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchLeaderboard()
    }, [])

    return (
        <div>Leaderboard

            <ul>
                {
                    leaderBoardData.map((data) => {
                        return <li>Name: {data.name} - Total Expense: {data.total_expense}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Leaderboard