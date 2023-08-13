export type PermissionType = {
  id: number;
  name: string;
  code: string;
  icon: string;
  permissions?: Array<PermissionType>;
};
