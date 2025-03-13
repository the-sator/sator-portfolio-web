import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { LinkButton } from "@/components/ui/button/link-button";
import SubmitButton from "./submit-button";
type Props = {
  next: string | null;
  previous: string | null;
};
export default function NavigationArrow({ next, previous }: Props) {
  return (
    <div className="fixed bottom-10 flex gap-10">
      <LinkButton
        disabled={!!!previous}
        href={previous ?? "#"}
        variant="icon"
        size="icon"
        className="flex w-fit gap-2"
      >
        <FaLongArrowAltLeft size={20} />
        <p>Previous</p>
      </LinkButton>
      {!!!next ? (
        <SubmitButton />
      ) : (
        <LinkButton
          disabled={!!!next}
          href={next ?? "#"}
          variant="icon"
          size="icon"
          className="flex w-fit gap-2"
        >
          <p>Next</p>
          <FaLongArrowAltRight size={20} />
        </LinkButton>
      )}
    </div>
  );
}
