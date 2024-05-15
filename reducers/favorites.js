import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addPokemon: (state, action) => {
      state.value.push(action.payload);
    },
    removePokemon: (state, action) => {
      state.value = state.value.filter(
        (pokemon) => pokemon.name !== action.payload
      );
    },
  },
});

export const { addPokemon, removePokemon } = userSlice.actions;
export default userSlice.reducer;
