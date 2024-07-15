import { Role } from './role.type';

export type JwtPayload = {
  sub: number;
  email: string;
  name: string;
  role: Role;
};
