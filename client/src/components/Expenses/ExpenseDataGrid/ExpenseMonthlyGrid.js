import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, } from '@mui/x-data-grid';
import { useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },

  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 110,
    editable: true,
  },

  {
    field: 'amount',
    headerName: 'Expense',
    width: 160,
    type: 'number'

  },
];


export default function ExpenseMonthlyGrid() {
  const [page, setPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(2)
  
  const handlePageChanged = async () => {
    try {
      const token = localStorage.getItem('token')

      let reqInstance = await axios.create({
        headers: {
          Authorization: token
        }
      })
      const res = await reqInstance.get(`http://localhost:4000/expense/get-monthlyexpenses?page=${page}&pageSize=${rowPerPage}`)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  const allExpenses = useSelector(state => state.expenses.expenses)

  return (
    <>
      <h5>Monthly</h5>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={allExpenses}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[10,25,50,100]}
          slots={{ toolbar: GridToolbar }}
          // hideFooter={true}
          sx={{
            width: '800px',
            padding: '5px',
            boxShadow: 2,

            backgroundColor: 'white'
          }}

        />
      </Box>
      {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "20px" }}>
        <Pagination count={10} variant="outlined" onChange={handlePageChanged} />

      </div> */}

    </>

  );
}