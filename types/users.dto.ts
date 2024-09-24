import { Users } from "@prisma/client";

export type UsersCreateDTO =Pick<Users,'name'|'surname'|'email'|'password' >;
export type UsersWhoamiDTO =Pick<Users, 'name'|'surname'|'email'>;