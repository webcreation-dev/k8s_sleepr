import { Role } from "@app/common";

export interface RequestUser {
    readonly id: number;
    readonly roles: Role[];
  }
  