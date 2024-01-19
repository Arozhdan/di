import { ChatCard, ChatMessage } from "@/entities/Chat";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn, useMediaQuery } from "@/shared/lib/utils";
import { Navbar } from "@/widgets/Navbar";
import {
  ArrowLeftIcon,
  PlusCircleIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Chat = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="w-full lg:w-72 border-r lg:h-screen flex-col">
          <div className="h-navbar flex items-center justify-center border-b flex-shrink-0">
            <Link className="max-w-24 block" to={"/"}>
              <img className="w-full" src="/logo.svg" alt="" />
            </Link>
          </div>
          <div className="flex flex-col pt-4 px-3 flex-1">
            <Button>
              <PlusCircleIcon size={14} className="mr-2" />
              Create new chat
            </Button>
            <ScrollArea className="h-chat-card lg:h-[calc(100vh-10rem)] mt-4 lg:pr-2.5 lg:-mr-[11px]  lg:w-auto">
              <div className="flex flex-row lg:flex-col lg:space-y-2 space-x-2 lg:space-x-0">
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
              </div>
              <ScrollBar orientation={isMobile ? "horizontal" : "vertical"} />
            </ScrollArea>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="link" className="mt-auto">
                  <Trash2Icon size={14} className="mr-2" />
                  Delete all chats
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all chats.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <Navbar className="w-full flex-shrink-0 h-navbar !hidden lg:!flex">
            <div className="lg:px-5 mr-2">
              <Link
                className={cn(
                  buttonVariants({
                    variant: "link",
                    size: "sm",
                  }),
                  "px-0"
                )}
                to={"/"}
              >
                <ArrowLeftIcon size={12} className="mr-1 mt-0.5" />
                Back to Dashboard
              </Link>
            </div>
          </Navbar>
          <div className="w-full max-w-5xl px-4 flex flex-col">
            <ScrollArea className="h-[calc(100vh-var(--chat-card-height)*3-3rem)] lg:h-[calc(100vh-var(--navbar-height)-var(--chat-card-height)-0.5rem)]">
              <div className="flex flex-1 flex-col space-y-10 lg:space-y-4 py-6">
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
              </div>
            </ScrollArea>
            <div className="h-chat-card mt-auto flex items-center py-2 relative">
              <Textarea
                className="h-full resize-none"
                placeholder="Введите сообщение"
              />
              <Button
                size={"icon"}
                className="absolute right-4 opacity-20 hover:opacity-100 focus:opacity-100"
              >
                <SendIcon size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
