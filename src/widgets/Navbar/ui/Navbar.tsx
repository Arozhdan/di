import { FC, memo, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { cn, useAppDispatch, useMediaQuery } from "@/shared/lib/utils";

import {
  BookMarkedIcon,
  BotIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  MessagesSquareIcon,
  SearchIcon,
  Settings2Icon,
} from "lucide-react";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { RoutePath } from "@/app/providers/Router";
import { Link } from "react-router-dom";
import { Progress } from "@/shared/components/ui/progress";
import { GlobalSearch } from "@/features/GlobalSearch";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectSubscription } from "@/entities/Subscription";
import { selectUser } from "@/entities/User";
import { signout } from "@/features/AuthLocal";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const MobileNavigation = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const subscription = useSelector(selectSubscription);
  const user = useSelector(selectUser);
  const subAllowance =
    subscription?.tier?.allowance === -1
      ? "∞"
      : subscription?.tier?.allowance || 0;
  const persentage =
    typeof subAllowance === "string"
      ? 0
      : Math.ceil(((user?.monthlyQueries || 0) * 100) / subAllowance);
  const links = [
    {
      title: t("general.dashboard"),
      url: RoutePath.main,
      icon: LayoutDashboardIcon,
    },
    {
      title: t("general.instruments"),
      url: RoutePath.instruments,
      icon: BotIcon,
    },
    {
      title: t("general.history"),
      url: RoutePath.history,
      icon: BookMarkedIcon,
    },
    {
      title: t("general.settings"),
      url: RoutePath.profile_settings,
      icon: Settings2Icon,
    },
    {
      title: t("general.chatPRO"),
      url: RoutePath.chat,
      icon: MessagesSquareIcon,
    },
  ];
  return (
    <Sheet>
      <SheetTrigger>
        <Button size="sm">
          {t("general.menu")}
          <MenuIcon className="ml-2 h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetDescription asChild>
          <div className="h-screen flex flex-col justify-between py-10">
            <div className="block space-y-4">
              {links.map((link) => (
                <Link
                  key={link.url}
                  to={link.url}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full justify-start items-center"
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </Link>
              ))}
              <Button
                className="w-full justify-start items-center"
                variant="destructive"
                onClick={() => dispatch(signout())}
              >
                <LogOutIcon size={12} className="mr-2" />
                {t("general.sign_out")}
              </Button>
            </div>
            <div>
              <div className="my-10">
                <div className="space-y-1 mb-3">
                  <b className="text-sm">{t("general.my_usage")}:</b>
                  <br />
                  <small className="text-xs">
                    ({user?.monthlyQueries || 0} / {subAllowance})
                  </small>
                  <Progress value={persentage} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

const Navbar: FC<Props> = ({ children, className, ...props }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const classes = cn(styles.navbar, className);
  const isWindows = navigator.platform?.includes("Win");

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (isWindows ? e.ctrlKey : e.metaKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isWindows]);

  return (
    <>
      <div className={classes} {...props}>
        <div className={styles.slot}>{children}</div>
        <div
          className={cn({
            "ml-auto": !isMobile,
          })}
        >
          <Button
            size="sm"
            variant={isMobile ? "secondary" : "default"}
            className={styles.searchButton}
            onClick={() => setOpen(true)}
          >
            {t("general.search")}
            <kbd className="text-xs hidden md:inline">
              ({isWindows ? "Ctrl + K" : "⌘ + K"})
            </kbd>
            <SearchIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div
          className={cn({
            "ml-auto": isMobile,
            hidden: !isMobile,
          })}
        >
          <MobileNavigation />
        </div>
      </div>
      <GlobalSearch open={open} setOpen={setOpen} />
    </>
  );
};

export default memo(Navbar);
