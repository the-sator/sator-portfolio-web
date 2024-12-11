"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useQueryParamsContext } from "@/context/query-params-provider";
import { IoIosArrowDown } from "react-icons/io";
export type ComboboxOption = {
  label: string;
  value: string;
};
type Props = {
  filterKey: string;
  placeholder?: string;
  className?: string;
  options: ComboboxOption[];
};
export default function FilterCombobox({
  filterKey,
  className,
  placeholder = "Please Select",
  options,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const { updateQuery } = useQueryParamsContext();
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("h-full w-full justify-between", className)}
        >
          {value ? (
            options.find((option) => option.value === value)?.label
          ) : (
            <span className="text-sm font-normal text-label/80">
              {placeholder}
            </span>
          )}
          <IoIosArrowDown className="text-label/80" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    updateQuery({ [filterKey]: currentValue });
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
