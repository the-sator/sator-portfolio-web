"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import React from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../button";
import { IoAddOutline } from "react-icons/io5";

import PortfolioQuestioForm from "../form/portfolio-question-form";
import { useSelectedItem } from "@/store/selected-item";
import { useOverlay } from "@/store/overlay";
import { FormQuestion } from "@/types/portfolio-form.type";
import { MODAL_KEY } from "@/constant/modal-key";

export function CreateQuestionModal() {
  const { modals, closeModal, openModal } = useOverlay();
  const isOpen = modals[MODAL_KEY.PORTFOLIO_QUESTION];
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal(MODAL_KEY.PORTFOLIO_QUESTION);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-1"
          onClick={() => openModal(MODAL_KEY.PORTFOLIO_QUESTION)}
        >
          <IoAddOutline size={14} />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question Modal</DialogTitle>
        </DialogHeader>
        <PortfolioQuestioForm />
      </DialogContent>
    </Dialog>
  );
}

type EditProps = {
  questions: FormQuestion[] | null;
};

export function EditQuestionModal({ questions }: EditProps) {
  const { modals, closeModal } = useOverlay();
  const isOpen = modals[MODAL_KEY.PORTFOLIO_QUESTION];
  const { selectedItem, setSelectedItem } = useSelectedItem();
  const selectedQuestion =
    selectedItem && questions
      ? questions.find((question) => question.id === selectedItem)
      : undefined;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedItem(null);
          closeModal(MODAL_KEY.PORTFOLIO_QUESTION);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question Modal</DialogTitle>
        </DialogHeader>
        <PortfolioQuestioForm question={selectedQuestion} />
      </DialogContent>
    </Dialog>
  );
}
