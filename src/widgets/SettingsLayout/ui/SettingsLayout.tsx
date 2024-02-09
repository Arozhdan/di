import { RoutePath } from "@/app/providers/Router";
import { Typography } from "@/shared/components/Typography/Typography";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn, useMediaQuery } from "@/shared/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SettingsLayout: FC<Props> = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isSmallMobile = useMediaQuery("(max-width: 400px)");
  const { t } = useTranslation();
  return (
    <div className="w-full mx-auto px-4 lg:px-8 pt-2 lg:pt-6 h-screen overflow-y-auto overflow-x-hidden pb-10">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: "link", size: "sm" }),
          "p-0 group"
        )}
      >
        <ArrowLeftIcon size={14} className="mr-2 group-hover:scale-95" />
        {t("settings.back_to_dashboard")}
      </Link>
      <Typography variant="pageTitle">{t("general.settings")}</Typography>
      <Typography className="text-gray-500 border-b pb-4 mb-2 lg:mb-6">
        {t("settings.settings_subtitle")}
      </Typography>
      <div className="lg:flex">
        <div className="flex justify-between lg:space-y-1 lg:w-64 lg:block mb-6 lg:mb-0 lg:mr-10">
          <NavLink
            to={RoutePath.profile_settings}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: isActive ? "default" : "ghost",
                  size: isMobile ? "sm" : "lg",
                }),
                "w-full lg:justify-start",
                {
                  "px-1": isSmallMobile,
                }
              )
            }
          >
            {t("general.profile")}
          </NavLink>
          <NavLink
            to={RoutePath.appearance_settings}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: isActive ? "default" : "ghost",
                  size: isMobile ? "sm" : "lg",
                }),
                "w-full lg:justify-start",
                {
                  "px-1": isSmallMobile,
                }
              )
            }
          >
            {t("general.appearance")}
          </NavLink>
          <NavLink
            to={RoutePath.notifications_settings}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: isActive ? "default" : "ghost",
                  size: isMobile ? "sm" : "lg",
                }),
                "w-full lg:justify-start",
                {
                  "px-1": isSmallMobile,
                }
              )
            }
          >
            {t("general.notifications")}
          </NavLink>
          <NavLink
            to={RoutePath.billing_settings}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: isActive ? "default" : "ghost",
                  size: isMobile ? "sm" : "lg",
                }),
                "w-full lg:justify-start",
                {
                  "px-1": isSmallMobile,
                }
              )
            }
          >
            {t("general.billing")}
          </NavLink>
        </div>
        {children}
      </div>
    </div>
  );
};

export const withSettingsLayout = (Component: FC) => {
  return (props: React.ComponentProps<typeof Component>) => (
    <SettingsLayout>
      <Component {...props} />
    </SettingsLayout>
  );
};
