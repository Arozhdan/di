import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { User, userActions } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";


interface UpdateUserInfoArgs {
  id: string;
  username: string;
  phone: string;
  address: string;
}

interface UpdateUserInfoResponse {
  message: string;
  user: User;
}

export const updateUserInfo = createAsyncThunk<
  User,
  UpdateUserInfoArgs,
  ThunkConfig<string>
>('user/updateData', async (userData, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.patch<UpdateUserInfoResponse>('/users/' + userData.id, {
      username: userData.username,
      phone: userData.phone,
      address: userData.address,
    });
    if (!response.data || !response.data.message) {
      throw new Error()
    }
    const user = response.data.user;
    userActions.setUser(user);

    toast.success(response.data.message);

    return user;

  } catch (error) {
    console.log('Error signing in: ', error);

    return rejectWithValue('Error signing in. Please try again.');
  }
});
