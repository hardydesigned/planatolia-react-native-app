import { DataObject } from "./@types/DataObject";
import { User } from "./@types/User";
import { WorkPackage } from "./@types/WorkPackage";

export default interface IRepository {
	saveWorkPackage(
		id: number,
		description: string,
		due_date: string,
		start_date: string,
		project: string,
		status: string,
		type: string
	): any;
	deleteWorkPackage(id: number): any;
	getAllWorkPackages(): Promise<WorkPackage[]>;
	getFilteredWorkPackages(filter: string): Promise<WorkPackage[]>;
	getCurrentUser(): Promise<User>;
	saveUser: (
		firstname: string,
		theme: string,
		apiKey: string,
		url: string,
		projects: DataObject[],
		statuses: DataObject[],
		types: DataObject[],
		projectDefault: DataObject,
		typeDefault: DataObject,
		statusDefault: DataObject
	) => any;
}
