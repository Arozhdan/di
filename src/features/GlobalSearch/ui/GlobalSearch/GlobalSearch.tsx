import { memo } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/components/ui/command";
import { useSelector } from "react-redux";
import { selectGlobalSearch } from "../..";
import { useNavigate } from "react-router-dom";

const GlobalSearch = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const search = useSelector(selectGlobalSearch);
  const navigate = useNavigate();
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {search.map((section, index) => (
          <CommandGroup
            heading={section.title}
            key={index}
            onSelect={(e) => {
              console.log(e);
            }}
          >
            {section.pages.map((item, index) => (
              <CommandItem
                key={index}
                value={item.url}
                onSelect={() => navigate(item.url)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  );
};

export default memo(GlobalSearch);
