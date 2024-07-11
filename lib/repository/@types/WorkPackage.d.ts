import { OpenProjectDataObject } from "./OpenProjectDataObject";

export interface WorkPackage {
	id: number;
	description: string;
	due_date: string;
	created_at: string;
	updated_at: string;
	start_date: string;
	project: OpenProjectDataObject;
	status: OpenProjectDataObject;
	type: OpenProjectDataObject;
}
