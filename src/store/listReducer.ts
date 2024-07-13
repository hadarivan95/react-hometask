import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IResult } from '../api/service';

interface ListState {
    data: IResult[];
    selectedType: string | null,

}
const initialState: ListState = {
    data: [],
    selectedType: null,
}

export const ListSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<IResult[]>) => {
            state.data = action.payload;
        },
        setSelectedType: (state, action: PayloadAction<string | null>) => {
            state.selectedType = action.payload;
        },
    },
})

export const { setData, setSelectedType } = ListSlice.actions

export default ListSlice.reducer