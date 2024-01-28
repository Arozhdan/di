export interface SigninLocalSchema {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
}