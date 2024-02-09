import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@components/resizable";
import { FC, useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";

import { cn, useMediaQuery } from "@/shared/lib/utils";
import { RoutePath } from "@/app/providers/Router";
import {
  BookMarkedIcon,
  BotIcon,
  LayoutDashboardIcon,
  MessagesSquareIcon,
  PencilRulerIcon,
  Settings2Icon,
} from "lucide-react";

import { LOCAL_STORAGE } from "@lib/consts";
import { useTranslation } from "react-i18next";

interface Props {
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  const { t } = useTranslation();
  let defaultSidebarSize = 12;

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
      title: t("general.templates"),
      url: RoutePath.templates,
      icon: PencilRulerIcon,
      disabled: true,
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

  try {
    const sidebarSizeFromStorage = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE.SIDEBAR_WIDTH) || ""
    );
    if (sidebarSizeFromStorage && typeof sidebarSizeFromStorage === "number") {
      defaultSidebarSize = sidebarSizeFromStorage;
    }
  } catch {
    console.error("Error while parsing sidebar size from storage");
    localStorage.removeItem(LOCAL_STORAGE.SIDEBAR_WIDTH);
  }

  const [sidebarWidth, setSidebarWidth] = useState(defaultSidebarSize);
  const [minSidebarWidth, setMinSidebarWidth] = useState(12);
  const [maxSidebarWidth, setMaxSidebarWidth] = useState(15);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const isDesktopSmall = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    if (isDesktopSmall) {
      setMinSidebarWidth(15);
      setMaxSidebarWidth(20);
    } else {
      setMinSidebarWidth(11);
      setMaxSidebarWidth(15);
    }
  }, [isDesktopSmall]);

  const handleSidebarResize = (size: number) => {
    setSidebarWidth(size);
    localStorage.setItem(LOCAL_STORAGE.SIDEBAR_WIDTH, JSON.stringify(size));
    if (size < minSidebarWidth) {
      setIsCollapsed(true);
    }
  };

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={sidebarWidth}
        maxSize={maxSidebarWidth}
        minSize={minSidebarWidth}
        collapsible
        collapsedSize={3}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
        onResize={handleSidebarResize}
        className={cn(
          isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out relative"
        )}
      >
        <Sidebar links={links} isCollapsed={isCollapsed} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className="overflow-y-auto h-full">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
