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
import { InstrumentCard, InstrumentCardSkeleton } from "@/entities/Instrument";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { HistoryCard } from "@/entities/History";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className={cn("page")}>
        <Typography className="mb-6" variant="pageTitle">
          Dashboard
        </Typography>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-6 w-full">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">
                Most used instrument
              </CardTitle>
              <FlameIcon size={16} className="ml-auto text-primary/70" />
            </CardHeader>
            <CardContent>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link to="/" className="line-clamp-1 text-left">
                    <Typography variant="sectionTitle" as="span">
                      Переводчик из грубого в вежливый
                    </Typography>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm font-normal">
                    Переводчик из грубого в вежливый
                  </div>
                </TooltipContent>
              </Tooltip>
              <p className="text-xs text-muted-foreground">
                Total of 1,234 queries
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">
                Total number of queries
              </CardTitle>
              <BotIcon size={16} className="ml-auto text-primary/70" />
            </CardHeader>
            <CardContent>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link to="/" className="line-clamp-1 text-left">
                    <Typography variant="sectionTitle" as="span">
                      3,456
                    </Typography>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm font-normal">3,456</div>
                </TooltipContent>
              </Tooltip>
              <p className="text-xs text-muted-foreground">Since 01.01.2021</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">
                Time saved with AI
              </CardTitle>
              <HourglassIcon size={16} className="ml-auto text-primary/70" />
            </CardHeader>
            <CardContent>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link to="/" className="line-clamp-1 text-left">
                    <Typography variant="sectionTitle" as="span">
                      Over 3,000 hours
                    </Typography>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm font-normal">Over 3000 hours</div>
                </TooltipContent>
              </Tooltip>
              <p className="text-xs text-muted-foreground">
                On average 5 minutes per content generation
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">
                Estimated cost savings
              </CardTitle>
              <FlameIcon size={16} className="ml-auto text-primary/70" />
            </CardHeader>
            <CardContent>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link to="/" className="line-clamp-1 text-left">
                    <Typography variant="sectionTitle" as="span">
                      $2,932.00
                    </Typography>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm font-normal">$2,932.00</div>
                </TooltipContent>
              </Tooltip>
              <p className="text-xs text-muted-foreground">
                Based on average copywriter costs
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid lg:grid-cols-12 gap-6 w-full pt-4">
          <Card className="lg:col-span-7 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography variant="sectionTitle" as="span">
                Instruments
              </Typography>
              <Tabs defaultValue="recent">
                <TabsList>
                  <TabsTrigger value="recent">
                    <Typography variant="small">Recently used</Typography>
                  </TabsTrigger>
                  <TabsTrigger value="favorite">
                    <Typography variant="small">
                      Favorite instruments
                    </Typography>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="recent">
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                  >
                    <CarouselContent>
                      <CarouselItem className="lg:basis-1/2 space-y-4">
                        <InstrumentCard />
                        <InstrumentCard />
                      </CarouselItem>
                      <CarouselItem className="lg:basis-1/2 space-y-4">
                        <InstrumentCard />
                        <InstrumentCard />
                      </CarouselItem>
                      <CarouselItem className="lg:basis-1/2 space-y-4">
                        <InstrumentCard />
                        <InstrumentCard />
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="static mt-8 text-primary" />
                    <CarouselNext className="static mt-8 text-primary" />
                  </Carousel>
                </TabsContent>
                <TabsContent value="favorite">
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                  >
                    <CarouselContent>
                      <CarouselItem className="lg:basis-1/2 space-y-4">
                        <InstrumentCardSkeleton />
                        <InstrumentCardSkeleton />
                      </CarouselItem>
                      <CarouselItem className="lg:basis-1/2 space-y-4">
                        <InstrumentCardSkeleton />
                        <InstrumentCardSkeleton />
                      </CarouselItem>
                      <CarouselItem className="lg:basis-1/2 space-y-4">
                        <InstrumentCardSkeleton />
                        <InstrumentCardSkeleton />
                      </CarouselItem>
                      <CarouselItem className="lg:basis-1/2 space-y-4">
                        <InstrumentCardSkeleton />
                        <InstrumentCardSkeleton />
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="static mt-8 text-primary" />
                    <CarouselNext className="static mt-8 text-primary" />
                  </Carousel>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="lg:col-span-5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex flex-row items-center">
                <AlertCircleIcon className="mt-px mr-1" size={14} />
                <span>Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <Typography variant="sectionTitle" as="h3" className="mb-5">
                Release notes
              </Typography>

              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                  iste sequi, ullam, itaque aliquam reiciendis quam veniam
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                  iste sequi, ullam, itaque aliquam reiciendis quam veniam
                  repellendus dolore laudantium ea. Numquam, soluta laudantium
                  debitis eos quos perspiciatis accusamus facere?
                </p>

                <p>New instruments released:</p>
                <ul className="list-disc pl-6 underline">
                  <li>
                    <a href="#">5 бизнес-инструментов для управления</a>
                  </li>
                  <li>
                    <a href="#">2 бизнес-инструмента для управления</a>
                  </li>
                  <li>
                    <a href="#"> 1 бизнес-инструмент для управления</a>
                  </li>
                </ul>
                <br />
                <b>Follow us on:</b>
                <ul className="list-disc pl-6 underline">
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                </ul>
                <br />
                <b>Need help?</b>
                <ul className="list-disc pl-6 underline">
                  <li>
                    <a href="#">Customer support</a>
                  </li>
                  <li>
                    <a href="#">Telegram</a>
                  </li>
                  <li>
                    <a href="#">WhatsApp</a>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 w-full overflow-hidden">
          <Typography variant="sectionTitle" className="pl-1">
            History
          </Typography>
          <Carousel
            opts={{
              align: "start",
            }}
            className="pr-px "
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4 py-2">
                <HistoryCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4 py-2">
                <HistoryCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4 py-2">
                <HistoryCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4 py-2">
                <HistoryCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4 py-2">
                <HistoryCard />
              </CarouselItem>
              <CarouselItem className="md:basis-1/3 lg:basis-1/4 py-2">
                <Link
                  to="/"
                  className="flex flex-col justify-center items-center h-full border shadow-sm rounded-lg transition hover:shadow-md"
                >
                  <Typography variant="sectionSubtitle" className="text-center">
                    View all
                  </Typography>
                </Link>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="static mt-6 text-primary" />
            <CarouselNext className="static mt-6 text-primary" />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
