import { Typography } from "@/shared/components/Typography/Typography";
import { Navbar } from "@/widgets/Navbar";
import { HistoryFilters } from "./Filter/HistoryFilters";
import { HistoryCard, selectHistory } from "@/entities/History";
import { useSelector } from "react-redux";
const History = () => {
  const history = useSelector(selectHistory);
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
          {history.map((history) => (
            <HistoryCard key={history.id} history={history} />
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
