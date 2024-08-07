import {} from "uuid";

export type Task = {
	id: string;
	title: string;
	description: string | null | undefined;
	status: string;
	createdBy?: string;
	createdAt?: Date;
	updatedBy?: string;
	updatedAt?: Date;
	deletedBy?: string | null | undefined;
	deletedAt?: Date | null | undefined;
};

export const status = ["pending", "in-progress", "completed"];
