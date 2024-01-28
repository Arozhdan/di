import { historyActions, selectHistoryFilters } from "@/entities/History";
import { selectAllInstruments } from "@/entities/Instrument/";
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
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export const InstrumentFilter: FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const filters = useSelector(selectHistoryFilters);
  const instruments = filters?.instruments ?? [];
  const options = useSelector(selectAllInstruments).map((instrument) => ({
    label: instrument.name,
    value: instrument.id,
  }));

  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search);
    const instrument = urlQuery.get("instrument");

    if (instrument) {
      dispatch(
        historyActions.setFilter({
          key: "instruments",
          value: instrument.toLowerCase().split(","),
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
          Instrument
          {instruments?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {instruments?.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {instruments?.length > 1 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {instruments?.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => instruments.includes(option.value))
                    .map((option) => (
                      <Badge
                        key={option.value}
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full md:w-[280px] xl:w-[380px] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder={"Type"} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = instruments.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        dispatch(
                          historyActions.setFilter({
                            key: "instruments",
                            value: instruments.filter(
                              (instrument) => instrument !== option.value
                            ),
                          })
                        );
                      } else {
                        dispatch(
                          historyActions.setFilter({
                            key: "instruments",
                            value: [...instruments, option.value],
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

                    <span className="line-clamp-1">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {instruments?.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() =>
                      dispatch(
                        historyActions.setFilter({
                          key: "instruments",
                          value: [],
                        })
                      )
                    }
                  >
                    Clear filters
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
