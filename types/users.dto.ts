import { Users } from "@prisma/client";

export type UsersCreateDTO =Omit<Users, 'id'| 'createdAt'| 'updatedAt' | 'lastConnection'>;
export type UsersWhoamiDTO =Pick<Users, 'name'|'surname'|'email'>;