"use client";
import { createFormAttemptAction } from "@/action/portfolio-form.action";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { usePortfolioForm } from "@/store/portfolio-form";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

export default function SubmitButton() {
  const { responses, clearResponse } = usePortfolioForm();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit = async () => {
    startTransition(async () => {
      const payload = {
        responses,
      };
      const { data, error } = await createFormAttemptAction(payload);
      if (error) {
        if ("statusCode" in error) {
          toast({
            title: "Create Form Attempt Error",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        return;
      }
      toast({
        title: "Create Form Attempt Successful",
        variant: "success",
      });
      clearResponse();
      router.push(`/form/${data!.id}/result`);
    });
  };
  return (
    <Button onClick={onSubmit} className="flex gap-2" loading={isPending}>
      <p>Submit</p>
    </Button>
  );
}
