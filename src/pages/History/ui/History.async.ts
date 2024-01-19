import { lazy } from "react";

export const History = lazy(() => {
  const timer = new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  return timer.then(() => import('./History'));
});