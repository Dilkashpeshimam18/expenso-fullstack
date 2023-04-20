import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, } from '@mui/x-data-grid';

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

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },

        {
            field: 'name',
            headerName: 'Name',
            width: 150,

        },
        {
            field: 'total_expense',
            headerName: 'Total Expense',
            width: 110,
            editable: true,
        },

    ];

    return (
        <div>
            <h5>Leaderboard</h5>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={leaderBoardData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    sx={{
                        width: '800px',
                        padding: '5px',
                        boxShadow: 2,

                        backgroundColor: 'white'
                    }}

                />
            </Box>
        </div>
    )
}

export default Leaderboard