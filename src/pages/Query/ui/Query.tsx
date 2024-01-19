import { RoutePath } from "@/app/providers/Router";
import { HistoryCard } from "@/entities/History";
import { Typography } from "@/shared/components/Typography/Typography";
import { Button, buttonVariants } from "@/shared/components/ui/button";

import { Textarea } from "@/shared/components/ui/textarea";
import { Toggle } from "@/shared/components/ui/toggle";
import { cn } from "@/shared/lib/utils";
import { Navbar } from "@/widgets/Navbar";
import { ScrollArea } from "@shared/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";

import {
  ArrowDownWideNarrowIcon,
  ArrowLeftIcon,
  BotIcon,
  CopyIcon,
  PenLineIcon,
  PencilRulerIcon,
  PinIcon,
  RotateCcwIcon,
  SaveIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Query = () => {
  const [isCustomCommandOpen, setIsCustomCommandOpen] = useState(false);
  const instrumentPath = RoutePath.instrument.replace(":id", "1");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const instrumentTitle = "5 идей для онлайн-бизнеса в 2024 году";
  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      navigator.clipboard.writeText(
        instrumentTitle + "\n\n" + textareaRef.current.value
      );
      toast("Скопировано!", {
        description: "Результат скопирован в буфер обмена",
      });
    }
  };

  return (
    <>
      <Navbar>
        <div className="lg:px-5 mr-2">
          <Link
            className={cn(
              buttonVariants({
                variant: "link",
                size: "sm",
              }),
              "px-0"
            )}
            to={RoutePath.history}
          >
            <ArrowLeftIcon size={12} className="mr-1 mt-0.5" />
            История
          </Link>
        </div>
      </Navbar>
      <div className="page">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-x-10 w-full h-full px-1 overflow-hidden">
          <div className="col-span-3 flex flex-col">
            <div>
              <Typography variant="sectionSubtitle">
                5 идей для онлайн-бизнеса в 2024 году
              </Typography>
              <div className="mb-2 hidden md:flex mt-1 space-x-4">
                <Toggle variant="dashed" size="xs" className="flex">
                  <PinIcon size={14} className="mr-2" />
                  Закрепить
                </Toggle>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "xs",
                    })
                  )}
                  to={instrumentPath}
                >
                  К инструменту
                </Link>
              </div>
            </div>
            <div className="mt-2 lg:mt-6 flex-grow pb-2 lg:mb-7 relative">
              <Textarea
                ref={textareaRef}
                className="resize-none placeholder:text-xs h-full"
                defaultValue="5 идей для онлайн-бизнеса в 2024 году 5 идей для онлайн-бизнеса в 2024 году 5 идей для онлайн-бизнеса в 2024 году 5 идей для онлайн-бизнеса в 2024 году 5 идей для онлайн-бизнеса в 2024 году онлайн-бизнеса в 2024 году 5 идей для онлайн-бизнеса в 2024 году онлайн-бизнеса в 2024 году 5 идей для онлайн-бизнеса в 2024 году онлайн-бизнеса в 2024 году 5 идей для онлайн-бизнеса в 2024 году"
              />
              <Button
                variant="link"
                size="icon"
                className="absolute bottom-4 right-2"
                onClick={handleCopy}
              >
                <CopyIcon size={16} />
              </Button>
            </div>
            <div className="mt-auto mb-1 grid gap-2 lg:gap-0 lg:flex">
              <Button className="row-start-3" type="submit">
                <SaveIcon size={14} className="mr-2" />
                Сохранить изменения
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"} className="lg:ml-4" type="submit">
                    <PencilRulerIcon size={14} className="mr-2" />
                    Редактировать
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Редактировать</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <ArrowDownWideNarrowIcon size={12} className="mr-4" />
                    Сделать короче
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RotateCcwIcon size={12} className="mr-4" />
                    Переписать
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsCustomCommandOpen(true)}
                  >
                    <PenLineIcon size={12} className="mr-4" />
                    Свой вариант
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                to={instrumentPath}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                  }),
                  "lg:ml-auto"
                )}
              >
                <RotateCcwIcon size={14} className="mr-2" />
                Начать заново
              </Link>
            </div>
          </div>
          <div className="col-span-2 hidden lg:block">
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <div className="flex space-x-4 items-center mt-2 mb-4">
                <Toggle variant="outline" size="sm" className="flex">
                  <PinIcon size={14} className="mr-2" />
                  Только закрепленные
                </Toggle>
                <Link
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                  to={RoutePath.history + "?instrument=1"}
                >
                  Смотреть все
                </Link>
              </div>
              <div className="space-y-4 pr-6">
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
                <HistoryCard expandable />
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      <Dialog open={isCustomCommandOpen} onOpenChange={setIsCustomCommandOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Команда</DialogTitle>
            <DialogDescription>
              Опишите команду, для редактирования результата
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input placeholder="Ex: Перепиши на английском языке" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsCustomCommandOpen(false)}
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit">
              <BotIcon size={14} className="mr-2" />
              Сгенерировать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Query;
