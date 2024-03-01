import { useSelector } from "react-redux";
import { AppRouter, RoutePath } from "./providers/Router";
import {
  initAuth,
  selectAuthInited,
  selectAuthenticated,
} from "@/entities/User";
import { Suspense, useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchInstruments } from "@/entities/Instrument";
import { fetchSiteSettings } from "@/entities/SiteSettings";
import { fetchHistory } from "@/entities/History";
import { useTranslation } from "react-i18next";

function App() {
  const dispatch = useAppDispatch();
  const inited = useSelector(selectAuthInited);
  const isAuthenticated = useSelector(selectAuthenticated);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated && inited && path !== RoutePath.signup) {
      navigate(RoutePath.signin);
    }
    if (isAuthenticated && inited) {
      dispatch(fetchInstruments());
      dispatch(fetchSiteSettings());
      dispatch(fetchHistory());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, inited, i18n.language]);

  return <Suspense fallback="">{inited && <AppRouter />}</Suspense>;
}

export default App;
