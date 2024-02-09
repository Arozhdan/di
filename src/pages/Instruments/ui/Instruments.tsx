import { Typography } from "@/shared/components/Typography/Typography";
import { Navbar } from "@/widgets/Navbar";
import { InstrumentsFilters } from "./Filter/InstrumentsFilters";
import { InstrumentCard, selectInstruments } from "@/entities/Instrument";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const Instruments = () => {
  const { t } = useTranslation();
  const instruments = useSelector(selectInstruments);
  return (
    <>
      <Navbar />
      <div className="page">
        <Typography variant="pageTitle">{t("general.instruments")}</Typography>
        <Typography className="text-gray-500">
          {t("instrument.instrument_subtitle")}
        </Typography>
        <InstrumentsFilters className="mt-2 mb-4" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {instruments.map((instrument) => (
            <InstrumentCard instrument={instrument} key={instrument.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Instruments;
