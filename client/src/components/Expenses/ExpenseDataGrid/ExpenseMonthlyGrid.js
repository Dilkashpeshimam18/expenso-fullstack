import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, } from '@mui/x-data-grid';
import { useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination';

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
  // {
  //   field: 'income',
  //   headerName: 'Income',
  //   width: 160,
  //   type:'number'

  // },
  {
    field: 'amount',
    headerName: 'Expense',
    width: 160,
    type: 'number'

  },
];

const rows = [
  { id: 1, description: 'Imagica', category: 'Entertainment', income: 20000, expense: 1000, savings: 19000 },

];

export default function ExpenseMonthlyGrid() {
  const allExpenses = useSelector(state => state.expenses.expenses)
  console.log(allExpenses)
  return (
    <>
      <h5>Monthly</h5>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={allExpenses}
          columns={columns}
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 10,
          //     },
          //   },
          // }}
          // pageSizeOptions={[10,25,50,100]}
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
      <div style={{display:'flex', alignItems :'center',justifyContent:'center', marginTop:"20px"}}>
        <Pagination count={10} variant="outlined" />

      </div>

    </>

  );
}