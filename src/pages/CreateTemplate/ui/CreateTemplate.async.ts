import { lazy } from 'react';

export const CreateTemplate = lazy(() => {
  const timer = new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return timer.then(() => import('./CreateTemplate'));
});