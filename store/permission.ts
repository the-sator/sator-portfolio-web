import { Permission } from "@/types/permission.type";
import { create } from "zustand";

export type PermissionStore = {
  permissions: Permission[];
  setPermissions: (value: Permission[]) => void;
  handleOnChange: (
    resourceId: number,
    permissionType: string,
    value: boolean,
  ) => void;
};

export const usePermission = create<PermissionStore>((set) => ({
  permissions: [],
  setPermissions: (permissions: Permission[]) => {
    set({ permissions });
  },
  handleOnChange: (
    resourceId: number,
    permissionType: string,
    value: boolean,
  ) => {
    set((state) => {
      const existingPermission = state.permissions.find(
        (perm) => perm.resource_id === resourceId,
      );

      if (existingPermission) {
        // Update existing permission
        return {
          permissions: state.permissions.map((perm) =>
            perm.resource_id === resourceId
              ? { ...perm, [permissionType]: value }
              : perm,
          ),
        };
      }

      return {
        permissions: [
          ...state.permissions,
          {
            resource_id: resourceId,
            // Add for default, if there is value then it will overwrite
            read: false,
            write: false,
            delete: false,
            [permissionType]: value,
          },
        ],
      };
    });
  },
}));
