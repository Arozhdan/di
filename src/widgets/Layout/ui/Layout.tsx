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

interface Props {
  children: React.ReactNode;
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

export const Layout: FC<Props> = ({ children }) => {
  let defaultSidebarSize = 12;

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
