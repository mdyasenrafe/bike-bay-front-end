import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRental, TRentalState } from "./types";
import { RootState } from "../../store";

const initialState: TRentalState = {
  rentals: [],
};

const rentalSlice = createSlice({
  name: "rental",
  initialState,
  reducers: {
    addRental: (state, action: PayloadAction<TRental>) => {
      if (state.rentals) {
        state.rentals.push(action.payload);
      } else {
        state.rentals = [action.payload];
      }
    },
    deleteRental: (state, action: PayloadAction<string>) => {
      if (state.rentals) {
        state.rentals = state.rentals.filter(
          (rental) => rental._id !== action.payload
        );
      }
    },
    setRentals: (state, action: PayloadAction<TRental[]>) => {
      state.rentals = action.payload;
    },
    updateRental: (state, action: PayloadAction<TRental>) => {
      const index = state.rentals.findIndex(
        (rental) => rental._id === action.payload._id
      );
      if (index !== -1) {
        state.rentals[index] = action.payload;
      }
    },
  },
});

export const { addRental, deleteRental, setRentals, updateRental } =
  rentalSlice.actions;

export const useGetRentals = (state: RootState) => state.rental.rentals;

export default rentalSlice.reducer;
