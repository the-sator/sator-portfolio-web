"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { useOverlay } from "@/store/overlay";
import { MODAL_KEY } from "@/constant/modal-key";
import { useSelectedItem } from "@/store/selected-item";
import { useGetFormAttemptByID } from "@/data/query/portfolio-form";
import { toast } from "@/hooks/use-toast";
import Spinner from "../spinner";
import { priceRangeToString } from "@/utils/string";
export default function FormAttemptAsyncModal() {
  const { modals, closeModal } = useOverlay();
  const { setSelectedItem, selectedItem } = useSelectedItem();
  const isOpen = modals[MODAL_KEY.FORM_ATTEMPT_ASYNC];
  const { data, error, isLoading, isError } = useGetFormAttemptByID(
    selectedItem?.toString() ?? "",
    {
      enabled: !!isOpen && !!selectedItem,
    },
  );
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error Fetching Blog",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [isError]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal(MODAL_KEY.FORM_ATTEMPT_ASYNC);
          setSelectedItem(null);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Attempt</DialogTitle>
        </DialogHeader>
        <ul className="my-4 flex max-h-[500px] flex-col gap-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {data?.data ? (
                <div>
                  <p>ID: {data.data.id}</p>
                  <ul className="my-10 flex flex-col gap-6">
                    {data.data.form_response.map((column) => (
                      <li
                        key={column.id}
                        className="flex flex-col gap-2 text-sm"
                      >
                        <p className="text-label">
                          {column.form_question.form_text}
                        </p>
                        <p className="">{column.form_option.option_text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>YIKES</p>
              )}
            </>
          )}
        </ul>
        {data?.data && (
          <DialogFooter>
            <div className="flex w-full flex-col justify-between">
              <p>Price:</p>
              <p className="self-end font-mono text-3xl leading-[3rem]">
                {priceRangeToString(data.data.quoted_price)}
              </p>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
