import type { AccountStatus, IAuthProvider, Role } from "@/types/types";

export interface IUser {
	userName: string;
	email: string;
	password: string;
	role: Role;
	accountStatus: AccountStatus;
	authProviders: IAuthProvider[];
	createdAt: Date;
	updatedAt: Date;
}
