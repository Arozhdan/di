import { RoutePath } from "@/app/providers/Router";
import {
  HistoryCard,
  editHistory,
  pinHistory,
  selectHistoryById,
  selectHistoryIsLoading,
  selectIsRecordLoading,
  selectIsRegenerating,
  unpinHistory,
  updateHistory,
} from "@/entities/History";
import { Typography } from "@/shared/components/Typography/Typography";
import { Button, buttonVariants } from "@/shared/components/ui/button";

import { Textarea } from "@/shared/components/ui/textarea";
import { Toggle } from "@/shared/components/ui/toggle";
import { cn, useAppDispatch } from "@/shared/lib/utils";
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
import { Link, useParams } from "react-router-dom";
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
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";
import { selectHistoryByInstrument } from "@/entities/History/model/selectors/selectHistoryByInstrument/selectHistoryByInstrument";
import { PageLoader } from "@/widgets/Loader";

const Query = () => {
  const [isCustomCommandOpen, setIsCustomCommandOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [customCommand, setCustomCommand] = useState<string>("");
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isUpdating = useSelector(selectIsRecordLoading);
  const isRegenerating = useSelector(selectIsRegenerating);
  const isListLoading = useSelector(selectHistoryIsLoading);

  const data = useSelector((state: StateSchema) =>
    selectHistoryById(state, params.id)
  );
  const history = useSelector((state: StateSchema) =>
    selectHistoryByInstrument(state, data?.instrument.id)
  );
  const historyToRender = useCallback(() => {
    if (pinnedOnly) {
      return history.filter((item) => item.isPinned);
    }
    return history;
  }, [history, pinnedOnly])();
  const instrumentPath = RoutePath.instrument.replace(
    ":id",
    data?.instrument.id.toString() ?? ""
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      navigator.clipboard.writeText(
        data?.instrument.name + "\n\n" + textareaRef.current.value
      );
      toast("Скопировано!", {
        description: "Результат скопирован в буфер обмена",
      });
    }
  };

  const handleEdit = (command?: string) => {
    if (!data || !textareaRef.current) return;
    if (!command) {
      command = customCommand;
    }
    if (!command) return;

    const value = textareaRef.current.value;
    dispatch(
      editHistory({
        id: data.id,
        input: value,
        command,
      })
    );
    setTouched(true);
    setIsCustomCommandOpen(false);
  };

  const handleSave = () => {
    if (!textareaRef.current || !data) return;
    dispatch(
      updateHistory({
        id: data.id,
        value: textareaRef.current.value ?? "",
      })
    );
    setTouched(false);
  };

  useEffect(
    () => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!touched) return;
        if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          handleSave();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  useEffect(() => {
    if (data) {
      if (!textareaRef.current) return;
      textareaRef.current.focus();
      textareaRef.current.value = data.output;
    }
  }, [data]);

  if (isListLoading) {
    return <PageLoader />;
  }

  if (!data) {
    return <div className="page">Not found</div>;
  }

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
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-x-10 w-full h-full px-1">
          <div className="col-span-3 flex flex-col">
            <div>
              <Typography variant="sectionSubtitle">{data.input}</Typography>
              <div className="mb-2 hidden md:flex mt-1 space-x-4">
                <Toggle
                  variant="dashed"
                  size="xs"
                  className="flex"
                  pressed={data.isPinned}
                  onPressedChange={(value) => {
                    if (value) dispatch(pinHistory(data));
                    else dispatch(unpinHistory(data));
                  }}
                >
                  <PinIcon size={14} className="mr-2" />
                  {data.isPinned ? "Открепить" : "Закрепить"}
                </Toggle>
              </div>
            </div>
            <div className="mt-2 lg:mt-6 flex-grow pb-2 lg:mb-7 relative">
              <Textarea
                ref={textareaRef}
                className="resize-none placeholder:text-xs h-full"
                onInput={() => setTouched(true)}
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
            <div className="mt-auto mb-2 grid gap-2 lg:gap-0 flex-shrink-0 lg:flex">
              <Button
                className="row-start-3"
                type="submit"
                onClick={handleSave}
                disabled={isUpdating || !touched || isRegenerating}
              >
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
                  <DropdownMenuItem onClick={() => handleEdit("Make shorter")}>
                    <ArrowDownWideNarrowIcon size={12} className="mr-4" />
                    Сделать короче
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit("Rewrite")}>
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
                <Toggle
                  variant="outline"
                  size="sm"
                  className="flex"
                  pressed={pinnedOnly}
                  onClick={() => setPinnedOnly((prev) => !prev)}
                >
                  <PinIcon size={14} className="mr-2" />
                  Только закрепленные
                </Toggle>
                <Link
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                  to={RoutePath.history + "?instrument=" + data.instrument.id}
                >
                  Смотреть все
                </Link>
              </div>
              <div className="space-y-4 pr-6">
                {/* <HistoryCard expandable /> */}
                {historyToRender.length > 0 ? (
                  historyToRender.map((item) => (
                    <HistoryCard
                      key={item.id}
                      expandable
                      history={item}
                      className="mb-4"
                    />
                  ))
                ) : (
                  <Typography className="text-gray-500">
                    История пуста
                  </Typography>
                )}
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
            <Input
              value={customCommand}
              onChange={(e) => setCustomCommand(e.target.value)}
              placeholder="Ex: Перепиши на английском языке"
            />
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
            <Button type="submit" onClick={() => handleEdit()}>
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
