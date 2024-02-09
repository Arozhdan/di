import { Input } from "@/shared/components/ui/input";
import { InstrumentFilter } from "./HistoryInstrumentFilter";
import { Toggle } from "@/shared/components/ui/toggle";
import { PinIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { FC } from "react";
import { cn, useAppDispatch } from "@/shared/lib/utils";
import { useSelector } from "react-redux";
import { historyActions, selectHistoryFilters } from "@/entities/History";
import { useTranslation } from "react-i18next";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export const HistoryFilters: FC<Props> = ({ className, ...props }) => {
  const { t } = useTranslation();
  const filters = useSelector(selectHistoryFilters);
  const isDirty =
    !!filters &&
    Object.keys(filters).length > 0 &&
    Object.values(filters).some(
      typeof filters === "string" ? Boolean : (v) => v
    );

  const dispatch = useAppDispatch();

  const clearFilters = () => {
    dispatch(historyActions.clearFilters());
    const urlQuery = new URLSearchParams(window.location.search);
    urlQuery.delete("instrument");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlQuery}`
    );
  };

  const classes = cn(
    "flex flex-wrap py-4 border-b border-t border-gray-100",
    className
  );
  return (
    <div className={classes} {...props}>
      <Input
        value={filters?.input ?? ""}
        onChange={(e) => {
          dispatch(
            historyActions.setFilter({ key: "input", value: e.target.value })
          );
        }}
        placeholder={t("general.search")}
        className="h-8 w-full md:w-[150px] lg:w-[200px] xl:w-[340px] mb-3 md:mb-0"
      />
      <Toggle
        variant={"dashed"}
        size="sm"
        className="h-8 md:ml-3"
        pressed={filters?.pinnedOnly ?? false}
        onPressedChange={(pressed) => {
          dispatch(
            historyActions.setFilter({ key: "pinnedOnly", value: pressed })
          );
        }}
      >
        <PinIcon className="h-4 w-4 mr-2" />
        {t("history.only_pinned")}
      </Toggle>
      <InstrumentFilter className="ml-3" />
      {isDirty && (
        <Button
          variant={"link"}
          size="sm"
          className="h-8 group ml-3"
          onClick={clearFilters}
        >
          <Trash2Icon className="mr-2 h-4 w-4  group-hover:scale-95" />
          {t("general.clear_filters")}
        </Button>
      )}
    </div>
  );
};
