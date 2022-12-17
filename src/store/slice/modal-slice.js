import { createSlice } from "@reduxjs/toolkit";


const initialModalState = {
    open: false

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

    }
})

export const modalActions = ModalSlice.actions
export default ModalSlice.reducer