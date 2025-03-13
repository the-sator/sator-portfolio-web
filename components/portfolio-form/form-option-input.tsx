import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { InputWithLabel } from "../ui/input-label";
import { Button } from "../ui/button";
import { FiMinusCircle } from "react-icons/fi";
import { FormOption } from "@/types/portfolio-form.type";
import { toast } from "@/hooks/use-toast";
import { numArrayToString, stringToPriceRange } from "@/utils/string";
type Props = {
  option: FormOption;
  options: FormOption[];
  setOptions: Dispatch<SetStateAction<FormOption[]>>;
};
export default function FormOptionInput({
  option,
  options,
  setOptions,
}: Props) {
  const handleDeleteOption = () => {
    if (options.length <= 1) {
      toast({
        title: "Cannot Remove Option",
        description: "Option Must Not Be Less Than 1",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }
    setOptions((prev) => prev.filter((item) => item.id !== option.id));
  };
  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOptions((prev) =>
      prev.map((item) =>
        item.id === option.id ? { ...item, [name]: value } : item,
      ),
    );
  };

  const handlePriceRange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = value.replace(/\s*-\s*/g, " - ");
    const priceRange = stringToPriceRange(formattedValue);

    setOptions((prev) =>
      prev.map((item) =>
        item.id === option.id ? { ...item, price: priceRange } : item,
      ),
    );
  };
  return (
    <div className="mt-2 flex w-full items-center gap-2">
      <InputWithLabel
        label="Text"
        className="w-full"
        placeholder="Yes"
        name="option_text"
        onChange={handleOptionChange}
        defaultValue={option.option_text}
        required
      />
      <div className="w-full">
        <InputWithLabel
          label="Price"
          placeholder="5000 - 10000"
          name="price"
          required
          onChange={handlePriceRange}
          defaultValue={numArrayToString(option.price)}
          instruction={`Denote " - " for range`}
        />
      </div>
      <Button
        variant="icon"
        type="button"
        className="relative top-3.5 h-6 w-6 p-0"
        onClick={handleDeleteOption}
      >
        <span className="sr-only w-full basis-1/2">Remove Option</span>
        <FiMinusCircle
          className="text-red-500/80 hover:text-red-500"
          size={16}
        />
      </Button>
    </div>
  );
}
