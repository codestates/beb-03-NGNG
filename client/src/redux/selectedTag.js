import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const initialSelectedTag = '';

export const selectedTagSlice = createSlice({
    name: "selectedTag",
    initialState: { tag: initialSelectedTag},
    reducers: {
        selectTag: (state, action) => {
          state.tag = action.payload;
        },
        unSelectTag: (state) => {
          state.tag = initialSelectedTag;
        }
    },
});

export const { selectTag } = selectedTagSlice.actions;
export const { unSelectTag } = selectedTagSlice.actions;
export default selectedTagSlice.reducer;