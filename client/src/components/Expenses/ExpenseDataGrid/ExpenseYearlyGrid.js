import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid , GridToolbar, } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'month',
    headerName: 'Month',
    width: 150,
    editable: true,
  },
  {
    field: 'income',
    headerName: 'Income',
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
  {
    field: 'savings',
    headerName: 'Savings',
    width: 160,
    type:'number'
  
  },
];

const rows = [
  { id: 1, month: 'March', income:20000, expense:5000, savings:15000},

];

export default function ExpenseYearlyGrid() {
  return (
    <>
    <h5>Yearly</h5>
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
        slots={{ toolbar: GridToolbar }}
        sx={{width:'800px',
        padding:'5px',
        boxShadow: 2,
      
        backgroundColor:'white'
      }}

      />
    </Box>
    </>

  );
}