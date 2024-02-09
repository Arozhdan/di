import { useTranslation } from "react-i18next";
import { slateToHtml } from "@slate-serializers/html";
import { Navbar } from "@/widgets/Navbar";
import { Typography } from "@/shared/components/Typography/Typography";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@components/card";
import {
  AlertCircleIcon,
  BotIcon,
  FlameIcon,
  HourglassIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/tooltip";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@components/tabs";
import { Link } from "react-router-dom";
import {
  Instrument,
  InstrumentCard,
  selectFavoriteInstruments,
  selectRecentInstruments,
  selectIsInstrumentsListLoading,
  InstrumentCardSkeleton,
  selectMostUsedInstrument,
} from "@/entities/Instrument";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { HistoryCard, selectAllHistory } from "@/entities/History";
import { useSelector } from "react-redux";
import { RoutePath } from "@/app/providers/Router";
import {
  selectCostsSaved,
  selectTimeSaved,
  selectTotalNumberQueries,
  selectUser,
} from "@/entities/User";
import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";
import { selectSiteSettings } from "@/entities/SiteSettings";
import { format } from "date-fns";

const Dashboard = () => {
  const { t } = useTranslation();
  const isInstrumentsListLoading = useSelector(selectIsInstrumentsListLoading);
  const user = useSelector(selectUser);
  const favoriteInstruments = useSelector(selectFavoriteInstruments);
  const favoriteInstrumentsPairs = favoriteInstruments.reduce(
    (acc, instrument, index) => {
      if (index % 2 === 0) {
        acc.push([instrument]);
      } else {
        acc[acc.length - 1].push(instrument);
      }
      return acc;
    },
    [] as Instrument[][]
  );
  const history = useSelector(selectAllHistory);
  const siteSettings = useSelector(selectSiteSettings);
  const releaseNotes = slateToHtml(siteSettings?.releaseNotes || []);

  const totalQueries = useSelector(selectTotalNumberQueries);
  const mostUsedInstrument = useSelector(selectMostUsedInstrument);
  const timeSaved = useSelector((state: StateSchema) =>
    selectTimeSaved(state, totalQueries)
  );
  const costSaved = useSelector((state: StateSchema) =>
    selectCostsSaved(state, totalQueries)
  );

  const recentInstruments = useSelector(selectRecentInstruments);
  const recentInstrumentsPairs = recentInstruments.reduce(
    (acc, instrument, index) => {
      if (index % 2 === 0) {
        acc.push([instrument]);
      } else {
        acc[acc.length - 1].push(instrument);
      }
      return acc;
    },
    [] as Instrument[][]
  );

  return (
    <>
      <Navbar />
      <div className={cn("page")}>
        <Typography className="mb-6" variant="pageTitle">
          {t("general.dashboard")}
        </Typography>
        {mostUsedInstrument && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-6 w-full">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("dashboard.most_used_instrument")}
                </CardTitle>
                <FlameIcon size={16} className="ml-auto text-primary/70" />
              </CardHeader>
              <CardContent>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Link
                      to={RoutePath.instrument.replace(
                        ":id",
                        mostUsedInstrument.id
                      )}
                      className="line-clamp-1 text-left"
                    >
                      <Typography variant="sectionTitle" as="span">
                        {mostUsedInstrument.name}
                      </Typography>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm font-normal">
                      {mostUsedInstrument.name}
                    </div>
                  </TooltipContent>
                </Tooltip>
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.total_of_queries", {
                    total: mostUsedInstrument.timesUsed,
                  })}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("dashboard.total_queries")}
                </CardTitle>
                <BotIcon size={16} className="ml-auto text-primary/70" />
              </CardHeader>
              <CardContent>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Typography variant="sectionTitle" as="span">
                      {totalQueries}
                    </Typography>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm font-normal">{totalQueries}</div>
                  </TooltipContent>
                </Tooltip>
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.since")}{" "}
                  {format(user?.createdAt || new Date(), "MMMM yyyy")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("dashboard.time_saved")}
                </CardTitle>
                <HourglassIcon size={16} className="ml-auto text-primary/70" />
              </CardHeader>
              <CardContent>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Link to="/" className="line-clamp-1 text-left">
                      <Typography variant="sectionTitle" as="span">
                        {t("dashboard.over_amt_hours", {
                          hours: timeSaved?.value,
                        })}
                      </Typography>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm font-normal">
                      {t("dashboard.over_amt_hours", {
                        hours: timeSaved?.value,
                      })}
                    </div>
                  </TooltipContent>
                </Tooltip>
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.avg_time", {
                    value: timeSaved?.average,
                  })}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("dashboard.est_savings")}
                </CardTitle>
                <FlameIcon size={16} className="ml-auto text-primary/70" />
              </CardHeader>
              <CardContent>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Link to="/" className="line-clamp-1 text-left">
                      <Typography variant="sectionTitle" as="span">
                        ${costSaved?.value}
                      </Typography>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm font-normal">
                      ${costSaved?.value}
                    </div>
                  </TooltipContent>
                </Tooltip>
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.based_on_avg_costs")}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
        <div className="grid lg:grid-cols-12 gap-6 w-full pt-4">
          {(favoriteInstrumentsPairs.length > 0 ||
            recentInstrumentsPairs.length > 0 ||
            isInstrumentsListLoading) && (
            <Card className="lg:col-span-7 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("dashboard.overview")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Typography variant="sectionTitle" as="span">
                  {t("general.instruments")}
                </Typography>
                <Tabs defaultValue="favorite">
                  <TabsList>
                    <TabsTrigger value="favorite">
                      <Typography variant="small">
                        {t("dashboard.fav_instruments")}
                      </Typography>
                    </TabsTrigger>
                    <TabsTrigger value="recent">
                      <Typography variant="small">
                        {t("dashboard.recently_used")}
                      </Typography>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="favorite">
                    <Carousel
                      opts={{
                        align: "start",
                      }}
                    >
                      <CarouselContent>
                        {isInstrumentsListLoading && (
                          <>
                            <CarouselItem className="lg:basis-1/2 space-y-4">
                              <InstrumentCardSkeleton />
                              <InstrumentCardSkeleton />
                            </CarouselItem>
                            <CarouselItem className="lg:basis-1/2 space-y-4">
                              <InstrumentCardSkeleton />
                              <InstrumentCardSkeleton />
                            </CarouselItem>
                          </>
                        )}
                        {!isInstrumentsListLoading &&
                          favoriteInstrumentsPairs.map((pair, index) => (
                            <CarouselItem
                              key={index}
                              className="lg:basis-1/2 space-y-4"
                            >
                              {pair.map((instrument) => (
                                <InstrumentCard
                                  key={instrument.id}
                                  instrument={instrument}
                                />
                              ))}
                            </CarouselItem>
                          ))}
                        {!isInstrumentsListLoading &&
                          favoriteInstrumentsPairs.length === 0 && (
                            <CarouselItem className="lg:basis-1/2 space-y-4">
                              <div className="h-card flex flex-col justify-center items-center h-full border shadow-sm rounded-lg transition hover:shadow-md">
                                <Typography
                                  variant="sectionSubtitle"
                                  className="text-center"
                                >
                                  {t("dashboard.no_fav_yet")}
                                </Typography>
                              </div>
                            </CarouselItem>
                          )}
                      </CarouselContent>
                      <CarouselPrevious className="static mt-8 text-primary" />
                      <CarouselNext className="static mt-8 text-primary" />
                    </Carousel>
                  </TabsContent>
                  <TabsContent value="recent">
                    <Carousel
                      opts={{
                        align: "start",
                      }}
                    >
                      <CarouselContent>
                        {isInstrumentsListLoading && (
                          <>
                            <CarouselItem className="lg:basis-1/2 space-y-4">
                              <InstrumentCardSkeleton />
                              <InstrumentCardSkeleton />
                            </CarouselItem>
                            <CarouselItem className="lg:basis-1/2 space-y-4">
                              <InstrumentCardSkeleton />
                              <InstrumentCardSkeleton />
                            </CarouselItem>
                          </>
                        )}
                        {!isInstrumentsListLoading &&
                          recentInstrumentsPairs.map((pair, index) => (
                            <CarouselItem
                              key={index}
                              className="lg:basis-1/2 space-y-4"
                            >
                              {pair.map((instrument) => (
                                <InstrumentCard
                                  key={instrument.id}
                                  instrument={instrument}
                                />
                              ))}
                            </CarouselItem>
                          ))}
                      </CarouselContent>
                      <CarouselPrevious className="static mt-8 text-primary" />
                      <CarouselNext className="static mt-8 text-primary" />
                    </Carousel>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
          <Card
            className={cn("overflow-hidden", {
              "lg:col-span-5":
                favoriteInstrumentsPairs.length > 0 ||
                recentInstrumentsPairs.length > 0 ||
                isInstrumentsListLoading,
              "lg:col-span-12":
                favoriteInstrumentsPairs.length === 0 &&
                recentInstrumentsPairs.length === 0,
            })}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex flex-row items-center">
                <AlertCircleIcon className="mt-px mr-1" size={14} />
                <span>Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{
                  __html: releaseNotes,
                }}
              ></div>
            </CardContent>
          </Card>
        </div>
        {history.length > 0 && (
          <div className="mt-6 w-full overflow-hidden">
            <Typography variant="sectionTitle" className="pl-1">
              {t("general.history")}
            </Typography>
            <Carousel
              opts={{
                align: "start",
              }}
              className="pr-px "
            >
              <CarouselContent>
                {history.slice(0, 6).map((history) => (
                  <CarouselItem
                    key={history.id}
                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 py-2"
                  >
                    <HistoryCard history={history} />
                  </CarouselItem>
                ))}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 py-2">
                  <Link
                    to={RoutePath.history}
                    className="flex flex-col justify-center items-center h-full border shadow-sm rounded-lg transition hover:shadow-md"
                  >
                    <Typography
                      variant="sectionSubtitle"
                      className="text-center"
                    >
                      {t("general.view_all")}
                    </Typography>
                  </Link>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="static mt-6 text-primary" />
              <CarouselNext className="static mt-6 text-primary" />
            </Carousel>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
