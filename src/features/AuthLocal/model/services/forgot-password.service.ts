import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";


interface ForgotPasswordResponse {
  message: string;
}

export const forgotPassword = createAsyncThunk<
  void,
  string,
  ThunkConfig<string>
>('auth/forgotPassword', async (email, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  const i18n = extra.i18n;
  try {
    const response = await extra.api.post<ForgotPasswordResponse>("/users/forgot-password/", {
      email
    });
    console.log(response.data);

    if (!response.data.message || response.status !== 200) {
      throw new Error()
    }

    toast.success(i18n.t('auth.forgotPassword.requestSuccess'), {
      description: i18n.t('auth.forgotPassword.requestSuccessDescription'),
    });

  } catch (error) {
    toast.error(i18n.t('auth.forgotPassword.requestError'), {
      description: i18n.t('auth.forgotPassword.requestErrorDescription'),
    });
    if (axios.isAxiosError(error)) {
      console.log('error', error);

      return rejectWithValue(error.response?.data?.errors[0]?.message || 'Error signing in. Please try again.');
    }
    console.log('Error signing in: ', error);

    return rejectWithValue('Error signing in. Please try again.');
  }
});
