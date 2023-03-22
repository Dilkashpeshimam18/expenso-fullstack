import { createSlice } from "@reduxjs/toolkit";


const initialModalState = {
    open: false,
    addNew: false

}

const ModalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        handleClickOpen(state) {
            state.open = true
        },

        handleClose(state) {
            state.open = false
        },
        handleAddNew(state) {
            state.addNew = true
        },
        handleisNotNew(state) {
            state.addNew = false
        }

    }
})

export const modalActions = ModalSlice.actions
export default ModalSlice.reducer