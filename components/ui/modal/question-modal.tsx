"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import React, { useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../button";
import { IoAddOutline } from "react-icons/io5";

import PortfolioQuestioForm from "../form/portfolio-question-form";
import { useSelectedItem } from "@/store/selected-item";
import { useOverlay } from "@/store/overlay";
import { FormQuestion } from "@/types/portfolio-form.type";

export function CreateQuestionModal() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1">
          <IoAddOutline size={14} />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question Modal</DialogTitle>
        </DialogHeader>
        <PortfolioQuestioForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

type EditProps = {
  questions: FormQuestion[] | null;
};

export function EditQuestionModal({ questions }: EditProps) {
  const { showModal, setShowModal } = useOverlay();
  const { selectedItem } = useSelectedItem();
  const selectedQuestion =
    selectedItem && questions
      ? questions.find((question) => question.id === selectedItem)
      : undefined;

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question Modal</DialogTitle>
        </DialogHeader>
        <PortfolioQuestioForm
          setOpen={setShowModal}
          question={selectedQuestion}
        />
      </DialogContent>
    </Dialog>
  );
}
