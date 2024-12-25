"use client";
import React, { FormEvent, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

import { InputWithLabel } from "../input-label";
import { Button } from "../button";
import { IoAddOutline, IoClose, IoPersonAdd } from "react-icons/io5";
import { InviteChatMemberMultiSelect } from "../select/invite-chat-member-multiselect";
import SubmitButton from "../button/submit-button";
import {
  ChangeChatRoomName,
  ChatRoom,
  CreateChatRoom,
  InvitableChatMember,
  InviteChatMember,
} from "@/types/chat.type";
import {
  changeChatRoomNameAction,
  createChatRoomAction,
} from "@/action/chat-room.action";
import { toast } from "@/hooks/use-toast";
import { ZodFormattedError } from "zod";
import { ROLE } from "@/enum/role.enum";
import { Admin } from "@/types/admin.type";
import { BiSolidCommentDetail } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Input } from "../input";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import Tag from "../tag";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import {
  inviteAction,
  removeChatMemberAction,
} from "@/action/chat-member.action";
import Spinner from "../spinner";
import { Auth } from "@/types/auth.type";
type Props = {
  member: InvitableChatMember | null;
  admin: Admin;
};
export function CreateChatRoomModal({ member, admin }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([admin.id]);
  const options = [
    ...(member?.admins?.map((admin) => ({
      label: admin.username,
      value: admin.id,
      role: ROLE.ADMIN,
    })) || []),
    ...(member?.users?.map((user) => ({
      label: user.username,
      value: user.id,
      role: ROLE.USER,
    })) || []),
  ];
  const [error, setError] = useState<ZodFormattedError<CreateChatRoom> | null>(
    null,
  );

  const handleCreateChatRoom = async (formData: FormData) => {
    const data: CreateChatRoom = {
      name: formData.get("name")?.toString() || "",
      chat_members: selectedMembers,
      is_group: true, //TODO: May need to change later
    };
    const { error } = await createChatRoomAction(data);
    if (error) {
      if ("statusCode" in error) {
        toast({
          title: "Create Chat Room Error",
          description: error.error,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        setError(error);
      }
    } else {
      toast({
        title: "Create Chat Room Successful",
        variant: "success",
        duration: 1500,
      });
      setOpen(false);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleCreateChatRoom(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 w-10 flex-shrink-0 p-0">
          <IoAddOutline size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Chat Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <InputWithLabel
            label="Name"
            name="name"
            placeholder="My Chat Room"
            errors={error?.name}
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-xs text-label">Invite Chat Member</h2>
            <InviteChatMemberMultiSelect
              options={options}
              defaultValue={selectedMembers}
              onValueChange={(value) => setSelectedMembers(value)}
              placeholder="Who would you like to add?"
              className="border px-3"
            />
          </div>
          <SubmitButton label="Create" className="mt-4" />
        </form>
      </DialogContent>
    </Dialog>
  );
}

type DetailProps = {
  room: ChatRoom;
  auth: Partial<Auth>;
};
export function ChatRoomDetailModal({ room, auth }: DetailProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [, startRemoveTransition] = useTransition();
  const [loadingMemberId, setLoadingMemberId] = useState<string | null>(null);

  const handleChangeName = async (formData: FormData) => {
    const data: ChangeChatRoomName = {
      name: formData.get("name")?.toString() || "",
    };
    const { error } = await changeChatRoomNameAction(room.id, data);
    if (error) {
      if ("statusCode" in error) {
        toast({
          title: "Change Name Error",
          description: error.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Change Name Error",
          description: error._errors,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Change Name Successful",
        variant: "success",
      });
      setIsEdit(false);
    }
  };
  const handleRemoveMember = async (id: string) => {
    setLoadingMemberId(id);
    startRemoveTransition(async () => {
      const { error } = await removeChatMemberAction(id, room.id);
      if (error) {
        toast({
          title: "Remove Member Error",
          description: error.error,
          variant: "destructive",
        });
        setLoadingMemberId(null);
      } else {
        toast({
          title: "Remove Member Successful",
          variant: "success",
        });
        setLoadingMemberId(null);
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleChangeName(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"icon"}
          className="h-4 w-full justify-start gap-3 py-4 opacity-80 hover:opacity-100"
        >
          <BiSolidCommentDetail size={14} />
          <span>Detail</span>
        </Button>
      </DialogTrigger>
      <DialogContent onKeyDown={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Chat Room Detail</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <Avatar className="size-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center">
            {isEdit ? (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  type="text"
                  defaultValue={room.name}
                  className="text-md h-fit w-fit border p-1"
                  name="name"
                />
                <Button variant="icon" className="h-fit w-fit p-0">
                  <FaCheck />
                </Button>
                <Button
                  variant="icon"
                  className="h-fit w-fit p-0"
                  onClick={() => setIsEdit(false)}
                >
                  <IoClose />
                </Button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-md">{room.name}</p>
                {auth.role_id && (
                  <Button
                    variant="icon"
                    className="h-fit w-fit p-0"
                    onClick={() => setIsEdit(true)}
                  >
                    <MdEdit />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-label">Member</p>
          <div className="mt-3 flex flex-col gap-2">
            {room.chat_members.map((member) => {
              const isAdmin = member.admin ? true : false;
              const isLoading = loadingMemberId === member.id;
              return (
                <div
                  className="flex items-center justify-between"
                  key={member.id}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="size-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span>
                        {member.admin
                          ? member.admin.username
                          : member.user?.username}
                      </span>
                      {isAdmin && (
                        <Tag className="h-4 min-w-fit px-2 text-[10px]">
                          Admin
                        </Tag>
                      )}
                    </div>
                  </div>
                  {auth.role_id && (
                    <>
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <Button
                          variant="icon"
                          className="h-fit w-fit p-0"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <IoIosRemoveCircleOutline className="text-red-500 opacity-60 hover:opacity-100" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type InviteProps = {
  member?: InvitableChatMember | null;
  room: ChatRoom;
};
export function ChatRoomInvite({ member, room }: InviteProps) {
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const options = [
    ...(member?.admins?.map((admin) => ({
      label: admin.username,
      value: admin.id,
      role: ROLE.ADMIN,
    })) || []),
    ...(member?.users?.map((user) => ({
      label: user.username,
      value: user.id,
      role: ROLE.USER,
    })) || []),
  ];
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: InviteChatMember = {
      chat_members: selectedMembers,
      chat_room_id: room.id,
    };
    const { error } = await inviteAction(data);
    if (error) {
      toast({
        title: "Invite Chat Member Error",
        description: error.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Invite Chat Member Successful",
        variant: "success",
      });
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"icon"}
          className="h-4 w-full justify-start gap-3 py-4 opacity-80 hover:opacity-100"
        >
          <IoPersonAdd size={14} />
          <span>Invite</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h2 className="text-xs text-label">Member</h2>
          <InviteChatMemberMultiSelect
            options={options}
            defaultValue={selectedMembers}
            onValueChange={(value) => setSelectedMembers(value)}
            placeholder="Who would you like to add?"
            className="border px-3"
            modalPopover={true}
          />
          <SubmitButton label="Invite" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
