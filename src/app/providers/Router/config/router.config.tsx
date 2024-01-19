import { RouteProps } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { Instruments } from "@/pages/Instruments";
import { History } from "@/pages/History";
import { Templates } from "@/pages/Templates";
import {
  AppearanceSettings,
  BillingSettings,
  NotificationsSettings,
  ProfileSettings,
  Subscriptions,
} from "@/pages/Settings";
import { SingleInstrument } from "@/pages/SingleInstrument";
import { Query } from "@/pages/Query";
import { CreateTemplate } from "@/pages/CreateTemplate";
import { Chat } from "@/pages/Chat";
import { SingleTemplate } from "@/pages/SingleTemplate";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  withLayout?: boolean;
};

export enum AppRoutes {
  MAIN = "main",
  INSTRUMENTS = "instruments",
  INSTRUMENT = "instrument",
  HISTORY = "history",
  QUERY = "query",
  TEMPLATES = "templates",
  TEMPLATE = "template",
  CREATE_TEMPLATE = "create_template",
  SETTINGS_PROFILE = "profile_settings",
  SETTINGS_APPEARANCE = "appearance_settings",
  SETTINGS_NOTIFICATIONS = "notifications_settings",
  SETTINGS_BILLING = "billing_settings",
  SETTINGS_SUBSCRIPTIONS = "subscriptions_settings",
  CHAT = "chat",

  // last
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.INSTRUMENTS]: "/instruments",
  [AppRoutes.INSTRUMENT]: "/instruments/:id",
  [AppRoutes.HISTORY]: "/history",
  [AppRoutes.QUERY]: "/history/:id",
  [AppRoutes.TEMPLATES]: "/templates",
  [AppRoutes.TEMPLATE]: "/templates/:id",
  [AppRoutes.CREATE_TEMPLATE]: "/templates/create",
  [AppRoutes.SETTINGS_PROFILE]: "/settings/profile",
  [AppRoutes.SETTINGS_APPEARANCE]: "/settings/appearance",
  [AppRoutes.SETTINGS_NOTIFICATIONS]: "/settings/notifications",
  [AppRoutes.SETTINGS_BILLING]: "/settings/billing",
  [AppRoutes.SETTINGS_SUBSCRIPTIONS]: "/settings/billing/subscriptions",
  [AppRoutes.CHAT]: "/chat",

  // последний
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    authOnly: true,
    element: <Dashboard />,
    withLayout: true,
  },
  [AppRoutes.INSTRUMENTS]: {
    path: RoutePath.instruments,
    authOnly: true,
    element: <Instruments />,
    withLayout: true,
  },
  [AppRoutes.INSTRUMENT]: {
    path: RoutePath.instrument,
    authOnly: true,
    element: <SingleInstrument />,
    withLayout: true,
  },
  [AppRoutes.HISTORY]: {
    path: RoutePath.history,
    authOnly: true,
    element: <History />,
    withLayout: true,
  },
  [AppRoutes.QUERY]: {
    path: RoutePath.query,
    authOnly: true,
    element: <Query />,
    withLayout: true,
  },
  [AppRoutes.TEMPLATES]: {
    path: RoutePath.templates,
    authOnly: true,
    element: <Templates />,
    withLayout: true,
  },
  [AppRoutes.TEMPLATE]: {
    path: RoutePath.template,
    authOnly: true,
    element: <SingleTemplate />,
    withLayout: true,
  },
  [AppRoutes.CREATE_TEMPLATE]: {
    path: RoutePath.create_template,
    authOnly: true,
    element: <CreateTemplate />,
    withLayout: true,
  },
  [AppRoutes.SETTINGS_PROFILE]: {
    path: RoutePath.profile_settings,
    authOnly: true,
    element: <ProfileSettings />,
  },
  [AppRoutes.SETTINGS_APPEARANCE]: {
    path: RoutePath.appearance_settings,
    authOnly: true,
    element: <AppearanceSettings />,
  },
  [AppRoutes.SETTINGS_NOTIFICATIONS]: {
    path: RoutePath.notifications_settings,
    authOnly: true,
    element: <NotificationsSettings />,
  },
  [AppRoutes.SETTINGS_BILLING]: {
    path: RoutePath.billing_settings,
    authOnly: true,
    element: <BillingSettings />,
  },
  [AppRoutes.SETTINGS_SUBSCRIPTIONS]: {
    path: RoutePath.subscriptions_settings,
    authOnly: true,
    element: <Subscriptions />,
  },
  [AppRoutes.CHAT]: {
    path: RoutePath.chat,
    authOnly: true,
    element: <Chat />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: (
      <div className="flex flex-col items-center justify-center h-full">
        <h1>404</h1>
        <p>Page not found</p>
        <a href="/" className="mt-2 text-blue-500 hover:underline">
          Go to main page
        </a>
      </div>
    ),
  },
};
