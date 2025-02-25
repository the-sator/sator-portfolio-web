import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Button } from "../button";
type Props = {
  like: number;
};
export default function LikeButton({ like }: Props) {
  return (
    <Button variant={"icon"} className="flex h-fit w-fit items-end gap-2 p-0">
      <AiOutlineLike size={20} />
      <AiFillLike size={20}/>
      <p className="text-sm">{like || 0}</p>
    </Button>
  );
}
