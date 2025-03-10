import React, { FormEvent, useRef, useState } from "react";
import SubmitButton from "../button/submit-button";
import { Button } from "../button";
import { InputWithLabel, SelectWithLabel } from "../input-label";
import { Label } from "../label";
import FormOptionInput from "@/components/portfolio-form/form-option-input";
import { ZodFormattedError } from "zod";
import {
  CreateFormQuestion,
  FormOption,
  FormQuestion,
} from "@/types/portfolio-form.type";
import { toast } from "@/hooks/use-toast";
import { nanoid } from "nanoid";
import {
  createQuestionAction,
  updateQuestionAction,
} from "@/action/portfolio-form.action";
import { useOverlay } from "@/store/overlay";
import { MODAL_KEY } from "@/constant/modal-key";

const typeSelect = [
  {
    label: "Single Choice",
    value: "SINGLE_CHOICE",
  },
  {
    label: "Multiple Choice",
    value: "MULTI_CHOICE",
  },
];

const initOption: FormOption[] = [
  {
    option_text: "",
    price: [0, 10],
    question_id: "",
    id: nanoid(5),
  },
];
type Props = {
  question?: FormQuestion;
};
export default function PortfolioQuestioForm({ question }: Props) {
  const [options, setOptions] = useState<FormOption[]>(
    question ? question.form_option : initOption,
  );
  const { closeModal } = useOverlay();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errors, setErrors] = useState<ZodFormattedError<CreateFormQuestion>>();
  const handleAddOption = () => {
    if (options.length >= 4) {
      toast({
        title: "Cannot Add More Option",
        description: "Option Must Not Be More than 4",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }
    setOptions((prev) => [
      ...prev,
      {
        id: nanoid(5),
        option_text: "",
        price: [0, 10],
        question_id: "",
      },
    ]);
  };

  const handleAddQuestion = async (formData: FormData) => {
    const data = {
      form_text: formData.get("form_text"),
      type: formData.get("type"),
      order: Number(formData.get("order")),
      options: options,
    };
    const hasInvalidPriceRange = options.some(
      (option) =>
        Array.isArray(option.price) &&
        option.price.length === 2 &&
        option.price[0] === 0 &&
        option.price[1] === 0,
    );
    if (hasInvalidPriceRange) {
      toast({
        title: "Cannot Add Question",
        description: "Invalid Price Range",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }
    const { error } = await createQuestionAction(data);
    if (error) {
      if ("statusCode" in error) {
        toast({
          title: "Create Question Error",
          description: error.message,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        setErrors(error);
      }
    } else {
      formRef.current?.reset();
      closeModal(MODAL_KEY.PORTFOLIO_QUESTION);
      toast({
        title: "Create Question Successful",
        variant: "success",
        duration: 1500,
      });
    }
  };

  const handleUpdateQuestion = async (formData: FormData) => {
    const data = {
      form_text: formData.get("form_text"),
      type: formData.get("type"),
      order: Number(formData.get("order")),
      options: options,
    };
    const hasInvalidPriceRange = options.some(
      (option) =>
        Array.isArray(option.price) &&
        option.price.length === 2 &&
        option.price[0] === 0 &&
        option.price[1] === 0,
    );
    if (hasInvalidPriceRange) {
      toast({
        title: "Cannot Update Question",
        description: "Invalid Price Range",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }

    if (!question) {
      toast({
        title: "Cannot Update Question",
        description: "No Question was selected",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }

    const { error } = await updateQuestionAction(question.id, data);
    if (error) {
      if ("statusCode" in error) {
        toast({
          title: "Update Question Error",
          description: error.message,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        setErrors(error);
      }
    } else {
      formRef.current?.reset();
      closeModal(MODAL_KEY.PORTFOLIO_QUESTION);
      toast({
        title: "Update Question Successful",
        variant: "success",
        duration: 1500,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (question) {
      await handleUpdateQuestion(formData);
    } else {
      await handleAddQuestion(formData);
    }
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="my-4 flex flex-col gap-6"
    >
      <InputWithLabel
        label="Text"
        name="form_text"
        placeholder="Do you want a website?"
        defaultValue={question?.form_text}
        errors={errors?.form_text}
        required
      />
      <SelectWithLabel
        label="Type"
        name="type"
        options={typeSelect}
        defaultValue={question ? question.type : "SINGLE_CHOICE"}
      />
      <InputWithLabel
        type="number"
        label="Order"
        name="order"
        placeholder="1"
        defaultValue={question ? String(question?.order) : undefined}
        errors={errors?.order}
        required
      />
      <div className="relative flex flex-col gap-2">
        <Label>Options</Label>

        <div className="flex flex-col gap-2 px-3 py-2">
          {/* {question ? (
            <>
              {question.form_option.map((option) => (
                <FormOptionInput
                  key={option.id}
                  option={option}
                  options={options}
                  setOptions={setOptions}
                />
              ))}
            </>
          ) : (
            <> */}
          {options.map((option) => (
            <FormOptionInput
              key={option.id}
              option={option}
              options={options}
              setOptions={setOptions}
            />
          ))}
          {/* </>
          )} */}
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={options.length >= 4}
          className="border-dashed"
          onClick={handleAddOption}
        >
          + Add Option
        </Button>
      </div>
      <SubmitButton label="Save" />
    </form>
  );
}
