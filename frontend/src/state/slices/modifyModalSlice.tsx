import { Holding } from "@/models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    showModifyHoldingModal: boolean;
    holdingData: Holding | undefined;
}

const initialState: ModalState = {
    showModifyHoldingModal: false,
    holdingData: undefined
};

const modifyHoldingSlice = createSlice({
    name: 'modifyModal',
    initialState: initialState,
    reducers: {
        toggleModifyHoldingModal(state, action: PayloadAction<Holding | undefined>){
            state.showModifyHoldingModal = !state.showModifyHoldingModal;
            if(action.payload){
                state.holdingData = action.payload;
            } else {
                state.holdingData = undefined;
            }
        },
        openModifyHoldingModal(state, action: PayloadAction<Holding>){
            state.showModifyHoldingModal = true;
            state.holdingData = action.payload;
        },
        closeModifyHoldingModal(state){
            state.showModifyHoldingModal = false;
            state.holdingData = undefined;
        }
    }
});

export const {
    toggleModifyHoldingModal,
    openModifyHoldingModal,
    closeModifyHoldingModal
} = modifyHoldingSlice.actions;
export default modifyHoldingSlice.reducer;