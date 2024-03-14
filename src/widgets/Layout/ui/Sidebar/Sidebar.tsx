import { cn, useAppDispatch } from "@/shared/lib/utils";
import { FC, memo } from "react";
import styles from "./Sidebar.module.css";
import { Link, NavLink } from "react-router-dom";
import { Button, buttonVariants } from "@components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/tooltip";
import {
  Globe2Icon,
  LightbulbIcon,
  LogOutIcon,
  LucideIcon,
  MoonIcon,
  SunMoonIcon,
} from "lucide-react";
import { Separator } from "@components/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@components/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@components/hover-card";
import { Avatar, AvatarFallback } from "@components/avatar";
import { Progress } from "@components/progress";
import { useTheme } from "@/app/providers/ThemeProvider";
import { RoutePath } from "@/app/providers/Router";
import { useSelector } from "react-redux";
import { User, selectUser } from "@/entities/User";
import { signout } from "@/features/AuthLocal";
import { useTranslation } from "react-i18next";
import { selectSubscription } from "@/entities/Subscription";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  links: {
    title: string;
    icon: LucideIcon;
    url: string;
    disabled?: boolean;
  }[];
}

const Sidebar: FC<Props> = ({ isCollapsed, className, links, ...props }) => {
  const { setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser) as User;
  const subscription = useSelector(selectSubscription);
  const subAllowance =
    subscription?.tier?.allowance === -1
      ? "∞"
      : subscription?.tier?.allowance || 0;
  const persentage =
    typeof subAllowance === "string"
      ? 0
      : Math.ceil((user?.monthlyQueries || 0) / subAllowance);
  const username = user.username || user.email;

  const classes = cn(styles.sidebar, className, {
    [styles.collapsed]: isCollapsed,
  });
  return (
    <div className={classes} {...props}>
      <Link to={"/"} className={styles.logo}>
        {isCollapsed ? (
          <img src="/logo-small.svg" alt="" />
        ) : (
          <img src="/logo.svg" alt="" />
        )}
      </Link>
      <div className={styles.content}>
        <div
          data-collapsed={isCollapsed}
          className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 h-full"
        >
          <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
            {links.map((link, index) =>
              isCollapsed ? (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger>
                    {link.disabled ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start"
                        disabled
                      >
                        <link.icon className="h-4 w-4" />
                        <span className="sr-only">{link.title}</span>
                      </Button>
                    ) : (
                      <NavLink
                        key={index}
                        to={link.url}
                        className={({ isActive }) =>
                          isActive
                            ? cn(
                                buttonVariants({ size: "sm" }),
                                "justify-start dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                              )
                            : cn(
                                buttonVariants({
                                  variant: "ghost",
                                  size: "sm",
                                }),
                                "justify-start"
                              )
                        }
                      >
                        <link.icon className="h-4 w-4" />
                        <span className="sr-only">{link.title}</span>
                      </NavLink>
                    )}
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {link.title}
                  </TooltipContent>
                </Tooltip>
              ) : link.disabled ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  disabled
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </Button>
              ) : (
                <NavLink
                  key={index}
                  to={link.url}
                  className={({ isActive }) =>
                    isActive
                      ? cn(
                          buttonVariants({ size: "sm" }),
                          "justify-start dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                        )
                      : cn(
                          buttonVariants({
                            variant: "ghost",
                            size: "sm",
                          }),
                          "justify-start"
                        )
                  }
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </NavLink>
              )
            )}
          </nav>
          <Separator />
          <div className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-left">
                <Tooltip delayDuration={0}>
                  {isCollapsed ? (
                    <>
                      <TooltipTrigger className="w-full">
                        <span
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "w-full text-left justify-start"
                          )}
                        >
                          <Globe2Icon className="w-4 h-4" />
                          {isCollapsed ? null : (
                            <span className="ml-2">
                              {t("general.language")}
                            </span>
                          )}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {t("general.language")}
                      </TooltipContent>
                    </>
                  ) : (
                    <span
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "w-full text-left justify-start"
                      )}
                    >
                      <Globe2Icon className="w-4 h-4" />
                      {isCollapsed ? null : (
                        <span className="ml-2"> {t("general.language")} </span>
                      )}
                    </span>
                  )}
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="ml-2">
                <DropdownMenuLabel>{t("general.language")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => i18n.changeLanguage("ru")}>
                  {t("general.ru")}
                  <DropdownMenuShortcut>RU</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
                  {t("general.en")}
                  <DropdownMenuShortcut>EN</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-left">
                <Tooltip delayDuration={0}>
                  {isCollapsed ? (
                    <>
                      <TooltipTrigger className="w-full">
                        <span
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "w-full text-left justify-start"
                          )}
                        >
                          <SunMoonIcon className="w-4 h-4" />
                          {isCollapsed ? null : (
                            <span className="ml-2"> {t("general.theme")} </span>
                          )}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {t("general.theme")}
                      </TooltipContent>
                    </>
                  ) : (
                    <span
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "w-full text-left justify-start"
                      )}
                    >
                      <SunMoonIcon className="w-4 h-4" />
                      {isCollapsed ? null : (
                        <span className="ml-2">{t("general.theme")}</span>
                      )}
                    </span>
                  )}
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="ml-2">
                <DropdownMenuLabel>{t("general.theme")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  {t("general.light")}
                  <DropdownMenuShortcut>
                    <LightbulbIcon size={12} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  {t("general.dark")}
                  <DropdownMenuShortcut>
                    <MoonIcon size={12} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-auto px-4 group-[[data-collapsed=true]]:px-2 pb-4">
            <HoverCard openDelay={0}>
              <HoverCardTrigger>
                <div className="flex group-[[data-collapsed=true]]:justify-center space-x-1 items-center overflow-hidden">
                  <Avatar>
                    <AvatarFallback>
                      {username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isCollapsed ? null : (
                    <span className="font-semibold block min-w-0 text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                      {username}
                    </span>
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-1 mb-3">
                  <b className="text-sm">{t("general.subscription")}:</b> <br />
                  <Link className="underline" to={RoutePath.billing_settings}>
                    {subscription?.tier?.name || "Free"}
                  </Link>
                </div>
                <div className="space-y-1">
                  <b className="text-sm">{t("general.my_usage")}:</b>
                  <br />
                  <small className="text-xs">
                    ({user.monthlyQueries || 0} / {subAllowance})
                  </small>
                  <Progress value={persentage || 1} className="h-2" />
                  <Button
                    variant="link"
                    className="px-0"
                    onClick={() => dispatch(signout())}
                  >
                    <LogOutIcon size={12} className="mr-1" />
                    {t("general.sign_out")}
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
