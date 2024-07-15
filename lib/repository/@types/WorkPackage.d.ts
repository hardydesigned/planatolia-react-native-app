import { DataObject } from "./DataObject";

export interface WorkPackage {
	id: number;
	description: string;
	due_date: string;
	start_date: string;
	project: DataObject;
	status: DataObject;
	type: DataObject;
}
