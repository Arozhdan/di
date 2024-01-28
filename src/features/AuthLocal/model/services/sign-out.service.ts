import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { userActions } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface SignoutResponse {
  message: string;
}

export const signout = createAsyncThunk<
  undefined,
  undefined,
  ThunkConfig<string>
>('auth/signout', async (_, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const response = await extra.api.post<SignoutResponse>("/users/logout");
    console.log(response.data);

    if (!response.data || !response.data.message) {
      throw new Error()
    }
    dispatch(userActions.reset());

  } catch (error) {
    console.log('Error signing in: ', error);

    return rejectWithValue('Error signing in. Please try again.');
  }
});
