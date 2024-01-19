import { Input } from "@/shared/components/ui/input";
import { SegmentFilter } from "./SegmentFilter";
import { Toggle } from "@/shared/components/ui/toggle";
import { PinIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export const HistoryFilters: FC<Props> = ({ className, ...props }) => {
  const classes = cn(
    "flex flex-wrap py-4 border-b border-t border-gray-100",
    className
  );
  return (
    <div className={classes} {...props}>
      <Input
        placeholder="Filter tasks..."
        className="h-8 w-full md:w-[150px] lg:w-[200px] xl:w-[340px] mb-3 md:mb-0"
      />
      <Toggle variant={"dashed"} size="sm" className="h-8 md:ml-3">
        <PinIcon className="h-4 w-4 mr-2" />
        <span className="hidden md:inline">Only&nbsp;</span>
        <span className="md:lowercase">Pinned</span>
      </Toggle>
      <SegmentFilter className="ml-3" />
      <Button variant={"link"} size="sm" className="h-8 group ml-3">
        <Trash2Icon className="mr-2 h-4 w-4  group-hover:scale-95" />
        Clear filters
      </Button>
    </div>
  );
};
