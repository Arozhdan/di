export type { AuthLocalSchema } from './model/types/auth-local.schema'
export { signinLocal } from './model/services/singin-local.service'
export { signupLocal } from './model/services/signup-local.service'
export { signout } from './model/services/sign-out.service'
export { verifyEmail } from './model/services/verify.service'

export { selectIsLocalSigninLoading } from './model/selectors/selectIsLocalSigninLoading/selectIsLocalSigninLoading'
export { selectLocalAuthError } from './model/selectors/selectLocalSigninError/selectLocalAuthError'
export { selectIsVerificationSent } from './model/selectors/selectIsVerificationSent/selectIsVerificationSent'

export { authLocalReducer, authLocalActions } from './model/slice/auth-local.slice'
