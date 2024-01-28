import { Input } from "@/shared/components/ui/input";
import { SegmentFilter } from "./SegmentFilter";
import { Toggle } from "@/shared/components/ui/toggle";
import { StarIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { FC } from "react";
import { cn, useAppDispatch } from "@/shared/lib/utils";
import { useSelector } from "react-redux";
import {
  instrumentActions,
  selectInstrumentFilters,
} from "@/entities/Instrument";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export const InstrumentsFilters: FC<Props> = ({ className, ...props }) => {
  const filters = useSelector(selectInstrumentFilters);

  const dispatch = useAppDispatch();
  const isDirty =
    !!filters &&
    Object.keys(filters).length > 0 &&
    Object.values(filters).some(
      typeof filters === "string" ? Boolean : (v) => v
    );
  const classes = cn(
    "flex flex-wrap py-4 border-b border-t border-gray-100",
    className
  );

  const clearFilters = () => {
    dispatch(instrumentActions.clearFilters());
    const urlQuery = new URLSearchParams(window.location.search);
    urlQuery.delete("segment");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlQuery}`
    );
  };

  return (
    <div className={classes} {...props}>
      <Input
        placeholder="Filter tasks..."
        value={filters?.name ?? ""}
        onChange={(e) => {
          dispatch(instrumentActions.setFilters({ name: e.target.value }));
        }}
        className="h-8 w-full md:w-[150px] lg:w-[200px] xl:w-[340px] mb-3 md:mb-0"
      />
      <Toggle
        pressed={filters?.onlyFavourites ?? false}
        onPressedChange={(pressed) => {
          dispatch(
            instrumentActions.setFilter({
              key: "onlyFavourites",
              value: pressed,
            })
          );
        }}
        variant={"dashed"}
        size="sm"
        className="h-8 md:ml-3"
      >
        <StarIcon className="h-4 w-4 mr-2" />
        <span className="hidden md:inline">Only&nbsp;</span>
        <span className="md:lowercase">Favorites</span>
      </Toggle>
      <SegmentFilter className="ml-3" />
      {isDirty && (
        <Button
          variant={"link"}
          size="sm"
          className="h-8 group lg:ml-3"
          onClick={clearFilters}
        >
          <Trash2Icon className="mr-2 h-4 w-4  group-hover:scale-95" />
          Clear
          <span className="hidden md:inline"> Filters</span>
        </Button>
      )}
    </div>
  );
};
