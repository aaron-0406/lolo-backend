export type PermissionType = {
  id: number;
  name: string;
  code: string;
  icon: string;
  link: string;
  dropDown: boolean;
  permissions?: Array<PermissionType>;
};
