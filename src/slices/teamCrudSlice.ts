import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { Pokemon } from "../interfaces/interfaces";

export interface TeamState {
  currentTeam: Pokemon[];
  selectedPokemon: Pokemon | null;
  savedTeams: Pokemon[][];
}

const initialState: TeamState = {
  currentTeam: [],
  selectedPokemon: null,
  savedTeams: [],
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPokemon: (state, action) => {
      if (state.currentTeam.length < 6) state.currentTeam.push(action.payload);
    },
    removePokemon: (state, action) => {
      const index = state.currentTeam.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.currentTeam.splice(index, 1);
      }
    },
    updatePokemon: (state, action) => {
      const index = state.currentTeam.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.currentTeam[index] = action.payload;
      }
    },
    saveTeam: (state) => {
      if (state.savedTeams.length < 10)
        state.savedTeams.push(state.currentTeam);
    },
  },
});

export const { addPokemon, removePokemon, updatePokemon, saveTeam } =
  teamSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default teamSlice.reducer;
