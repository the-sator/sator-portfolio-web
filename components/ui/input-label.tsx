"use client";
import React, {
  ComponentProps,
  ComponentPropsWithoutRef,
  useState,
} from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import SecretInput from "./secret-input";
export type SelectOption = {
  value: string;
  label: string;
};

type ZodErrorFormatted = {
  _errors: string[];
};

type IconInputWithLabelProps = {
  label: string;
  icon: React.ReactNode;
  errors?: ZodErrorFormatted;
} & ComponentPropsWithoutRef<typeof Input>;

type InputWithLabelProps = {
  label: string;
  instruction?: string;
  errors?: {
    _errors: string[];
  };
  register?: UseFormRegisterReturn;
  className?: string;
} & ComponentPropsWithoutRef<typeof Input>;

type SelectWithLabelProps = {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  options: SelectOption[];
  errors?: ZodErrorFormatted | null;
};

type TextAreaWithLabelProps = {
  showCount: boolean;
  label: string;
  register?: UseFormRegisterReturn;
  minHeight?: number;
  defaultValue?: string;
  errors?: ZodErrorFormatted | null;
} & ComponentProps<typeof Textarea>;

export function InputWithLabel({
  label,
  required = false,
  instruction,
  register,
  name,
  className,
  errors,
  ...props
}: InputWithLabelProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Label htmlFor={name} className="flex items-center gap-2">
        <div>
          {label}
          {required && <span className="text-red-500">{" *"}</span>}
        </div>
        {instruction && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger>
                <span className="sr-only w-full basis-1/2">Instruction</span>
                <AiOutlineExclamationCircle size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{instruction}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          // <Button variant="icon" className="h-4 w-4 p-0">

          // </Button>
        )}
      </Label>
      <Input
        {...props}
        {...register}
        name={name}
        variant={"outline"}
        required={required}
        className={cn(errors && "border-red-400")}
      />
      {errors && (
        <p className="text-xs text-red-400">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export function SecretInputWithLabel({
  label,
  required = false,
  instruction,
  register,
  name,
  className,
  errors,
  ...props
}: InputWithLabelProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Label htmlFor={name} className="flex items-center gap-2">
        <div>
          {label}
          {required && <span className="text-red-500">{" *"}</span>}
        </div>
        {instruction && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger>
                <span className="sr-only w-full basis-1/2">Instruction</span>
                <AiOutlineExclamationCircle size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{instruction}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </Label>
      <SecretInput
        {...props}
        {...register}
        name={name}
        variant={"outline"}
        required={required}
        className={cn(errors && "border-red-400")}
      />
      {errors && (
        <p className="text-xs text-red-400">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export function IconInputWithLabel({
  label,
  icon,
  errors,
  ...props
}: IconInputWithLabelProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <Label>{label}</Label>
      </div>
      <Input variant={"outline"} {...props} />
      {errors && (
        <p className="text-xs text-red-400">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export function TextAreaWithLabel({
  showCount = false,
  maxLength = 100,
  minHeight,
  register,
  errors,
  required,
  defaultValue = "",
  label,
  ...props
}: TextAreaWithLabelProps) {
  const [text, setText] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };
  return (
    <div className="relative flex h-full flex-col gap-3">
      <Label>
        {label}
        <span className="text-red-500">{required && " *"}</span>
      </Label>
      <Textarea
        {...register}
        {...props}
        value={text}
        onChange={handleChange}
        variant={"outline"}
        required={required}
        style={{
          minHeight: `${minHeight}px`,
        }}
        className={cn("h-full", errors && "border-red-400")}
      />
      {showCount && (
        <p className="absolute bottom-1 right-5 text-[12px] text-label/80">
          {text?.length || 0}/{maxLength}
        </p>
      )}
      {errors && (
        <p className="text-xs text-red-400">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export function SelectWithLabel({
  label,
  options,
  defaultValue,
  placeholder,
  name,
  errors,
}: SelectWithLabelProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label>{label}</Label>

      <Select defaultValue={defaultValue} name={name}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} className="" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors && (
        <p className="text-xs text-red-400">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
