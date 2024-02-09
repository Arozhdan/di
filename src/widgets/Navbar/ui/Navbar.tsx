import { FC, memo, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { cn, useMediaQuery } from "@/shared/lib/utils";

import {
  BookMarkedIcon,
  BotIcon,
  LayoutDashboardIcon,
  MenuIcon,
  MessagesSquareIcon,
  PencilRulerIcon,
  SearchIcon,
  Settings2Icon,
} from "lucide-react";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { RoutePath } from "@/app/providers/Router";
import { Link } from "react-router-dom";
import { Progress } from "@/shared/components/ui/progress";
import { GlobalSearch } from "@/features/GlobalSearch";
import { useTranslation } from "react-i18next";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const links = [
  {
    title: "Dashboard",
    url: RoutePath.main,
    icon: LayoutDashboardIcon,
  },
  {
    title: "Instruments",
    url: RoutePath.instruments,
    icon: BotIcon,
  },
  {
    title: "History",
    url: RoutePath.history,
    icon: BookMarkedIcon,
  },
  {
    title: "Templates",
    url: RoutePath.templates,
    icon: PencilRulerIcon,
  },
  {
    title: "Settings",
    url: RoutePath.profile_settings,
    icon: Settings2Icon,
  },
  {
    title: "ChatPRO",
    url: RoutePath.chat,
    icon: MessagesSquareIcon,
  },
];

const MobileNavigation = () => {
  const { t } = useTranslation();
  return (
    <Sheet>
      <SheetTrigger>
        <Button size="sm">
          {t("general.menu")}
          <MenuIcon className="ml-2 h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="h-screen flex flex-col">
        <SheetHeader>
          <SheetTitle>{t("general.menu")}</SheetTitle>
        </SheetHeader>
        <SheetDescription asChild>
          <div className="flex-1 flex flex-col">
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
            </div>
            <div className="mt-auto">
              <div className="mt-10">
                <div className="space-y-1 mb-3">
                  <b className="text-sm">Subscription:</b> <br />
                  <Link className="underline" to="/">
                    Basic Subscription
                  </Link>
                </div>
                <div className="space-y-1">
                  <b className="text-sm">{t("general.my_usage")}</b>
                  <br />
                  <small className="text-xs">(33 / 100)</small>
                  <Progress value={33} className="h-2" />
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
