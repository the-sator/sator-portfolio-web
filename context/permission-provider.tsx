// contexts/PermissionContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

interface Permission {
  read: boolean;
  write: boolean;
  delete: boolean;
  resource_id: number;
}

interface Role {
  name: string;
  permissions: Permission[];
}

interface PermissionContextType {
  can: (resource: string, action: "read" | "write" | "delete") => boolean;
  role?: Role;
}

const PermissionContext = createContext<PermissionContextType>({
  can: () => false,
});

export const PermissionProvider: React.FC<{
  children: ReactNode;
  role?: Role;
}> = ({ children, role }) => {
  const can = (resource: string, action: "read" | "write" | "delete") => {
    if (!role) return false;

    // Map resource name to resource_id (you might want to centralize this)
    const resourceMap: { [key: string]: number } = {
      product: 1,
      user: 2,
      // Add more mappings as needed
    };

    const resourceId = resourceMap[resource];

    // Find permission for the specific resource
    const permission = role.permissions.find(
      (p) => p.resource_id === resourceId,
    );

    // Check if the specific action is allowed
    return !!permission && permission[action];
  };

  return (
    <PermissionContext.Provider value={{ can, role }}>
      {children}
    </PermissionContext.Provider>
  );
};

// Hook to use permissions
export const usePermission = () => {
  return useContext(PermissionContext);
};
