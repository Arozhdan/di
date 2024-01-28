import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { User, userActions } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface SigninLocalProps {
  email: string;
  password: string;
}


interface SigninLocalResponse {
  exp: number;
  message: string;
  token: string;
  user: User;
}

export const signinLocal = createAsyncThunk<
  User,
  SigninLocalProps,
  ThunkConfig<string>
>('auth/signinLocal', async (authData, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const response = await extra.api.post<SigninLocalResponse>("/users/login", {
      email: authData.email,
      password: authData.password,
    });
    console.log(response.data);

    if (!response.data || !response.data.user) {
      throw new Error()
    }


    const user = response.data.user;
    dispatch(userActions.setUser(user))

    return user;

  } catch (error) {
    console.log('Error signing in: ', error);

    return rejectWithValue('Error signing in. Please try again.');
  }
});
