// import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePath } from "../config/router.config";
import { selectUser } from "@/entities/User";
import { useSelector } from "react-redux";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useSelector(selectUser);

  const location = useLocation();

  if (!user?.email) {
    return (
      <Navigate to={RoutePath.signin} state={{ from: location }} replace />
    );
  }

  return children;
}
