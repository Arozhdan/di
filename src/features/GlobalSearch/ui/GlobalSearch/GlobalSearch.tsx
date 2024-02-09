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
import { useTranslation } from "react-i18next";

const GlobalSearch = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const search = useSelector(selectGlobalSearch);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t("general.type_command_or_search")} />
      <CommandList>
        <CommandEmpty>{t("general.no_results")}</CommandEmpty>
        {search.map((section, index) => (
          <CommandGroup heading={section.title} key={index}>
            {section.pages.map((item, index) => (
              <CommandItem
                key={index}
                value={item.url}
                onSelect={() => navigate(item.url)}
              >
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
