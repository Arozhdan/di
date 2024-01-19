import { Typography } from "@/shared/components/Typography/Typography";
import { Navbar } from "@/widgets/Navbar";
import { HistoryFilters } from "./Filter/HistoryFilters";
import { HistoryCard } from "@/entities/History";
const History = () => {
  return (
    <>
      <Navbar />
      <div className="page">
        <Typography variant="pageTitle">History</Typography>
        <Typography className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
        <HistoryFilters className="mt-2 mb-4" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
        </div>
      </div>
    </>
  );
};

export default History;
