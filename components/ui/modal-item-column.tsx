import React from "react";
type Props = {
  title: string;
  content?: string | null;
};
export default function ModalItemColumn({ title, content }: Props) {
  return (
    <div className="grid grid-cols-3 text-sm">
      <p className="text-label">{title}:</p>
      <p className="col-span-2">{content}</p>
    </div>
  );
}
