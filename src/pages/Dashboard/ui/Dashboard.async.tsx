import { lazy } from "react";

export const Dashboard = lazy(
  () => import(/* webpackChunkName: "Main" */ "./Dashboard")
);
