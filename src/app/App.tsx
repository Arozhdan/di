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
import { fetchSubscription } from "@/entities/Subscription/model/services/fetchSubscription.service";
import { StateSchema } from "./providers/StoreProvider/config/state.schema";

function App() {
  const dispatch = useAppDispatch();
  const inited = useSelector(selectAuthInited);
  const isAuthenticated = useSelector(selectAuthenticated);
  const userId = useSelector(
    (state: StateSchema) => state.user.user?.id
  ) as string;
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { i18n } = useTranslation();

  const anonymousPaths = [
    RoutePath.signup,
    RoutePath.signin,
    RoutePath.reset_password,
  ];

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !anonymousPaths.includes(path) && inited) {
      navigate(RoutePath.signin);
    }
    if (isAuthenticated && inited) {
      dispatch(fetchSubscription(userId));
      dispatch(fetchInstruments());
      dispatch(fetchSiteSettings());
      dispatch(fetchHistory(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, inited, i18n.language, userId]);

  return <Suspense fallback="">{inited && <AppRouter />}</Suspense>;
}

export default App;
