import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";


interface ResetPasswordResponse {
  message: string;
}

interface ResetPasswordProps {
  password: string;
  token: string;
}

export const resetPassword = createAsyncThunk<
  void,
  ResetPasswordProps,
  ThunkConfig<string>
>('auth/resetPassword', async (resetData, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  const i18n = extra.i18n;
  try {
    console.log('resetData', resetData);

    const response = await extra.api.post<ResetPasswordResponse>("/users/reset-password/",
      resetData
    );
    console.log(response.data);

    if (!response.data.message || response.status !== 200) {
      throw new Error()
    }

    toast.success(i18n.t('auth.resetPassword.success'), {
      description: i18n.t('auth.resetPassword.successDescription'),
      action: {
        label: i18n.t('auth.resetPassword.successAction'),
        onClick: () => {
          window.location.reload();
        },
      }
    });

  } catch (error) {
    toast.error(i18n.t('auth.resetPassword.error'), {
      description: i18n.t('auth.resetPassword.errorDescription'),
    });
    if (axios.isAxiosError(error)) {
      console.log('error', error);

      return rejectWithValue(error.response?.data?.errors[0]?.message || 'Error signing in. Please try again.');
    }
    console.log('Error signing in: ', error);

    return rejectWithValue('Error signing in. Please try again.');
  }
});
