import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  showAddHoldingModal: boolean;
}

const initialState: ModalState = {
  showAddHoldingModal: false,
};

const addModalSlice = createSlice({
    name: 'addModal',
    initialState,
    reducers: {
        toggleAddHoldingModal(state){
            state.showAddHoldingModal = !state.showAddHoldingModal;
        },
        openAddHoldingModal(state){
            state.showAddHoldingModal = true;
        },
        closeAddHoldingModal(state){
            state.showAddHoldingModal = false;
        }
    }
})

export const {
    toggleAddHoldingModal, 
    openAddHoldingModal,
    closeAddHoldingModal
} = addModalSlice.actions;
export default addModalSlice.reducer;