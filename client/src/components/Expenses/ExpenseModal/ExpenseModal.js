import React, { useEffect } from 'react'
import './ExpenseModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { expenseActions } from '../../../store/slice/expense-slice'
import { modalActions } from '../../../store/slice/modal-slice'
import { updateExpenseData, postExpenseData } from '../../../store/slice/expense-slice'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ExpenseModal = ({ amount, desc, category, setAmount, setDesc, setCategory, handleCategory, getInitialState }) => {

    const isEdit = useSelector(state => state.expenses.isEdit)
    const expId = useSelector(state => state.expenses.expenseId)
    const open = useSelector(state => state.modal.open)
    const dispatch = useDispatch()
    const expense = useSelector(state => state.expenses.expenses)
    const isNew = useSelector(state => state.modal.addNew)
    const userEmail = useSelector(state => state.auth.userEmail)

    const handleAddExpenseForm = (e) => {
        e.preventDefault();

        if (isEdit == true) {
            const data = {
                amount: amount,
                description: desc,
                category: category
            }
            let editexp = {
                id: expId,
                expense: data
            }
            dispatch(updateExpenseData(editexp))


            setAmount(0)
            setDesc('')
            setCategory(getInitialState)

            dispatch(expenseActions.isNotEditExpense())


        } else {
            const data = {
                amount: amount,
                description: desc,
                category: category,
                email:userEmail
            }
            dispatch(postExpenseData(data))

            setAmount(0)
            setDesc('')
            setCategory(getInitialState)

        }


    }
    useEffect(() => {
        if (isNew == true) {
            setAmount(0)
            setDesc('')
            setCategory(getInitialState)
        }

    }, [isNew])
    return (
        <div>
            <Dialog open={open} onClose={() => dispatch(modalActions.handleClose())}>
                <DialogTitle>Add Expense</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={amount}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <FormControl style={{ marginTop: '22px' }} fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleCategory}
                        >
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Entertainment">Entertainment</MenuItem>
                            <MenuItem value="Daily Need">Daily Need</MenuItem>
                            <MenuItem value="Clothing">Clothing</MenuItem>
                            <MenuItem value="Accessories">Accessories</MenuItem>

                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => dispatch(modalActions.handleClose())}>CANCEL</Button>
                    <Button onClick={handleAddExpenseForm}>ADD</Button>
                </DialogActions>
            </Dialog>
            {/* <form onSubmit={handleAddExpenseForm} className="form-container">
                <div className="allInput">
                    <div className="form-input">
                        <h5>ADD EXPENSE</h5>
                        <input placeholder="Enter expense value..." type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="expense-input" />
                    </div>
                    <div className="form-input">
                        <h5>ADD DESCRIPTION</h5>
                        <input placeholder="Enter description..." type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="expense-description" />
                    </div>
                    <div className="form-input">
                        <h5>ADD CATEGORY</h5>
                        <select className="select-category" id="category" onChange={handleCategory}>
                            <option value="Food">Food</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Daily Need">Daily Need</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Accessories">Accessories</option>


                        </select>

                    </div>
                </div>

                <div className="form-input">
                    <input className="btn" type="submit" value="Add Expense" />

                </div>

            </form> */}
        </div>
    )
}

export default ExpenseModal