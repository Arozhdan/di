import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { User, userActions } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";



interface SigninLocalResponse {
  exp: number;
  collection: string;
  token: string;
  user: User;
}

export const initAuth = createAsyncThunk<
  User,
  undefined,
  ThunkConfig<string>
>('auth/initAuth', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.get<SigninLocalResponse>('/users/me');
    if (!response.data || !response.data.user) {
      throw new Error()
    }
    const user = response.data.user;
    userActions.setUser(user);

    return user;

  } catch (error) {
    console.log('Error signing in: ', error);

    return rejectWithValue('Error signing in. Please try again.');
  }
});
