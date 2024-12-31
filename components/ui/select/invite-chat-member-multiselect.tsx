// src/components/multi-select.tsx

import * as React from "react";
import { WandSparkles, Check } from "lucide-react";
import { IoClose } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Tag from "../tag";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { ROLE } from "@/enum/role.enum";

interface InviteChatMemberMultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    role: ROLE;
    profile_url?: string;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
}

export const InviteChatMemberMultiSelect = React.forwardRef<
  HTMLButtonElement,
  InviteChatMemberMultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
      if (JSON.stringify(selectedValues) !== JSON.stringify(defaultValue)) {
        setSelectedValues(selectedValues);
      }
    }, [defaultValue, selectedValues]);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (value: string) => {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex h-auto min-h-10 w-full items-center justify-between rounded-md bg-inherit p-1 hover:bg-neutral-700/50",
              className,
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;

                    return (
                      <Tag
                        key={value}
                        color="blue"
                        // style={{ animationDuration: `${animation}s` }}
                      >
                        {IconComponent && (
                          <IconComponent className="mr-2 h-4 w-4" />
                        )}
                        {option?.label}
                        <IoClose
                          className="ml-2 h-4 w-4 cursor-pointer hover:text-blue-600"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Tag>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        "border-foreground/1 bg-popover text-foreground hover:bg-transparent",
                        isAnimating ? "animate-bounce" : "",
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {`+ ${selectedValues.length - maxCount} more`}
                      <IoClose
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between px-1">
                <span className="text-sm font-normal text-neutral-500">
                  {placeholder}
                </span>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command
            filter={(value, search) => {
              const hasMatch = value
                .toLowerCase()
                .includes(search.toLowerCase());

              return hasMatch ? 1 : 0;
            }}
          >
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  const isAdmin = option.role === ROLE.ADMIN;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggleOption(option.value)}
                      className={cn("flex justify-between")}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="size-6">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-2">
                          <span>{option.label}</span>
                          {isAdmin && (
                            <Tag className="h-4 min-w-fit px-2 text-[10px]">
                              Admin
                            </Tag>
                          )}
                        </div>
                      </div>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandGroup>
                <div className="flex flex-col items-center justify-center">
                  {selectedValues.length > 0 && (
                    <>
                      <Separator
                        // orientation=""
                        className="block w-full"
                      />
                      <CommandItem
                        onSelect={handleClear}
                        className="mt-1 flex w-full justify-center"
                      >
                        Clear
                      </CommandItem>
                    </>
                  )}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              "my-2 h-3 w-3 cursor-pointer bg-background text-foreground",
              isAnimating ? "" : "text-muted-foreground",
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  },
);

InviteChatMemberMultiSelect.displayName = "InviteChatMemberMultiSelect";
