export interface AuthLocalSchema {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  verificatioSent?: boolean;
}