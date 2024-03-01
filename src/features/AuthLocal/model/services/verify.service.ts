import { RoutePath } from "@/app/providers/Router";
import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";


interface SigninLocalResponse {
  message: string;
}

export const verifyEmail = createAsyncThunk<
  void,
  string,
  ThunkConfig<string>
>('auth/verifyEmail', async (token, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.post<SigninLocalResponse>("/users/verify/" + token);
    console.log(response.data);

    if (!response.data.message || response.status !== 200) {
      throw new Error()
    }

    toast.success('Почта успешно подтверждена', {
      action: {
        label: 'Войти',
        onClick: () => {
          window.location.href = RoutePath.signin
        }
      }
    });

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error', error);

      return rejectWithValue(error.response?.data?.errors[0]?.message || 'Error signing in. Please try again.');
    }
    console.log('Error signing in: ', error);

    return rejectWithValue('Error signing in. Please try again.');
  }
});
