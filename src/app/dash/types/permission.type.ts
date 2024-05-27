export type PermissionType = {
  id: number;
  name: string;
  code: string;
  icon: string;
  link: string;
  permissions?: Array<PermissionType>;
  idPermissionMain?: number;
  isDropdown?: boolean;
};
