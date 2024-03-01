import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { User } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

interface SignupLocalProps {
  email: string;
  password: string;
}


interface SignupLocalResponse {
  exp: number;
  doc: User;
}

export const signupLocal = createAsyncThunk<
  User,
  SignupLocalProps,
  ThunkConfig<string>
>('auth/signupLocal', async (authData, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.post<SignupLocalResponse>("/users", {
      email: authData.email,
      password: authData.password,
      username: authData.email,
    });
    console.log(response.data);

    if (!response.data || !response.data.doc) {
      throw new Error()
    }

    toast.info('Важно!', {
      description: 'Письмо с подтверждением регистрации отправлено на вашу почту. Пожалуйста, подтвердите регистрацию.'
    })


    const user = response.data.doc;
    return user;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error', error);

      return rejectWithValue(error.response?.data?.errors[0]?.message || 'Error signing up. Please try again.');
    }
    console.log('Error signing up: ', error);

    return rejectWithValue('Error signing up. Please try again.');
  }
});
