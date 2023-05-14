import React, { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'month',
    headerName: 'Month',
    width: 150,
    editable: true,
  },
  {
    field: 'expense',
    headerName: 'Expense',
    type: 'number',
    width: 110,
    editable: true,
  },

];

const rows = [
  { id: 1, month: 'March', income: 20000, expense: 5000, savings: 15000 },

];

export default function ExpenseYearlyGrid() {
  const [yearlyData,setYearlyData]=useState([])
  const getYearlyExpense = async () => {
    try {
      const token = localStorage.getItem('token')

      let reqInstance = await axios.create({
        headers: {
          Authorization: token
        }
      })
      const response = await reqInstance.get('http://localhost:4000/expense/get-yearlyexpense')
      const data = response.data.data
      setYearlyData(data)
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getYearlyExpense()
  }, [])
  return (
    <>
      <h5>Yearly</h5>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={yearlyData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}


          pageSizeOptions={[10, 25, 50, 100]}
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
      {/* <div style={{display:'flex', alignItems :'center', marginTop:"20px",justifyContent:'center'}}>
    <Pagination count={10} variant="outlined" />

    </div> */}

    </>

  );
}












































