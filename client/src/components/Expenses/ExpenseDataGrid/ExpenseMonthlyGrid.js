import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,  GridToolbar, } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },

  {
    field: 'description',
    headerName: 'Description',
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
    field: 'income',
    headerName: 'Income',
    width: 160,
    type:'number'
  
  },
  {
    field: 'expense',
    headerName: 'Expense',
    width: 160,
    type:'number'
  
  },
];

const rows = [
  {  id: 1,description: 'Imagica',category:'Entertainment', income:20000, expense:1000, savings:19000},

];

export default function ExpenseMonthlyGrid() {
  return (
    <>
    <h5>Monthly</h5>
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}

      />
    </Box>
    </>

  );
}