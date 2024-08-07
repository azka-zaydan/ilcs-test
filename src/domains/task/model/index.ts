import {} from "uuid";

export type Task = {
	ID: string;
	Title: string;
	Description: string | null | undefined;
	Status: string;
	CreatedBy: string;
	CreatedAt: Date;
	UpdatedBy: string;
	UpdatedAt: Date;
	DeletedBy?: string | null | undefined;
	DeletedAt?: Date | null | undefined;
};

export const status = ["pending", "in-progress", "completed"];
