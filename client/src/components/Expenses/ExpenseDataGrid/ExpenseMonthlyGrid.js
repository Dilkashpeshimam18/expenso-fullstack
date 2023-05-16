import React, { useState, useEffect } from 'react';
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


export default function ExpenseMonthlyGrid({rowPerPage}) {
  const [page, setPage] = useState(1)
  const [pageExpense, setPageExpense] = useState([])
  const [lastPage, setLastPage] = useState(0)


  const handlePageChanged = async (event, value) => {
    try {
      let pageNumber;
      if (value == undefined) {
        pageNumber = 1
        setPage(pageNumber)

      } else {
        pageNumber = value
        setPage(pageNumber)

      }

      const token = localStorage.getItem('token')

      let reqInstance = await axios.create({
        headers: {
          Authorization: token
        }
      })

      const res = await reqInstance.get(`http://localhost:4000/expense/get-monthlyexpenses?page=${pageNumber}&rowPerPage=${rowPerPage}`)
      setPageExpense(res.data.expense)
      setLastPage(res.data.lastPage)
    } catch (err) {
      console.log(err)
    }
  }
  const allExpenses = useSelector(state => state.expenses.expenses)

  useEffect(() => {
    handlePageChanged()

  }, [rowPerPage])


  return (
    <>
      <h5>Monthly</h5>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={pageExpense}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          hideFooter={true}
          sx={{
            width: '800px',
            padding: '5px',
            boxShadow: 2,

            backgroundColor: 'white'
          }}

        />
      </Box>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: "20px", justifyContent: 'center' }}>
        <Pagination count={lastPage} page={page} onChange={handlePageChanged} variant="outlined" />

      </div>

    </>

  );
}