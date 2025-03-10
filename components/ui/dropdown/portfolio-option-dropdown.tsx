"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPen } from "react-icons/fa6";
import { BsCloudUploadFill } from "react-icons/bs";
import { LinkButton } from "../button/link-button";
import { redirect } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";
import useConfirmationStore from "@/store/confirmation";
import {
  deletePortfolioAction,
  publishPortfolioAction,
  unpublishPortfolioAction,
} from "@/action/portfolio.action";
import { Portfolio } from "@/types/portfolio.type";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getPortfolioQueryKey } from "@/data/query/portfolio";
type Props = {
  portfolio: Portfolio;
  deleteRedirect?: boolean;
};
export default function PortfolioOptionDropdown({
  portfolio,
  deleteRedirect = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const { openConfirmation } = useConfirmationStore();
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    const { error } = await deletePortfolioAction(portfolio.id);
    if (error) {
      toast({
        title: "Error Delete Portfolio",
        description: error.message,
        variant: "destructive",
        duration: 1500,
      });
    } else {
      toast({
        title: "Delete Portfolio Successful",
        variant: "success",
        duration: 1500,
      });
      if (deleteRedirect) {
        redirect("/admin-panel/portfolio");
      }

      queryClient.invalidateQueries({
        queryKey: [getPortfolioQueryKey()],
      });
    }
  };
  const handlePublish = async () => {
    const { error } = await publishPortfolioAction(portfolio.id);
    if (error) {
      toast({
        title: "Error Publish Portfolio",
        description: error.message,
        variant: "destructive",
        duration: 1500,
      });
    } else {
      toast({
        title: "Publish Portfolio Successful",
        variant: "success",
        duration: 1500,
      });
    }
  };

  const handleUnpublish = async () => {
    const { error } = await unpublishPortfolioAction(portfolio.id);
    if (error) {
      toast({
        title: "Error Unpublish Portfolio",
        description: error.message,
        variant: "destructive",
        duration: 1500,
      });
    } else {
      toast({
        title: "Unpublish Portfolio Successful",
        variant: "success",
        duration: 1500,
      });
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-6 w-6 rounded-full p-1">
          <SlOptionsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <LinkButton
            href={`/admin-panel/portfolio/${portfolio.slug}/edit`}
            variant={"icon"}
            className="w-full justify-start gap-3 opacity-80 hover:opacity-100"
          >
            <FaPen size={12} />
            <span>Edit</span>
          </LinkButton>
        </DropdownMenuItem>

        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <Button
            variant={"icon"}
            className="w-full justify-start gap-3 opacity-80 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (portfolio.published_at) {
                handleUnpublish();
              } else {
                handlePublish();
              }
            }}
          >
            <BsCloudUploadFill size={14} />
            <span>{portfolio.published_at ? "Unpublish" : "Publish"}</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="p-0"
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Button
            variant={"icon"}
            className="w-full justify-start gap-3 text-red-500 opacity-80 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpen(false);
              openConfirmation({
                title: "Are you absolutely sure?",
                description:
                  "This action cannot be undone. This will permanently remove your data from our servers",
                cancelLabel: "Cancel",
                actionLabel: "Confirm",
                onCancel: () => {},
                onAction: handleDelete,
              });
            }}
          >
            <AiFillDelete size={14} />
            <span>Delete</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
