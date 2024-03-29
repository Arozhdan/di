import { Button } from "@/shared/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/shared/components/ui/card";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { ClockIcon, PenIcon, Trash2Icon } from "lucide-react";
import { FC, memo, useState } from "react";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import {
  ChatItem,
  chatActions,
  deleteChat,
  renameChat,
  selectActiveChat,
} from "@/pages/Chat";
import { format } from "date-fns";
import { cn, useAppDispatch } from "@/shared/lib/utils";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface Props {
  chat: ChatItem;
}

const ChatCard: FC<Props> = ({ chat }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [name, setName] = useState(chat.name);
  const lastMessage =
    chat.messages.length > 0 && chat.messages[chat.messages.length - 1].content;

  const isActive = useSelector(selectActiveChat)?.id === chat.id;

  const handleRename = () => {
    if (name === chat.name) return;
    dispatch(
      renameChat({
        id: chat.id,
        name,
      })
    );
  };

  const handleSelect = () => {
    dispatch(chatActions.setActiveChat(chat.id));
  };

  return (
    <Card
      className={cn(
        "group flex flex-col cursor-pointer hover:border-primary/50 relative h-chat-card",
        {
          "border-primary hover:border-primary": isActive,
        }
      )}
      onClick={handleSelect}
    >
      <CardHeader className="pt-3 pb-1 pl-3 pr-0">
        <div className="w-full text-xs text-gray-500 flex items-center">
          <ClockIcon size={12} className="mr-1" />
          {format(new Date(chat.updatedAt), "d.MM, HH:mm")}
        </div>
        <span className="line-clamp-2 text-xs h-8">
          <b className="uppercase">{chat.name}</b>
          {lastMessage && (
            <>
              <br />
              <span className="text-xs opacity-80">{lastMessage}</span>
            </>
          )}
        </span>
      </CardHeader>
      <CardFooter className="pb-1 px-3 flex items-center justify-between flex-col mt-auto">
        <div className="flex justify-between w-full space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="text"
                size="xs"
                className="px-0 text-gray-500"
                onClick={(e) => e.stopPropagation()}
              >
                <PenIcon size={12} className="mr-1" />
                <span className="text-xs">{t("chat.rename_chat")}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("chat.rename_chat")}</DialogTitle>
                <DialogDescription>
                  {t("chat.rename_chat_description")}
                </DialogDescription>
              </DialogHeader>
              <div className="">
                <Label htmlFor="name">
                  <span>{t("chat.chat_name")}</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="text">{t("general.cancel")}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleRename}>{t("general.save")}</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="link"
                size="xs"
                className="px-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2Icon size={12} className="mr-1" />
                <span className="text-xs">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("chat.delete_chat")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("chat.delete_chat_description")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("general.cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => dispatch(deleteChat(chat.id))}
                >
                  {t("chat.delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default memo(ChatCard);
