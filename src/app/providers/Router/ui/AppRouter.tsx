import { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoutesProps, routeConfig } from "../config/router.config";
import { RequireAuth } from "./RequireAuth";
import { Layout } from "@/widgets/Layout";
import { PageLoader } from "@/widgets/Loader";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );
    const withLayout = route.withLayout;

    const Element = withLayout ? <Layout>{element}</Layout> : element;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{Element}</RequireAuth> : Element
        }
      />
    );
  }, []);

  return (
    <>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </>
  );
};

export default memo(AppRouter);
