import {
  InstrumentType,
  instrumentActions,
  selectInstrumentFilters,
  selectInstrumentTypes,
} from "@/entities/Instrument";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Separator } from "@/shared/components/ui/separator";
import { cn, useAppDispatch } from "@/shared/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@shared/components/ui/command";
import { CheckIcon, PlusCircleIcon } from "lucide-react";
import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}
const Filter: FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const filters = useSelector(selectInstrumentFilters);
  const types = filters?.types ?? [];
  const typeValues = useSelector(selectInstrumentTypes);
  const options = typeValues.map((type) => ({
    label: type,
    value: type,
  }));

  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search);
    const segment = urlQuery.get("segment");

    if (segment) {
      dispatch(
        instrumentActions.setFilter({
          key: "types",
          value: segment.toLowerCase().split(",") as InstrumentType[],
        })
      );
    }
  }, [dispatch]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-8 border-dashed", className)}
        >
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          {t("instrument.category")}
          {types?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {types?.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {types?.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal capitalize"
                  >
                    {types?.length} {t("general.selected")}
                  </Badge>
                ) : (
                  options
                    .filter(
                      (option) =>
                        types.indexOf(option.value as InstrumentType) > -1
                    )
                    .map((option) => (
                      <Badge
                        key={option.value}
                        variant="secondary"
                        className="rounded-sm px-1 font-normal capitalize"
                      >
                        {t(`categories.${option.value}`)}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={t("general.search")} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected =
                  types.indexOf(option.value as InstrumentType) > -1;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        dispatch(
                          instrumentActions.setFilter({
                            key: "types",
                            value: types.filter((t) => t !== option.value),
                          })
                        );
                      } else {
                        dispatch(
                          instrumentActions.setFilter({
                            key: "types",
                            value: [...types, option.value],
                          })
                        );
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>

                    <span className="capitalize">
                      {t(`categories.${option.value}`)}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {types.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() =>
                      dispatch(
                        instrumentActions.setFilter({ key: "types", value: [] })
                      )
                    }
                  >
                    {t("general.clear_filters")}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const SegmentFilter = memo(Filter);
