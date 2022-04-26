import { createSlice } from '@reduxjs/toolkit';

const initialTags = ['NGNG'];

export const tagSlice = createSlice({
    name: "tag",
    initialState: { tags: initialTags},
    reducers: {
        addTag: (state, action) => {
          state.tags = action.payload;
        },
        deleteTag: (state, action) => {
          state.tags = action.payload;
        },
        initializeTag: (state) => {
          state.tags = initialTags;
        }
    },
});

export const { addTag } = tagSlice.actions;
export const { deleteTag } = tagSlice.actions;
export const { initializeTag } = tagSlice.actions;
export default tagSlice.reducer;