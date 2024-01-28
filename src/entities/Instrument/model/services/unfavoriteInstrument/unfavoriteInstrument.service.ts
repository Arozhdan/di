import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Instrument } from "../../types/instrument.interface";
import { userActions } from "@/entities/User";
import { toast } from "sonner";
import { favoriteInstrument } from "../favoriteInstrument/favoriteInstrument.service";

export const unfavoriteInstrument = createAsyncThunk<
  void,
  Instrument,
  ThunkConfig<string>
>("instrument/unfavorite", async (instrument, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const response = await extra.api.get(
      "/instruments/" + instrument.id + "/unlike"
    );

    if (response.status !== 200) {
      throw new Error();
    }

    dispatch(userActions.removeFromFavorites(instrument));
    toast(`"${instrument.name}"` + " has been removed from favorites", {
      action: {
        label: "Undo",
        onClick: () => {
          dispatch(favoriteInstrument(instrument));
        },
      },
    });
  } catch (error) {
    console.log("Error fetching instruments: ", error);

    return rejectWithValue("Error to unfavorite instrument. Please try again.");
  }
});
