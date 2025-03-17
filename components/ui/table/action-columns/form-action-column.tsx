import { useOverlay } from "@/store/overlay";
import { useSelectedItem } from "@/store/selected-item";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../button";
import { FormAttempt } from "@/types/portfolio-form.type";
import { MODAL_KEY } from "@/constant/modal-key";
import { bringToLifeAction } from "@/action/portfolio-form.action";
import { toast } from "@/hooks/use-toast";

export const FormActionColumn = ({ row }: { row: Row<FormAttempt> }) => {
  const Question = row.original;
  const [open, setOpen] = useState(false);
  const { setSelectedItem } = useSelectedItem();
  const { openModal } = useOverlay();
  const { id } = row.original;

  const handleBringToLife = async () => {
    const { error } = await bringToLifeAction(id);
    if (error) {
      toast({
        title: "Error Bring to Life Function",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="sr-only text-label">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0">
          <Button
            variant={"ghost"}
            className="flex h-fit w-full justify-start px-2 py-1"
            onClick={() => {
              setSelectedItem(Question.id);
              openModal(MODAL_KEY.FORM_ATTEMPT);
            }}
          >
            Detail
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0">
          <Button
            className="text-rainbow hover:text-rainbow/50 flex h-fit w-full justify-start px-2 py-1 transition-all hover:scale-105"
            variant={"ghost"}
            onClick={handleBringToLife}
          >
            Bring It to Life
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
