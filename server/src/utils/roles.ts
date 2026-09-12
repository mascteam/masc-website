import type { UserDocument } from "../models/user.model";

export const isAdmin = (role: string) => ["ADMIN"].includes(role);

export const isOrganizor = (role: string) => ["ORGANIZOR", "ADMIN"].includes(role);
