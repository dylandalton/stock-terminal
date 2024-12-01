import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    showDeleteHoldingModal: boolean;
    symbolToDelete?: string;
}

const initialState: ModalState = {
    showDeleteHoldingModal: false,
    symbolToDelete: undefined
}

const deleteModalSlice = createSlice({
    name: 'deleteModal',
    initialState,
    reducers: {
        toggleDeleteHoldingModal(state, action: PayloadAction<string | undefined>){
            state.showDeleteHoldingModal = !state.showDeleteHoldingModal;
            state.symbolToDelete = action.payload;
        },
        openDeleteHoldingModal(state, action: PayloadAction<string>){
            state.showDeleteHoldingModal = true;
            state.symbolToDelete = action.payload;
        },
        closeDeleteHoldingModal(state){
            state.showDeleteHoldingModal = false;
        }
    }
})

export const {
    toggleDeleteHoldingModal,
    openDeleteHoldingModal,
    closeDeleteHoldingModal
} = deleteModalSlice.actions;
export default deleteModalSlice.reducer;