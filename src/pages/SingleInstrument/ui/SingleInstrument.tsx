import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GenerateOverlay, HistoryCard } from "@/entities/History";
import { Typography } from "@/shared/components/Typography/Typography";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { Toggle } from "@/shared/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Navbar } from "@/widgets/Navbar";
import { ArrowLeftIcon, BotIcon, PinIcon, StarIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import { RoutePath } from "@/app/providers/Router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { cn, useAppDispatch } from "@/shared/lib/utils";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";
import {
  favoriteInstrument,
  generateQuery,
  isGenerating,
  selectInstrumentById,
  selectIsFavoritedInstrument,
  selectIsInstrumentsListLoading,
  unfavoriteInstrument,
} from "@/entities/Instrument";
import { PageLoader } from "@/widgets/Loader";
import { selectHistoryByInstrument } from "@/entities/History/model/selectors/selectHistoryByInstrument/selectHistoryByInstrument";

const formSchema = z.object({
  input: z
    .string()
    .min(10, "Минимум 10 символов")
    .max(400, "Максимум 400 символов"),
  language: z.enum(["russian", "english"]),
  tov: z.enum(["professional", "polite", "neutral", "rude"]),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  input: "",
  language: "russian",
  tov: "professional",
};

const SingleInstrument = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const isInstrumentLoading = useSelector(selectIsInstrumentsListLoading);
  const isWindows =
    navigator.platform.indexOf("Win") > -1 ||
    navigator.platform.indexOf("win") > -1;

  const drawerTriggerRef = useRef<HTMLButtonElement>(null);

  const params = useParams<{ id: string }>();
  const instrumentId = params.id;

  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: FormValues) => {
    if (!instrumentId) return;
    dispatch(
      generateQuery({
        input: values.input,
        instrumentId: instrumentId,
        language: values.language,
        tov: values.tov,
      })
    );
  };
  const instrument = useSelector((state: StateSchema) =>
    selectInstrumentById(state, instrumentId)
  );
  const isFavorited = useSelector((state: StateSchema) =>
    selectIsFavoritedInstrument(state, instrumentId)
  );
  const history = useSelector((state: StateSchema) =>
    selectHistoryByInstrument(state, instrumentId)
  );
  const generating = useSelector(isGenerating);

  const historyToRender = useCallback(() => {
    if (pinnedOnly) {
      return history.filter((history) => history.isPinned);
    }
    return history;
  }, [history, pinnedOnly])();

  if (isInstrumentLoading) return <PageLoader />;
  if (!instrument) return navigate(RoutePath.instruments);

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
            to={RoutePath.instruments}
          >
            <ArrowLeftIcon size={12} className="mr-1 mt-0.5" />
            Инструменты
          </Link>
        </div>
      </Navbar>
      <div className="page">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-10 w-full flex-1 px-1 overflow-hidden ">
          <Form {...form}>
            <form
              className="col-span-3 flex flex-col relative"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {generating && <GenerateOverlay />}
              <div>
                <Typography variant="sectionSubtitle">
                  {instrument.name}
                </Typography>
                <div className="mb-2 hidden md:block mt-1">
                  <Toggle
                    variant="dashed"
                    size="xs"
                    className="flex"
                    pressed={isFavorited}
                    onPressedChange={() => {
                      if (isFavorited) {
                        dispatch(unfavoriteInstrument(instrument));
                      } else {
                        dispatch(favoriteInstrument(instrument));
                      }
                    }}
                  >
                    <StarIcon size={14} className="mr-2" />
                    {isFavorited ? "В избранном" : "Добавить в избранное"}
                  </Toggle>
                </div>
                <Tooltip>
                  <TooltipTrigger className="text-left">
                    <Typography className="text-gray-500 leading-5 line-clamp-4 lg:line-clamp-2">
                      {instrument.description}
                    </Typography>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-lg whitespace-normal">
                    {instrument.description}
                  </TooltipContent>
                </Tooltip>
                <Link
                  to={
                    RoutePath.instruments +
                    "?segment=" +
                    instrument.instrumentType
                  }
                  className="underline text-xs block capitalize"
                >
                  {instrument.instrumentType}
                </Link>
              </div>
              <div className="mt-2 lg:mt-6 flex-grow pb-2 lg:pb-8">
                <FormField
                  control={form.control}
                  name="input"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ваш текст</FormLabel>
                      <FormControl>
                        <Textarea
                          onChange={field.onChange}
                          value={field.value}
                          className="resize-none placeholder:text-xs h-36 lg:h-48"
                          placeholder={instrument.example}
                        />
                      </FormControl>
                      <FormDescription>
                        Контекст для генерации результата, должен быть не менее
                        10 символов и не более 400 символов
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-auto mb-1 grid gap-2 lg:gap-0 lg:flex lg:space-x-4">
                <Button
                  className="row-start-3"
                  type="submit"
                  disabled={generating}
                >
                  <BotIcon size={14} className="mr-2" />
                  Сгенерировать
                  {isWindows ? (
                    <kbd className="ml-1 text-xs hidden lg:inline">
                      (Ctrl + Enter)
                    </kbd>
                  ) : (
                    <kbd className="ml-1 text-xs hidden lg:inline">
                      (⌘ + Enter)
                    </kbd>
                  )}
                </Button>
                <Select
                  defaultValue={form.getValues().language}
                  onValueChange={(value) => {
                    form.setValue("language", value as "russian" | "english");
                  }}
                >
                  <SelectTrigger className="md:w-[140px]">
                    <SelectValue placeholder="Язык" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="russian">Русский</SelectItem>
                    <SelectItem value="english">Английский</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  defaultValue={form.getValues().tov}
                  onValueChange={(value) => {
                    form.setValue(
                      "tov",
                      value as "professional" | "polite" | "neutral" | "rude"
                    );
                  }}
                >
                  <SelectTrigger className="md:w-[220px]">
                    <SelectValue placeholder="Тон речи" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">
                      Профессиональный
                    </SelectItem>
                    <SelectItem value="polite">Вежливый</SelectItem>
                    <SelectItem value="neutral">Нейтральный</SelectItem>
                    <SelectItem value="rude">Грубый</SelectItem>
                  </SelectContent>
                </Select>
                <Drawer>
                  <DrawerTrigger className="lg:hidden" ref={drawerTriggerRef}>
                    <Button variant="outline" className="w-full" type="button">
                      История
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>
                        <Typography variant="sectionSubtitle">
                          История
                        </Typography>
                      </DrawerTitle>
                      <Toggle
                        pressed={pinnedOnly}
                        onPressedChange={setPinnedOnly}
                        variant="outline"
                        size="sm"
                        className="flex mt-2 mb-4"
                      >
                        <PinIcon size={14} className="mr-2" />
                        Только закрепленные
                      </Toggle>
                      <DrawerDescription asChild>
                        <ScrollArea className="h-[60vh] text-left">
                          <div className="space-y-4 pb-2">
                            {history.map((history) => (
                              <HistoryCard key={history.id} history={history} />
                            ))}
                          </div>
                        </ScrollArea>
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <div className="flex justify-between space-x-4">
                        <Button className="w-full">Смотреть все</Button>
                        <DrawerClose className="w-full">
                          <Button className="w-full" variant="outline">
                            Закрыть
                          </Button>
                        </DrawerClose>
                      </div>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </form>
          </Form>
          <div className="col-span-2 hidden lg:block">
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <Typography variant="sectionSubtitle">История</Typography>
              <div className="flex space-x-4 items-center mt-2 mb-4">
                <Toggle
                  variant="outline"
                  size="sm"
                  className="flex"
                  pressed={pinnedOnly}
                  onPressedChange={setPinnedOnly}
                >
                  <PinIcon size={14} className="mr-2" />
                  Только закрепленные
                </Toggle>
                <Link
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                  to={RoutePath.history + "?instrument=" + instrumentId}
                >
                  Смотреть все
                </Link>
              </div>
              {historyToRender.length > 0 ? (
                <div className="space-y-4 pr-6">
                  {historyToRender.map((history) => (
                    <HistoryCard key={history.id} history={history} />
                  ))}
                </div>
              ) : (
                <Typography className="text-gray-500">История пуста</Typography>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleInstrument;
