import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";
import { Checkbox } from "../../checkbox";
import { Resource } from "@/types/resource.type";
import { usePermission } from "@/store/permission";
import { Role } from "@/types/role.type";
import { Permission } from "@/types/permission.type";
type Props = {
  resources?: Resource[] | null;
  role?: Role | null;
};
export default function RolePermissionTable({ resources, role }: Props) {
  const { setPermissions, handleOnChange } = usePermission();
  useEffect(() => {
    if (resources && role) {
      setPermissions(role.permissions);
    } else if (resources) {
      const initialPermissions = resources.map((resource) => ({
        resource_id: resource.id,
        read: false,
        write: false,
        delete: false,
      }));
      setPermissions(initialPermissions);
    }
  }, [resources, role, setPermissions]);

  const renderUpdateValue = (
    role: Role | null | undefined,
    key: string,
    resource_id: number,
  ) => {
    if (!role) {
      return false;
    }
    const permission = role.permissions.find(
      (perm) => perm.resource_id === resource_id,
    );
    return permission ? !!permission[key as keyof Permission] : false;
  };
  return (
    <div className="max-h-[500px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Resource</TableHead>
            <TableHead className="min-w-[80px]">Read</TableHead>
            <TableHead className="min-w-[80px]">Write</TableHead>
            <TableHead className="min-w-[80px]">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources &&
            resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">{resource.name}</TableCell>
                <TableCell>
                  <Checkbox
                    defaultChecked={renderUpdateValue(
                      role,
                      "read",
                      resource.id,
                    )}
                    onCheckedChange={(checked) =>
                      handleOnChange(
                        resource.id,
                        "read",
                        checked ? true : false,
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    defaultChecked={renderUpdateValue(
                      role,
                      "write",
                      resource.id,
                    )}
                    onCheckedChange={(checked) =>
                      handleOnChange(
                        resource.id,
                        "write",
                        checked ? true : false,
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    defaultChecked={renderUpdateValue(
                      role,
                      "delete",
                      resource.id,
                    )}
                    onCheckedChange={(checked) =>
                      handleOnChange(
                        resource.id,
                        "delete",
                        checked ? true : false,
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
