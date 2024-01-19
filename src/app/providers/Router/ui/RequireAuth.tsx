// import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePath } from "../config/router.config";

export function RequireAuth({ children }: { children: JSX.Element }) {
  // const auth = useSelector(getUserAuthData)
  const auth = { jwt: true };

  const location = useLocation();

  if (!auth.jwt) {
    return (
      <Navigate to={RoutePath.not_found} state={{ from: location }} replace />
    );
  }

  return children;
}
