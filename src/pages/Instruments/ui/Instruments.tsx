import { Typography } from "@/shared/components/Typography/Typography";
import { Navbar } from "@/widgets/Navbar";
import { InstrumentsFilters } from "./Filter/InstrumentsFilters";
import { InstrumentCard } from "@/entities/Instrument";
const Instruments = () => {
  return (
    <>
      <Navbar />
      <div className="page">
        <Typography variant="pageTitle">Instruments</Typography>
        <Typography className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
        <InstrumentsFilters className="mt-2 mb-4" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
          <InstrumentCard />
        </div>
      </div>
    </>
  );
};

export default Instruments;
